import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ServiceAreas from './ServiceAreas';
import '@testing-library/jest-dom';

describe('ServiceAreas Component', () => {
  const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

  beforeEach(() => {
    renderWithRouter(<ServiceAreas />);
    screen.debug();
  });

  test('renders the component and displays initial data', async () => {
    expect(screen.getByText('Service Area')).toBeInTheDocument();
    expect(screen.getByText('Show: All Products')).toBeInTheDocument();
    expect(screen.getByText('Add New')).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });

  test('sorts items A-Z', async () => {
    await act(async () => {
      fireEvent.click(screen.getByText('A - Z'));
    });
  
    await waitFor(() => {
      const firstRow = screen.getAllByRole('row')[1];
      expect(firstRow).toHaveTextContent('Ajax');
    });
  });

  test('opens and closes the add new service area modal', async () => {
    await act(async () => {
        fireEvent.click(screen.getByText('Add New'));
    });

    await waitFor(() => {
        expect(screen.getByText('Create Community')).toBeInTheDocument();
    });

    await act(async () => {
        fireEvent.click(screen.getByText('Cancel'));
    });

    await waitFor(() => {
        expect(screen.queryByText('Create Community')).not.toBeInTheDocument();
    });
});
  
test('deletes a service area', async () => {
  await waitFor(() => {
    expect(screen.getByText('Ajax')).toBeInTheDocument();
  });

  const rows = screen.getAllByRole('row');
  const ajaxRow = rows.find(row => row.textContent.includes('Ajax'));
  
  if (!ajaxRow) {
    throw new Error('Row with text "Ajax" not found');
  }

  const deleteButton = await waitFor(() => {
    return ajaxRow.querySelectorAll('button')[1];
  });

  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText('Ajax')).not.toBeInTheDocument();
  });
});

  test('pagination controls are displayed and functional', async () => {
    expect(screen.getByText('1-10 of 559')).toBeInTheDocument();

    const paginationButtons = screen.getAllByRole('button');
    const page2Button = paginationButtons.find((button) => button.getAttribute('aria-label') === 'Go to page 2');

    expect(page2Button).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(page2Button);
    });

    await waitFor(() => {
      expect(page2Button).toHaveClass('Mui-selected');
    });
  });
});
