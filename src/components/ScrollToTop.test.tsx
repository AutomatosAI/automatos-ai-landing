import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

let go: ReturnType<typeof useNavigate>;
const Grab = () => {
  go = useNavigate();
  return null;
};

const mount = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ScrollToTop />
      <Grab />
    </MemoryRouter>,
  );

describe("ScrollToTop", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  });

  it("starts a newly opened page at the top", () => {
    mount();
    act(() => go("/auto"));
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: "instant" });
  });

  it("leaves back and forward to the browser", () => {
    mount();
    act(() => go("/auto"));
    vi.mocked(window.scrollTo).mockClear();
    act(() => go(-1));
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});

describe("ScrollToTop anchors", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  });

  it("opens at the top when the anchor is malformed or missing", () => {
    mount();
    expect(() => act(() => go("/auto#%"))).not.toThrow();
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: "instant" });
    vi.mocked(window.scrollTo).mockClear();
    act(() => go("/socials#nowhere"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });
});
