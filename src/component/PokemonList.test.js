import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
  act
} from "@testing-library/react";
import PokemonList from "./PokemonList";

const mockResults = {
  results: [
    { name: "example one" },
    { name: "example two" },
    { name: "example three" }
  ]
};

beforeEach(() => {
  cleanup;
  // response.json() is not a function.
  // so we need to mock the json() method too
  global.fetch = jest.fn(() => Promise.resolve({ json: () => mockResults }));
});

test("renders loading message before api call sets data", async () => {
  await act(async () => {
    const { getByText } = render(<PokemonList />);
    const linkElement = getByText(/pokemon loading/i);
    expect(linkElement).toBeInTheDocument();
  });
});

test("renders results from api call", async () => {
  //const { debug } = render(<PokemonList />);
  const { getByText, debug } = render(<PokemonList />);

  await waitForElementToBeRemoved(() => {
    return getByText(/pokemon loading/i);
  });
  // ok so after the act/wait for element we can see the changed render
  debug();
});
