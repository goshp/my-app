// ItemsTable.test.js
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemsTable from './ItemsTable'; // Ensure this path is correct

// Define mockData at the top of the file
const mockData = [
  {
    item: 'Banana',
    brand: 'Brand A',
    dims: '12 oz PET',
    parts: ['Label', 'Tag'],
    status: 'Approved',
    date: '2024-11-07',
    location: 'Warehouse 1',
  },
  {
    item: 'Apple',
    brand: 'Brand B',
    dims: '12 oz PET',
    parts: ['Label'],
    status: 'Pending',
    date: '2024-11-07',
    location: 'Warehouse 2',
  },
  {
    item: 'Orange',
    brand: 'Brand A',
    dims: '16 oz PET',
    parts: ['Tag'],
    status: 'Rejected',
    date: '2024-11-07',
    location: 'Warehouse 1',
  },
];

test('renders ItemsTable and filters items by search text', async () => {
  await act(async () => {
    render(<ItemsTable title="Item List" subtitle="Subtitle" data={mockData} onEdit={() => {}} showFilters={true} />);
  });
  
  // Verify that items are rendered
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Orange')).toBeInTheDocument();

  // Type in the search box to filter items
  const searchInput = screen.getByPlaceholderText('Search');
  userEvent.type(searchInput, 'Apple');

  // Wait for filtering to take effect
  await waitFor(() => {
    // Only Apple should be visible after filtering by search
    expect(screen.getByText('Apple')).toBeVisible();
    expect(screen.queryByText('Banana')).toBeNull();
    expect(screen.queryByText('Orange')).toBeNull();
  });
});

test('sorts items alphabetically from A to Z', async () => {
    await act(async () => {
      render(<ItemsTable title="Item List" subtitle="Subtitle" data={mockData} onEdit={() => {}} showFilters={true} />);
    });
  
    // Locate the dropdown (combobox) and click to open the options
    const sortSelectCombobox = screen.getByRole('combobox', { name: /sort options/i });
    userEvent.click(sortSelectCombobox);
  
    // Wait for the "A - Z" option to appear and select it
    const optionAtoZ = await screen.findByText('A - Z');
    userEvent.click(optionAtoZ);
  
    // Wait for the table to update and verify items are sorted alphabetically
    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1); // Skip the header row
      const sortedItems = rows.map((row) => row.cells[1].textContent); // Assuming the item name is in the 2nd column
      expect(sortedItems).toEqual(['Apple', 'Banana', 'Orange']); // Verify sorting order
    });
  });
  