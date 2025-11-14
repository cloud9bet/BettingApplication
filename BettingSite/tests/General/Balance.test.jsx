import { render } from '@testing-library/react'
import Balance from '../../src/components/Balance'
import { vi, it, expect, describe } from 'vitest'

vi.mock('../../src/Context/BalanceContext', () => {
return{
    usetotalBalance: () => ({
        totalBalance: 2000,
        setTotalBalance: vi.fn(),
    }),
};
});

describe('Balance', () => {
    it('Should have intial value of 1000', () => {
        const { getByTestId } = render(<Balance />);

        // const balanceValue = Number(getByTestId("balance").textContent);
        // expect(balanceValue).toEqual(1000);      
        const text = getByTestId("balance").textContent;
        // const balanceValue = parseInt(text.match(/\d+/)[0]);
        expect(text).toEqual("Balance: 2000 $"); //ændrer til 0 efter
    });
});