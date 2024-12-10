import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './login';
import { loginUser } from '../../utils/Api';
import { ToastContainer } from 'react-toastify';

// Mock the `loginUser` API call
jest.mock('../../utils/Api', () => ({
  loginUser: jest.fn(),
}));

// Mock `localStorage`
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Forget Password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
  });

  it('validates email and password inputs', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);

    expect(await screen.findByText(/Invalid email format\./i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 8 characters long\./i)).toBeInTheDocument();
  });

  it('shows API error message on failed login', async () => {
    loginUser.mockRejectedValueOnce({
      response: {
        data: { message: 'Invalid credentials' },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('navigates to dashboard on successful login', async () => {
    loginUser.mockResolvedValueOnce({
      message: 'Login successful!',
      token: 'dummy-token',
    });

    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <Login />
        <ToastContainer />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Password@123',
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'dummy-token');
    });

  });
});
