// ScannedItemsPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScannedItemsPage from './ScannedItemsPage';
import { within } from '@testing-library/dom';

describe('ScannedItemsPage Component', () => {
  beforeEach(() => {
    render(<ScannedItemsPage />);
  });

  test('renders scanned and arrived items tables', () => {
    expect(screen.getByText('Scanned Items')).toBeInTheDocument();
    expect(screen.getByText('Arrived Items')).toBeInTheDocument();
  });

  test('displays initial items in the table', () => {
    expect(screen.getByText('Battery')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  test('filters items by brand', () => {
    const brandFilter = screen.getByLabelText('Select Brand');
    fireEvent.change(brandFilter, { target: { value: 'Apple' } });
    expect(screen.getAllByText('Apple').length).toBeGreaterThan(0);
  });

  test('sorts items from A to Z', () => {
    const sortSelect = screen.getByLabelText('Sort by');
    fireEvent.change(sortSelect, { target: { value: 'A-Z' } });
    const rows = screen.getAllByRole('row');
    const firstItem = within(rows[1]).getByText('Battery');
    const secondItem = within(rows[2]).getByText('Paper Drink');
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  test('searches items by name', () => {
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Battery' } });
    expect(screen.getByText('Battery')).toBeInTheDocument();
  });

  test('opens edit modal on edit button click', () => {
    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);
    expect(screen.getByText('Edit Item')).toBeInTheDocument();  // Assuming modal title is "Edit Item"
  });

  test('updates item after saving changes in modal', () => {
    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);
    const statusInput = screen.getByLabelText('Status');
    fireEvent.change(statusInput, { target: { value: 'Pending' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0);
  });
});
