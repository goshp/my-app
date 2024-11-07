// App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import ScannedItemsPage from './pages/ScannedItemsPage';

describe('App Component', () => {
  test('renders LoginPage at default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  test('navigates to ScannedItemsPage when logged in', () => {
    // Mock authentication
    localStorage.setItem('authToken', 'valid-token'); // Assuming token determines authentication
    render(
      <MemoryRouter initialEntries={['/scanned-items']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Scanned Items')).toBeInTheDocument();
  });

  test('redirects to LoginPage for protected route without authentication', () => {
    localStorage.removeItem('authToken'); // Clear token for unauthenticated test
    render(
      <MemoryRouter initialEntries={['/scanned-items']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  test('navigates between pages using links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/scanned-items" element={<ScannedItemsPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate successful login (or direct navigation)
    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    // Assuming navigation is successful after clicking log in
    expect(screen.getByText('Scanned Items')).toBeInTheDocument();
  });
});
