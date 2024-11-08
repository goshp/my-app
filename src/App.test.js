import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  test('logs in as Admin and navigates to /scanned-items on success', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Simulate login as Admin
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'gosikhena@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'Peniel2015$' } });
    fireEvent.click(screen.getByText('Log in'));

    // Check if navigate was called with '/scanned-items'
    expect(mockNavigate).toHaveBeenCalledWith('/scanned-items');
  });

  test('logs in as Employee and navigates to /scanned-items on success', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Switch to Employee and simulate login
    fireEvent.click(screen.getByText('Employee'));
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'employee@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'Employee2023$' } });
    fireEvent.click(screen.getByText('Log in'));

    // Check if navigate was called with '/scanned-items'
    expect(mockNavigate).toHaveBeenCalledWith('/scanned-items');
  });

  test('shows alert on incorrect login credentials', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Log in'));

    expect(window.alert).toHaveBeenCalledWith('Incorrect email or password');
  });
});
