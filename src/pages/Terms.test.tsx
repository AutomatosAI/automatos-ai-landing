import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Terms from "./Terms";

/*
  PRD-264 EUAI-12: the Terms forbid removing or hiding AI notices and marks, say the Article 50(3) and 50(4)
  duties are the deployer's, and promise nothing beyond what is live. The page chrome is not under test.
*/
vi.mock("@/components/layout/Navbar", () => ({ Navbar: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/seo/SEO", () => ({ SEO: () => null }));

const pageText = () => (render(<Terms />).container.textContent ?? "").replace(/\s+/g, " ");

describe("Terms: AI notices and the deployer's duties (PRD-264 EUAI-12)", () => {
  it("has the AI notices section between intellectual property and liability", () => {
    const text = pageText();
    const ip = text.indexOf("3. Intellectual Property");
    const ai = text.indexOf("4. AI Notices and Your Duties");
    const liability = text.indexOf("5. Limitation of Liability");
    expect(ip).toBeGreaterThan(-1);
    expect(ai).toBeGreaterThan(ip);
    expect(liability).toBeGreaterThan(ai);
  });

  it("forbids removing, hiding or altering AI notices and machine-readable marks", () => {
    const text = pageText();
    expect(text).toContain("you must not remove, hide or alter that notice or mark");
    expect(text).toContain("machine-readable mark");
  });

  it("puts the Article 50(3) and 50(4) duties on the deployer", () => {
    const text = pageText();
    expect(text).toContain("the deployer's duties under Article 50 are yours");
    expect(text).toContain("disclosing deep fakes");
    expect(text).toContain("matters of public interest, where Article 50(4) requires it");
    expect(text).toContain("emotion recognition or biometric categorisation system you operate, as Article 50(3) requires");
  });

  it("says the tools help but do not move the duties to Automatos AI", () => {
    expect(pageText()).toContain("Automatos AI offers them as help only: it does not take on your duties");
  });

  it("makes no conformity claim", () => {
    expect(pageText()).not.toMatch(/compliant|compliance|certified|aligned by design/i);
  });

  it("shows the date of the last change, not the visitor's today", () => {
    expect(pageText()).toContain("Last updated: 20 October 2026");
  });
});
