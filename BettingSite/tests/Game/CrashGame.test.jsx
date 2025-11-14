import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, it, expect, describe, beforeEach } from 'vitest'

import GamblingCrash from "../../src/components/CrashGame/gameComponents/GamblingCrash"
import CrashControls from "../../src/components/CrashGame/gameComponents/CrashControls"
import { calculateMultiplier, formatCurrency, formatMultiplier } from "../../src/components/CrashGame/gameComponents/crashUtils"

import CrashMessage from "../../src/components/CrashGame/gameComponents/CrashMessage.jsx";
import CrashStats from "../../src/components/CrashGame/gameComponents/CrashStats.jsx";
import CrashRules from "../../src/components/CrashGame/gameComponents/CrashRules.jsx";

const startGameMock = vi.fn();
const stopGameMock = vi.fn();
const handleBetChangeMock = vi.fn();
const handleAutoStopChangeMock = vi.fn();
const handleToggleMock = vi.fn(() => startGameMock());


// Mockings til test
vi.mock('../../src/Context/BalanceContext', () => {
    return {
        usetotalBalance: () => ({
            totalBalance: 1000,
            setTotalBalance: vi.fn(),
        }),
    };
});

vi.mock("../../src/components/CrashGame/gameComponents/CrashChart.jsx", () => ({
    default: () => <div>Mock Chart</div>
}));


vi.mock("../../src/components/CrashGame/gameComponents/useCrashGame", () => {
    return {
        useCrashGame: () => ({
            balance: 1000,
            bet: 50,
            autoStop: 2,
            multiplier: 1.0,
            isPlaying: false,
            cashedOut: false,
            message: "Ready",
            data: [],
            startGame: startGameMock,
            stopGame: stopGameMock,
            handleBetChange: handleBetChangeMock,
            handleAutoStopChange: handleAutoStopChangeMock,
            handleToggle: handleToggleMock,
        }),
    };
});



vi.stubGlobal("Audio", function () {
    return { play: vi.fn() };
});

vi.stubGlobal("requestAnimationFrame", (cb) =>
    setTimeout(() => cb(Date.now()), 10)
);
vi.stubGlobal("cancelAnimationFrame", () => { });




describe('CrashGame', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Renders initial balances and start buttons', () => { //test til render af start-knap
        render(<GamblingCrash />);
        expect(screen.getByText(/Session Balance/i)).toBeTruthy();
        expect(screen.getByRole('button', { name: /Start/i })).toBeTruthy();
    })

    it('Calls startGame when Start is clicked', () => { //Kører spillet rent faktisk når start-knappen trykkes
        render(<GamblingCrash />);
        const startBtn = screen.getByRole('button', { name: /Start/i });
        fireEvent.click(startBtn);
        expect(startGameMock).toHaveBeenCalled();
    })


    it('Calls bet handler when bet input changes', () => {//Bliver bet-handleren kaldt når inputtet skifter.
        render(<GamblingCrash />);
        const betInput = screen.getAllByRole("textbox")[0];
        fireEvent.change(betInput, { target: { value: '123' } });
        expect(handleBetChangeMock).toHaveBeenCalled();
    })

    it('Calls auto-stop handler when auto-stop input changes', () => {//Bliver auto-stop-handleren kaldt når inputtet skifter.
        render(<GamblingCrash />);
        const autoInput = screen.getAllByRole("textbox")[1];
        fireEvent.change(autoInput, { target: { value: '2.5' } });
        expect(handleAutoStopChangeMock).toHaveBeenCalled();
    })

    it('Renders rules and chart', () => {//Bliver regler og grafen renderet når siden DOM bliver loadet.
        render(<GamblingCrash />);
        expect(screen.getByText(/Rules:/i)).toBeTruthy();
        expect(screen.getByText(/Mock Chart/i)).toBeTruthy();
    })

    it("Disables Start button if autoStop <= 1", () => {//Bliver start-knappen disabled ved invalid auto-stop input
        render(
            <CrashControls
                bet={50}
                autoStop={1}
                isPlaying={false}
                cashedOut={false}
                onBetChange={() => { }}
                onAutoStopChange={() => { }}
                onToggle={() => { }}
            />
        );

        const startBtn = screen.getByRole('button', { name: /Start/i });
        expect(startBtn.disabled).toBe(true);
    });

    describe('component unit renders', () => {//Inddeler nu i om komponenter bliver renderet.
        it('renders CrashMessage with given message', () => {//Bliver beskeder renderet
            render(<CrashMessage message="Test message" />);
            expect(screen.getByText('Test message')).toBeTruthy();
        });

        it('renders CrashStats with provided balance and multiplier', () => {//Bliver stats renderet
            render(<CrashStats balance={500} multiplier={2.34} />);
            expect(screen.getByText(/500/)).toBeTruthy();
            expect(screen.getByText(/2.34/)).toBeTruthy();
        });
        
        it('renders CrashRules component', () => {//Bliver reglerne renderet
            render(<CrashRules />);
            expect(screen.getByText(/Rules:/i)).toBeTruthy();
        });
    });



    describe('crashUtils', () => {//Utilities

        beforeEach(() => { vi.clearAllMocks(); });

        it('calculateMultiplier returns exponential growth', () => {//Bliver funtkionens resultat større end 1
            const result = calculateMultiplier(1);
            expect(result).toBeGreaterThan(1);
        })

        it('formatCurrency adds $ symbol', () => {//Bliver $ tilføjet til beløbet
            expect(formatCurrency(100)).toBe('100$');
        })

        it('formatMultiplier formats with 2 decimals', () => {//Bliver multiplieren nedrundet til 2 decimaler.
            expect(formatMultiplier(2.556)).toBe('2.56x');
        })

    });
});