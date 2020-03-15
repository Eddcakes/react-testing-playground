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
  // need to wrap in act because useEffect updates the state
  await act(async () => {
    const { getByText } = render(<PokemonList />);
    const linkElement = getByText(/pokemon loading/i);
    expect(linkElement).toBeInTheDocument();
  });
});

test("renders results from api call", async () => {
  const { getByText, getAllByTestId } = render(<PokemonList />);

  await waitForElementToBeRemoved(() => {
    return getByText(/pokemon loading/i);
  });
  // get the text content from the items because we are going to test the order too
  const itemList = getAllByTestId("pokemon-item").map(li => li.textContent);
  expect(itemList).toHaveLength(3);
  // prettier adds in the training , toMatchInlineSnapshot
  expect(itemList).toMatchInlineSnapshot(`
    Array [
      "example one",
      "example two",
      "example three",
    ]
  `);

  // ok so after the act/wait for element we can see the changed render
});
