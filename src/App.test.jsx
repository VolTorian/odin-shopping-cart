import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});