import React, { useState } from 'react';
import Header from '../components/Header';
import ItemsTable from '../components/ItemsTable';
import EditItemModal from '../components/EditItemModal';
import { Pagination } from '@mui/material';
import './ScannedItemsPage.css';

// Initial data for scanned and arrived items
const initialScannedItemsData = [
  { id: 1, item: "Battery", status: "Approved", brand: "Apple", dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "17/12/2023", location: "Toronto" },
  { id: 2, item: "Paper Drink", status: "Pending", brand: "Starbucks", dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "17/12/2023", location: "Toronto" },
];

const initialArrivedItemsData = [
  { id: 3, item: "Battery", status: "Approved", brand: "Starbucks", dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "15/01/2024", location: "Toronto" },
  { id: 4, item: "Paper", status: "Approved", brand: "Apple", dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "15/01/2024", location: "Toronto" },
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

      <div className="pagination-container">
        <Pagination count={10} color="primary" />
      </div>
    </div>
  );
};

export default ScannedItemsPage;
