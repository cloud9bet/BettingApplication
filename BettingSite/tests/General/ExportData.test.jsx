import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import History from "../../src/components/History";

// Mock API
vi.mock("../../src/services/ControllerService/userApi", () => ({
    GetAllUserTransactionAsync: vi.fn().mockResolvedValue([
        { date: "2024-01-01", amount: 100, gameName: "Coin Flip" },
        { date: "2024-01-02", amount: -50, gameName: "Crash" },
        { date: "2024-01-03", amount: 250, gameName: "Slot" }
    ]),
    GetAllUserDepositAsync: vi.fn().mockResolvedValue([
        { date: "2024-02-01", amount: 500 }
    ])
}));

// Mock CSVLink så vi kan tjekke data direkte
vi.mock("react-csv", () => ({
    CSVLink: ({ data, filename }) => (
        <a data-testid="csv-link" data-csv={JSON.stringify(data)}>{filename}</a>
    ),
}));

describe("CSVLink Tests", () => {

    it("should generate Transaction CSV correctly within 5 seconds", async () => {
        const start = performance.now();

        render(<History onClose={() => {}} />);

        // Transaction er default choice
        const link = await screen.findByTestId("csv-link", {}, { timeout: 5000 });

        const end = performance.now();
        const elapsed = end - start;
        expect(elapsed).toBeLessThan(5000);

        const csvData = JSON.parse(link.dataset.csv);
        const gameNames = csvData.map(t => t.gameName);

        expect(gameNames).toContain("Coin Flip");
        expect(gameNames).toContain("Crash");
        expect(gameNames).toContain("Slot");

        // Check mindst en dato
        expect(csvData.some(t => t.date === "2024-01-01")).toBe(true);
    });

    it("should generate Deposit CSV correctly within 5 seconds", async () => {
        render(<History onClose={() => {}} />);

        // Skift til Deposit
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "Deposit" }});

        const link = await screen.findByTestId("csv-link", {}, { timeout: 5000 });
        const csvData = JSON.parse(link.dataset.csv);

        // Der skal kun være en deposit
        expect(csvData.length).toBe(1);
        expect(csvData[0].amount).toBe(500);
        expect(csvData[0].date).toBe("2024-02-01");
    });

});
