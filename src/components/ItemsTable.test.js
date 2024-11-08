// ItemsTable.test.js
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemsTable from './ItemsTable'; // Ensure this path is correct

// Updated mock data to use "Apple" and "Starbucks"
const mockData = [
  {
    item: 'Battery',
    brand: 'Apple',
    dims: '12 oz PET',
    parts: ['Label', 'Tag'],
    status: 'Approved',
    date: '2024-11-07',
    location: 'Toronto',
  },
  {
    item: 'Paper Drink',
    brand: 'Starbucks',
    dims: '12 oz PET',
    parts: ['Label', 'Tag'],
    status: 'Pending',
    date: '2024-11-07',
    location: 'Toronto',
  },
];

test('filters items by brand', async () => {
  await act(async () => {
    render(<ItemsTable title="Scanned Items" subtitle="See all of your scanned items here." data={mockData} onEdit={() => {}} showFilters={true} />);
  });

  // Locate and open the "Select Brand" dropdown
  const brandSelectCombobox = screen.getByRole('combobox', { name: /brand filter/i });
  userEvent.click(brandSelectCombobox);

  // Wait for the "Apple" option to appear in the dropdown and select it
  const appleOption = await screen.findByRole('option', { name: 'Apple' });
  userEvent.click(appleOption);

  // Wait for the table to update and verify only items with "Apple" as the brand are visible
  await waitFor(() => {
    // "Battery" from "Apple" should be visible
    expect(screen.getByText('Battery')).toBeInTheDocument();

    // "Paper Drink" from "Starbucks" should not be visible
    expect(screen.queryByText('Paper Drink')).toBeNull();
  });
});
