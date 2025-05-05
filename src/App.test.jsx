import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from 'react-router';

import routes from "./routes";
const router = createMemoryRouter(routes);

describe("App component", () => {
    it("renders navbar in app", () => {
        const { container } = render(<RouterProvider router={router} />);

        expect(container).toMatchSnapshot();
    });

    it("home button sends to home page", async () => {
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        const homeButton = screen.getByRole("button", { name: "Home"});

        await user.click(homeButton);
        expect(screen.getByRole("heading").textContent).toMatch(/Home/i);
    });

    it("shop button sends to shop page", async () => {
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        const shopButton = screen.getByRole("button", { name: "Shop"});

        await user.click(shopButton);
        expect(screen.getAllByRole("heading")[0].textContent).toMatch(/Shop/i);
    });

    it("cart button sends to cart page", async () => {
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        const cartButton = screen.getByRole("button", { name: /^Cart:\s*\d*/ });

        await user.click(cartButton);
        expect(screen.getByRole("heading").textContent).toMatch(/Cart/i);
    });

    it("bad url leads to 404 page", () => {
        const badRouter = createMemoryRouter(routes, {
            initialEntries: ["/", "/asd"]
        });

        render(<RouterProvider router={badRouter} />);

        expect(screen.getByRole("heading").textContent).toMatch(/404/i);
    });

    it("ability to add one of the first item to cart", async () => {
        const user = userEvent.setup();
        const initialPage = createMemoryRouter(routes, {
            initialEntries: ["/shop"]
        });
        
        render(<RouterProvider router={initialPage} />);

        const addToCartButtons = await screen.findAllByRole("button", { name: /add to cart/i });
        expect(addToCartButtons.length).toBeGreaterThan(0);

        const cartButton = screen.getByRole("button", { name: /^Cart:\s*0/ });
        await user.click(addToCartButtons[0]);
        expect(screen.getByRole("button", { name: /^Cart:\s*1/ })).toBeInTheDocument();
    });

    it ("add more than one of the same item to cart", async () => {
        const user = userEvent.setup();
        const initialPage = createMemoryRouter(routes, {
            initialEntries: ["/shop"]
        });
        
        render(<RouterProvider router={initialPage} />);

        const amountInputs = await screen.findAllByRole("spinbutton");
        expect(amountInputs.length).toBeGreaterThan(0);

        const addToCartButtons = await screen.findAllByRole("button", { name: /add to cart/i });
        expect(addToCartButtons.length).toBeGreaterThan(0);

        fireEvent.change(amountInputs[0], { target: { value: "4" } });
        await user.click(addToCartButtons[0]);
        expect(screen.getByRole("button", { name: /^Cart:\s*4/ })).toBeInTheDocument();
    });

    it ("add same item to cart multiple times", async () => {
        const user = userEvent.setup();
        const initialPage = createMemoryRouter(routes, {
            initialEntries: ["/shop"]
        });
        
        render(<RouterProvider router={initialPage} />);

        const amountInputs = await screen.findAllByRole("spinbutton");
        expect(amountInputs.length).toBeGreaterThan(0);

        const addToCartButtons = await screen.findAllByRole("button", { name: /add to cart/i });
        expect(addToCartButtons.length).toBeGreaterThan(0);

        fireEvent.change(amountInputs[1], { target: { value: "2" } });
        await user.click(addToCartButtons[1]);
        fireEvent.change(amountInputs[1], { target: { value: "0" } });
        await user.click(addToCartButtons[1]);
        fireEvent.change(amountInputs[1], { target: { value: "4" } });
        await user.click(addToCartButtons[1]);

        expect(screen.getByRole("button", { name: /^Cart:\s*6/ })).toBeInTheDocument();
    });

    it ("added items show up in cart page", async () => {
        const user = userEvent.setup();
        const initialPage = createMemoryRouter(routes, {
            initialEntries: ["/shop"]
        });
        
        render(<RouterProvider router={initialPage} />);

        expect(screen.getByRole("heading", { name: /loading/i })).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: /loading/i }));
        
        const itemNames = screen.getAllByRole("heading").slice(1).map((name) => name.textContent);
        const amountInputs = screen.getAllByRole("spinbutton");
        expect(amountInputs.length).toBeGreaterThan(0);
        const addToCartButtons = screen.getAllByRole("button", { name: /add to cart/i });
        expect(addToCartButtons.length).toBeGreaterThan(0);

        fireEvent.change(amountInputs[1], { target: { value: "2" } });
        await user.click(addToCartButtons[1]);
        const itemName1 = itemNames[1];
        fireEvent.change(amountInputs[3], { target: { value: "3" } });
        await user.click(addToCartButtons[3]);
        const itemName3 = itemNames[3];

        const cartButton = screen.getByRole("button", { name: /^Cart:\s*5/ });
        expect(cartButton).toBeInTheDocument();
        await user.click(cartButton);
        const headings = screen.getAllByRole("heading");
        expect(headings[0].textContent).toMatch("Cart");
        expect(headings[1].textContent).toMatch(itemName1);
        expect(headings[2].textContent).toMatch(itemName3);
    });

    it ("can remove items from cart page", async () => {
        const user = userEvent.setup();
        const initialPage = createMemoryRouter(routes, {
            initialEntries: ["/shop"]
        });
        
        render(<RouterProvider router={initialPage} />);

        await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: /loading/i }));
        
        const itemNames = screen.getAllByRole("heading").slice(1).map((name) => name.textContent);
        const amountInputs = screen.getAllByRole("spinbutton");
        const addToCartButtons = screen.getAllByRole("button", { name: /add to cart/i });

        fireEvent.change(amountInputs[1], { target: { value: "2" } });
        await user.click(addToCartButtons[1]);
        const itemName1 = itemNames[1];
        fireEvent.change(amountInputs[3], { target: { value: "3" } });
        await user.click(addToCartButtons[3]);
        fireEvent.change(amountInputs[0], { target: { value: "1" } });
        await user.click(addToCartButtons[0]);
        const itemName0 = itemNames[0];

        const cartButton = screen.getByRole("button", { name: /^Cart:\s*6/ });
        await user.click(cartButton);
        let removeItemButtons = screen.getAllByRole("button", { name: /remove/i });
        expect(removeItemButtons.length).toBe(3);
        await user.click(removeItemButtons[1]);
        expect(screen.getByRole("button", { name: /^Cart:\s*3/ })).toBeInTheDocument();
        removeItemButtons = screen.getAllByRole("button", { name: /remove/i });
        expect(removeItemButtons.length).toBe(2);
        const headings = screen.getAllByRole("heading");
        expect(headings[1].textContent).toMatch(itemName1);
        expect(headings[2].textContent).toMatch(itemName0);
    });
});