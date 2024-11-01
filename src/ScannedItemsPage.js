import React, { useState } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import Header from './components/Header';
import Filters from './components/Filters';
import ItemsTable from './components/ItemsTable';
import EditItemModal from './components/EditItemModal';
import { Pagination } from '@mui/material';
import './ScannedItemsPage.css';

const scannedItemsData = [
  { id: 1, item: "Battery", status: "Approved", brand: "Apple", dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "17/12/2023", location: "Toronto" },
  { id: 2, item: "Paper Drink", status: "Pending", brand: "Starbucks", dims: "12 oz PET", parts: "Label, Tag", rewards: 10, date: "17/12/2023", location: "Toronto" },
];

const arrivedItemsData = [
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
  const [sortOption, setSortOption] = useState("Default");
  const [brand, setBrand] = useState('');
  const [dimension, setDimension] = useState('');
  const [part, setPart] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [scannedItems, setScannedItems] = useState(scannedItemsData);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleUpdateItem = (updatedItem) => {
    setScannedItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setModalOpen(false);
  };

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortOption(sortValue);
    setScannedItems((prevItems) => 
      [...prevItems].sort((a, b) => {
        if (sortValue === "A-Z") return a.item.localeCompare(b.item);
        if (sortValue === "Z-A") return b.item.localeCompare(a.item);
        return 0;
      })
    );
  };  

  const filterItems = (items) => {
    return items.filter(item =>
      (brand === '' || item.brand === brand) &&
      (dimension === '' || item.dims.includes(dimension)) &&
      (part === '' || item.parts.includes(part))
    );
  };

  const filteredScannedItems = filterItems(scannedItems);
  const filteredArrivedItems = filterItems(arrivedItemsData);

  return (
    <div className="scanned-items-page">
      <Header />
      <div className="scanned-items-header">
        <div className="scanned-items-title">
            <h2>Scanned Items</h2>
            <p>See all of your scanned items here.</p>
        </div>

        <div className="sort-container">
            <FormControl variant="outlined" size="small" className="sort-dropdown">
                <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    displayEmpty
                    renderValue={(selected) => `Sort by: ${selected || "Default"}`} // Customize displayed text
                >
                    <MenuItem value="Default">Default</MenuItem>
                    <MenuItem value="A-Z">A - Z</MenuItem>
                    <MenuItem value="Z-A">Z - A</MenuItem>
                </Select>
            </FormControl>
        </div>




        <Filters
            brand={brand} setBrand={setBrand}
            dimension={dimension} setDimension={setDimension}
            part={part} setPart={setPart}
            />
      </div>


      <ItemsTable title="Scanned Items" data={filteredScannedItems} onEdit={handleEditClick} />

      <div className="arrived-items-header">
        <h2>Arrived Items</h2>
        <p>{getFormattedDate()}</p>
      </div>
      <ItemsTable title="Arrived Items" data={filteredArrivedItems} onEdit={handleEditClick} />

      <EditItemModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        onSave={handleUpdateItem}
      />

      <div className="pagination-container">
        <Pagination count={10} color="primary" />
      </div>
    </div>
  );
};

export default ScannedItemsPage;
