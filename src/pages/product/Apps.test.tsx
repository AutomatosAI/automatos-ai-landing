import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Apps from "./Apps";
import { DESIGN_KIT_URL } from "@/lib/links";

/* /apps: the page renders its sections, images and links, and keeps to the public facts. The chrome is not under test. */
vi.mock("@/components/layout/Navbar", () => ({ Navbar: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/seo/SEO", () => ({ SEO: () => null }));
vi.mock("@/components/sections/CTASection", () => ({ CTASection: () => null }));

beforeAll(() => {
  /* jsdom has no IntersectionObserver; the sections fade in with framer-motion's whileInView. */
  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", NoopObserver);
});

const mount = () =>
  render(
    <MemoryRouter initialEntries={["/apps"]}>
      <Apps />
    </MemoryRouter>,
  );

describe("Apps page (/apps)", () => {
  it("has one h1 and an h2 for each of the six sections and the summary", () => {
    mount();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Your Automatos, your way.");
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "The web app you run your business from.",
      "Friendly and warm, with Auto on the page.",
      "A mission-control console for your business.",
      "Hold to talk. Auto answers out loud.",
      "Auto in your pocket.",
      "Build a theme of your own.",
      "Whichever way you come in",
    ]);
  });

  it("gives every image alt text and a size, and loads all but the two hero captures lazily", () => {
    const { container } = mount();
    const images = Array.from(container.querySelectorAll("img"));
    expect(images).toHaveLength(13);
    images.forEach((img) => {
      expect(img.getAttribute("alt")?.length ?? 0).toBeGreaterThan(20);
      expect(Number(img.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(img.getAttribute("height"))).toBeGreaterThan(0);
    });
    expect(images.filter((img) => img.getAttribute("loading") === "eager")).toHaveLength(2);
  });

  it("sends the Automatos Go section to the waitlist and the Design Kit to its repository", () => {
    mount();
    expect(screen.getByRole("link", { name: "Join the waitlist →" }).getAttribute("href")).toBe("#waitlist");
    const kit = screen.getByRole("link", { name: "The Design Kit on GitHub →" });
    expect(kit.getAttribute("href")).toBe(DESIGN_KIT_URL);
    expect(kit.getAttribute("target")).toBe("_blank");
    expect(kit.getAttribute("rel")).toContain("noopener");
  });

  it("states the facts as they are and names no price", () => {
    const text = (mount().container.textContent ?? "").replace(/\s+/g, " ");
    expect(text).toContain("Hold to talk comes with every plan");
    expect(text).toContain("live voice calls come with supported plans");
    expect(text).toContain("in beta now and coming to the App Store");
    expect(text).toContain("Apache-2.0");
    expect(text).toContain("Settings › Appearance › Themes");
    expect(text).not.toMatch(/[$€£]\s?\d/);
  });

  it("names the languages as they are and marks detection in about 100 languages as coming", () => {
    const { container } = mount();
    const text = (container.textContent ?? "").replace(/\s+/g, " ");
    expect(text).toContain("Auto answers in the language you write or speak.");
    expect(text).toContain("Talk to Auto in English and Portuguese (Brazil), and switch with one tap.");
    expect(text).toContain(
      "It speaks 9 languages: English (US and UK), Spanish, French, Italian, Portuguese (Brazil), Hindi, Japanese and Mandarin.",
    );
    expect(text).toContain("Coming: automatic language detection. Speak in any of about 100 languages without choosing first.");
    /* A section point carries a check mark, so the planned detection must never be one. */
    const checked = Array.from(container.querySelectorAll("span")).filter((el) => el.firstElementChild?.textContent === "✓");
    expect(checked.length).toBeGreaterThan(0);
    checked.forEach((el) => expect(el.textContent).not.toContain("100 languages"));
  });
});
