import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

const FAMILY_HOSTS = [
  "https://automatos.app",
  "https://studio.automatos.app",
  "https://academy.automatos.app",
  "https://markets.automatos.app",
];

const mount = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

describe("Footer family row", () => {
  it("lists the four family sites in order under its label", () => {
    mount();
    const row = screen.getByRole("navigation", { name: "The Automatos AI family" });
    const entries = within(row).getAllByRole("listitem").map((li) => li.textContent);
    expect(entries).toEqual(["Automatos AI", "Automatos Studio", "Automatos Academy", "Automatos Markets"]);
  });

  it("marks Studio as the current site instead of linking to itself", () => {
    mount();
    const row = screen.getByRole("navigation", { name: "The Automatos AI family" });
    const current = within(row).getByText("Automatos Studio");
    expect(current.tagName).toBe("SPAN");
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(within(row).queryByRole("link", { name: "Automatos Studio" })).toBeNull();
  });

  it("links the other three sites with plain links", () => {
    mount();
    const row = screen.getByRole("navigation", { name: "The Automatos AI family" });
    const links = within(row).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      "https://automatos.app",
      "https://academy.automatos.app",
      "https://markets.automatos.app",
    ]);
    links.forEach((a) => {
      expect(a.getAttribute("rel") ?? "").not.toMatch(/nofollow/);
    });
  });

  it("keeps the family out of the columns, so no family link is duplicated", () => {
    const { container } = mount();
    const row = screen.getByRole("navigation", { name: "The Automatos AI family" });
    const outside = Array.from(container.querySelectorAll("a")).filter(
      (a) => !row.contains(a) && !a.textContent?.startsWith("Powered by"),
    );
    const familyLinks = outside.filter((a) => FAMILY_HOSTS.includes((a.getAttribute("href") ?? "").replace(/\/$/, "")));
    expect(familyLinks).toEqual([]);
  });
});
