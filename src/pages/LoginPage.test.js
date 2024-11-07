// LoginPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';

// Mock the `useNavigate` hook globally
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginPage Component', () => {
  let mockNavigate;

  beforeEach(() => {
    // Reset and initialize the `useNavigate` mock before each test
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('renders LoginPage component with essential elements', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  test('logs in as Admin and navigates to /scanned-items on success', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Simulate entering the admin credentials
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'gosikhena@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'Peniel2015$' } });
    fireEvent.click(screen.getByText('Log in'));

    // Assert that navigate was called with '/scanned-items'
    expect(mockNavigate).toHaveBeenCalledWith('/scanned-items');
  });

  test('logs in as Employee and navigates to /scanned-items on success', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Switch to employee and enter credentials
    fireEvent.click(screen.getByText('Employee'));
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'employee@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'Employee2023$' } });
    fireEvent.click(screen.getByText('Log in'));

    // Assert that navigate was called with '/scanned-items'
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
