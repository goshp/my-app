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

    // Adjust rows count as per your data.
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });

  test('sorts items A-Z', async () => {
    await act(async () => {
      fireEvent.click(screen.getByText('A - Z'));
    });
  
    await waitFor(() => {
      const firstRow = screen.getAllByRole('row')[1];
      expect(firstRow).toHaveTextContent('Ajax'); // Adjust according to your expected first item after sorting A-Z
    });
  });

  test('opens and closes the add new service area modal', async () => {
    // Open the modal by clicking "Add New"
    await act(async () => {
        fireEvent.click(screen.getByText('Add New'));
    });

    // Ensure the modal with title "Create Community" appears
    await waitFor(() => {
        expect(screen.getByText('Create Community')).toBeInTheDocument();
    });

    // Close the modal by clicking the "Cancel" button
    await act(async () => {
        fireEvent.click(screen.getByText('Cancel'));
    });

    // Confirm the modal has closed by checking that the title is no longer in the document
    await waitFor(() => {
        expect(screen.queryByText('Create Community')).not.toBeInTheDocument();
    });
});
  
test('deletes a service area', async () => {
  // Step 1: Ensure the service area item (e.g., "Ajax") is in the document before deletion
  await waitFor(() => {
    expect(screen.getByText('Ajax')).toBeInTheDocument();
  });

  // Step 2: Locate the "Actions" cell in the row containing "Ajax" and find the delete button inside
  const rows = screen.getAllByRole('row'); // get all rows in the table
  const ajaxRow = rows.find(row => row.textContent.includes('Ajax')); // find the row with "Ajax"
  
  if (!ajaxRow) {
    throw new Error('Row with text "Ajax" not found');
  }

  // Step 3: Find the delete button within the actions cell of the "Ajax" row
  const deleteButton = await waitFor(() => {
    return ajaxRow.querySelectorAll('button')[1]; // Adjust index if needed (assuming delete is the second button)
  });

  expect(deleteButton).toBeInTheDocument(); // Ensure delete button is found

  // Step 4: Click the delete button
  fireEvent.click(deleteButton);

  // Step 5: Verify the service area "Ajax" is no longer in the document
  await waitFor(() => {
    expect(screen.queryByText('Ajax')).not.toBeInTheDocument();
  });
});

  test('pagination controls are displayed and functional', async () => {
    expect(screen.getByText('1-10 of 559')).toBeInTheDocument();

    const paginationButtons = screen.getAllByRole('button');
    const page2Button = paginationButtons.find((button) => button.getAttribute('aria-label') === 'Go to page 2');

    // Ensure page 2 button is found and click it
    expect(page2Button).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(page2Button);
    });

    // Confirm it navigates to page 2
    await waitFor(() => {
      expect(page2Button).toHaveClass('Mui-selected');
    });
  });
});
