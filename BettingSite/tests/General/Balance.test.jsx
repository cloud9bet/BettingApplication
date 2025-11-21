import { render } from '@testing-library/react'
import Balance from '../../src/components/Balance'
import { vi, it, expect, describe } from 'vitest'

vi.mock("../../src/Context/UserContext", () => ({
  useUserInfo: () => ({
    totalBalance: 0,
    setTotalBalance: vi.fn()
  })
}));

describe('Balance', () => {
    it('Should have intial value of 0', () => {
        const { getByTestId } = render(<Balance />);

      
        const text = getByTestId("balance").textContent;
      
        expect(text).toEqual("Balance: 0$"); 
    });
});