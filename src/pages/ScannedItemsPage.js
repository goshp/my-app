import React, { useState } from 'react';
import Header from '../components/Header';
import ItemsTable from '../components/ItemsTable';
import EditItemModal from '../components/EditItemModal';
import { Box, Typography, Select, MenuItem, Pagination, TextField } from '@mui/material';
import './ScannedItemsPage.css';

// Initial data for scanned and arrived items
const initialScannedItemsData = [
  { id: 1, item: "Battery", status: "Approved", brand: "Apple", dims: "12 oz PET", 
    parts: "Label, Tag", rewards: 10, date: "17/12/2023", location: "Toronto", 
    image: require("../assets/avatar7@3x.png") },
  { id: 2, item: "Paper Drink", status: "Pending", brand: "Starbucks", 
    dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "17/12/2023", 
    location: "Toronto", image: require("../assets/avatar1@3x.png") },
];

const initialArrivedItemsData = [
  { id: 3, item: "Battery", status: "Approved", brand: "Starbucks", 
    dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "15/01/2024", 
    location: "Toronto", image: require("../assets/avatar7@3x.png") },
  { id: 4, item: "Paper", status: "Approved", brand: "Apple", 
    dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "15/01/2024", 
    location: "Toronto", image: require("../assets/avatar7@3x.png") },
];

const getFormattedDate = () => {
  const today = new Date();
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(today);
};

const ScannedItemsPage = () => {
  const [scannedItemsData, setScannedItemsData] = useState(initialScannedItemsData);
  const [arrivedItemsData, setArrivedItemsData] = useState(initialArrivedItemsData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState('');

  // Open modal for editing
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Update item data after editing
  const handleUpdateItem = (updatedItem) => {
    const updateArray = (array) =>
      array.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );

    setScannedItemsData(updateArray(scannedItemsData));
    setArrivedItemsData(updateArray(arrivedItemsData));
    setModalOpen(false);
  };

  // Pagination handlers
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page when rows per page changes
  };

  const handleJumpToPageChange = (event) => {
    setJumpToPage(event.target.value);
  };

  const handleJumpToPageSubmit = () => {
    const pageNumber = parseInt(jumpToPage, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(scannedItemsData.length / rowsPerPage)) {
      setPage(pageNumber);
    }
    setJumpToPage(''); // Clear input after submission
  };

  return (
    <div className="scanned-items-page">
      <Header activePage="Scanned Items" />

      <div className="items-table-container">
        <ItemsTable 
          title="Scanned Items" 
          subtitle="See all of your scanned items here."
          data={scannedItemsData} 
          onEdit={handleEditClick} 
          showFilters={true}
        />
      </div>

      <div className="items-table-container">
        <ItemsTable
          title="Arrived Items"
          subtitle={`Updated on ${getFormattedDate()}`}
          data={arrivedItemsData}
          onEdit={handleEditClick}
          showFilters={false}
        />
      </div>

      <EditItemModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        itemData={selectedItem}  // Update to itemData
        onSave={handleUpdateItem}
      />

      {/* Pagination Controls */}
      <Box className="bins-pagination">
        <Typography variant="body2">1-10 of {scannedItemsData.length}</Typography>
        <Pagination
          count={Math.ceil(scannedItemsData.length / rowsPerPage)}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
          showFirstButton
          showLastButton
        />
        
        {/* Rows per page selection */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Rows per page:</Typography>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            variant="outlined"
            size="small"
            className="rows-per-page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Box>

        {/* Jump to page */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Jump to:</Typography>
          <TextField
            variant="outlined"
            size="small"
            value={jumpToPage}
            onChange={handleJumpToPageChange}
            onBlur={handleJumpToPageSubmit}
            className="jump-to-page"
            placeholder="Page"
          />
        </Box>
      </Box>
    </div>
  );
};

export default ScannedItemsPage;
