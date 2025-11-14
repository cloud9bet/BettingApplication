import { render, fireEvent } from '@testing-library/react'
import CoinflipGame from "../../src/components/CoinflipGame/gameComponents/coinflipGame"
import Coin from "../../src/components/CoinflipGame/gameComponents/coin"
import { vi, it, expect, describe } from 'vitest'


// CoinflipGame

vi.mock('../../src/Context/BalanceContext', () => {
    return {
        usetotalBalance: () => ({
            totalBalance: 1000,
            setTotalBalance: vi.fn(),
        }),
    };
});

describe('CoinflipGame', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders initial balances and buttons', () => {
        const { getByText, getByRole } = render(<CoinflipGame />);
        expect(getByText('0$')).toBeTruthy();
        expect(getByText('Head')).toBeTruthy();
        expect(getByText('Tail')).toBeTruthy();
        expect(getByRole('button', { name: /Spin/i })).toBeTruthy();
    });

    it('selects head and tail buttons', () => {
        const { getByText } = render(<CoinflipGame />);
        const headBtn = getByText('Head');
        const tailBtn = getByText('Tail');

        fireEvent.click(headBtn);
        expect(headBtn.classList.contains('selected')).toBe(true);
        expect(tailBtn.classList.contains('selected')).toBe(false);

        fireEvent.click(tailBtn);
        expect(tailBtn.classList.contains('selected')).toBe(true);
        expect(headBtn.classList.contains('selected')).toBe(false);
    });

    it('updates bet input correctly', () => {
        const { getByRole } = render(<CoinflipGame />);
        const betInput = getByRole('textbox');

        fireEvent.change(betInput, { target: { value: '50' } });
        expect(betInput.value).toBe('50');

        fireEvent.change(betInput, { target: { value: '1050' } });
        expect(betInput.value).not.toBe('1050');
    });

    it('flips coin and sets anim', () => {
        const { getByRole, getByText } = render(<CoinflipGame />);
        const spinBtn = getByRole('button', { name: /Spin/i });
        const headBtn = getByText('Head');

        fireEvent.click(headBtn);
        const betInput = getByRole('textbox');
        fireEvent.change(betInput, { target: { value: '10' } });

        fireEvent.click(spinBtn);
        expect(spinBtn.classList.contains('selected')).toBe(false);
    });

it('handles animation end and updates balance', () => {
  const { getByTestId, getByText, getByRole } = render(<CoinflipGame />);
  const headBtn = getByText('Head');
  const betInput = getByRole('textbox');
  const spinBtn = getByText('Spin');

  fireEvent.change(betInput, { target: { value: '10' } });
  fireEvent.click(headBtn);
  fireEvent.click(spinBtn);

  const coin = getByTestId('coin-id'); 
  fireEvent.animationEnd(coin);

  const balanceLabel = getByTestId('balance-label');
  expect(balanceLabel.textContent).toMatch(/10\$| -10\$/);
});

});


// Coin

describe('Coin', () => {

    it('renders head and tail images', () => {
        const { getByAltText } = render(
            <Coin onAnimationEnd={() => { }} anim="" currentSide="heads" />
        );

        expect(getByAltText('head')).toBeTruthy();
        expect(getByAltText('tail')).toBeTruthy();
    });

    it('applies correct classes when animation is active', () => {
        const { getByTestId } = render(
            <Coin onAnimationEnd={() => { }} anim="spin-heads" currentSide="heads" />
        );

        const coinDiv = getByTestId('coin-id');

        expect(coinDiv.classList.contains('coin')).toBe(true);
        expect(coinDiv.classList.contains('spin-heads')).toBe(true);
        expect(coinDiv.classList.contains('heads-result')).toBe(false);
    });

    it('applies result class when animation is not active', () => {
        const { getByTestId } = render(
            <Coin onAnimationEnd={() => { }} anim="" currentSide="tails" />
        );

        const coinDiv = getByTestId('coin-id');
       expect(coinDiv.classList.contains('tails-result')).toBe(true);

    });

    it('calls onAnimationEnd callback when animation ends', () => {
        const onAnimationEndMock = vi.fn();
        const { getByTestId } = render(
            <Coin onAnimationEnd={onAnimationEndMock} anim="spin-heads" currentSide="heads" />
        );

        const coinDiv = getByTestId('coin-id');
        fireEvent.animationEnd(coinDiv);

        expect(onAnimationEndMock).toHaveBeenCalledTimes(1);
    });

});
