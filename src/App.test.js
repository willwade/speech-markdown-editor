import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders speech markdown logo", () => {
  const { getByAltText } = render(<App />);
  const logoElement = getByAltText(/Speech Markdown Logo/i);
  expect(logoElement).toBeInTheDocument();
});
