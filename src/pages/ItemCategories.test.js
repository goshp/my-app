import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemCategories from './ItemCategories';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('ItemCategories Component', () => {
  test('renders component and displays initial data', () => {
    renderWithRouter(<ItemCategories />);
    
    expect(screen.getByText('Plastic Bottles')).toBeInTheDocument();
    expect(screen.getByText('Plastic Fruit & Vegetable Containers')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('sorts items alphabetically', async () => {
    renderWithRouter(<ItemCategories />);
    
    const sortSelect = screen.getByText(/Sort by: Default/i);
    userEvent.click(sortSelect);

    await waitFor(() => {
      expect(screen.queryByText((content, element) => 
        element.tagName.toLowerCase() === 'li' && content.includes('A - Z')
      )).toBeInTheDocument();
    });
    
    userEvent.click(screen.getByText((content, element) => 
      element.tagName.toLowerCase() === 'li' && content.includes('A - Z')
    ));

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      const itemNames = rows.map(row => row.cells[0].textContent);
      expect(itemNames).toEqual(['Plastic Bottles', 'Plastic Fruit & Vegetable Containers']);
    });
  });

  test('deletes an item', async () => {
    renderWithRouter(<ItemCategories />);
    
    const deleteButtons = screen.getAllByRole('button', { name: '' });
    userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Plastic Bottles')).not.toBeInTheDocument();
    });
  });

  test('sorts items alphabetically', async () => {
    renderWithRouter(<ItemCategories />);
    
    const sortSelect = screen.getByText(/Sort by: Default/i);
    userEvent.click(sortSelect);

    await waitFor(() => {
      expect(screen.getByText('A - Z')).toBeInTheDocument();
    });
    
    userEvent.click(screen.getByText('A - Z'));

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1); // Skip header row
      const itemNames = rows.map(row => row.cells[0].textContent);
      expect(itemNames).toEqual(['Plastic Bottles', 'Plastic Fruit & Vegetable Containers']);
    });
  });

  test('pagination controls are displayed and functional', () => {
    renderWithRouter(<ItemCategories />);
    
    expect(screen.getByPlaceholderText('Rows per page')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jump to')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /first page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /last page/i })).toBeInTheDocument();
  });
});
