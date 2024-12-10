// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mocking child components
jest.mock('./Routing/RoutingModule.js', () => () => <div data-testid="routing-module">Routing Module</div>);
jest.mock('./Components/Hooks/SearchHook.jsx', () => ({ children }) => (
  <div data-testid="search-hook">{children}</div>
));

test("renders the App component with its child components", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check if RoutingModule is rendered
  const routingModule = screen.getByTestId("routing-module");
  expect(routingModule).toBeInTheDocument();

  // Check if SearchHook wraps the content
  const searchHook = screen.getByTestId("search-hook");
  expect(searchHook).toBeInTheDocument();
});
