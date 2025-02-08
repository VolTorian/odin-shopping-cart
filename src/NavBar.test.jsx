import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import NavBar from "./NavBar";

describe("NavBar component", () => {
    it("renders navigation bar", () => {
        render(<MemoryRouter>
            <NavBar />
        </MemoryRouter>);

        const navLinks = screen.getAllByRole("link");

        expect(navLinks[0].textContent).toMatch(/Home/i);
        expect(navLinks[1].textContent).toMatch(/Shop/i);
        expect(navLinks[2].textContent).toMatch(/Cart/i);
    });
});