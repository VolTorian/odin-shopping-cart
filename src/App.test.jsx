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
        expect(screen.getByRole("heading").textContent).toMatch(/Shop/i);
    });

    it("cart button sends to cart page", async () => {
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        const cartButton = screen.getByRole("button", { name: "Cart"});

        await user.click(cartButton);
        expect(screen.getByRole("heading").textContent).toMatch(/Cart/i);
    });
});