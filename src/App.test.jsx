import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App component", () => {
    it("renders navbar in app", () => {
        const { container } = render(<App />);

        expect(container).toMatchSnapshot();
    });
});