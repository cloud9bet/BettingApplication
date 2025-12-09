import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import HomeBtn from "../../src/components/HomeBtn";
import SettingsBtn from "../../src/components/SettingsBtn";


const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockClear();
});

describe("HomeBtn", () => {
  it("navigates to / when clicked", () => {
    render(<HomeBtn />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});

describe("SettingsBtn", () => {
  it("navigates to /settings when clicked", () => {
    render(<SettingsBtn />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/settings");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});

