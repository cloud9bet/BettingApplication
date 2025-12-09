import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProtectedRoutes from '../../src/utils/Protected';


vi.mock('react-router-dom', () => ({
  Outlet: () => <div>Outlet rendered</div>,
  Navigate: ({ to }) => <div>Navigate to {to}</div>,
}));

describe('Protected Routes', () => {
  const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
    });
  });

  it('renders Outlet if JWT exists', () => {
    sessionStorageMock.getItem.mockReturnValue('eydfghFAKEsdfghhgfd');

    const { getByText } = render(<ProtectedRoutes />);
    expect(getByText('Outlet rendered')).toBeTruthy();
    expect(sessionStorageMock.getItem).toHaveBeenCalledWith('JWT');
  });

  it('renders Navigate to login if JWT missing', () => {
    sessionStorageMock.getItem.mockReturnValue(null);

    const { getByText } = render(<ProtectedRoutes />);
    expect(getByText('Navigate to /login')).toBeTruthy();
    expect(sessionStorageMock.getItem).toHaveBeenCalledWith('JWT');
  });
});