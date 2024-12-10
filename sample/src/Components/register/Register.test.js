import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './register';

jest.mock('../../utils/Api', () => ({
  registerUser: jest.fn()
}));

describe('Register Component', () => {
    // Mute all console.warn calls before the tests run
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  // Restore the original console.warn after the tests
  afterAll(() => {
    console.warn.mockRestore();
  });
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  };

  test('renders the registration form with all inputs', () => {
    renderComponent();

    // Add debug to inspect the rendered component
  screen.debug(); // This will print the HTML structure to the console

    expect(screen.getByText(/Create your Fundo Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('shows error messages when fields are empty and form is submitted', async () => {
    renderComponent();

    const registerButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid password type/i)).toBeInTheDocument();
    });
  });

  test('validates and submits the form successfully', async () => {
    const mockRegister = require('../../utils/Api').registerUser;
    mockRegister.mockResolvedValueOnce({ message: 'Registration successful!' });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password@123' } });
    fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'Password@123' } });

    const registerButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password@123'
      });
    });

    expect(screen.queryByText(/First name is required/i)).toBeNull();
    expect(screen.queryByText(/Last name is required/i)).toBeNull();
    expect(screen.queryByText(/Invalid email format/i)).toBeNull();
    expect(screen.queryByText(/Invalid password type/i)).toBeNull();
  });
});

