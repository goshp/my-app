import React, { useState } from 'react';
import {
  Box, Typography, Select, MenuItem, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import badgeIcon1 from '../assets/image-910@2x.png';
import badgeIcon2 from '../assets/image-911@2x.png';
import ItemCatHeader from '../components/ItemCatHeader';
import AddItemCatModal from '../components/AddItemCatModal'; // Import the modal component
import './ItemCategories.css';

const initialData = [
  { id: 1, name: "Plastic Bottles", type: "Recyclable", description: "Spiral wound containers are included in a provincial recycling program...", rewards: { points: 10, tokens: 1 }, image: "https://via.placeholder.com/40", acceptance: "Inactive" },
  { id: 2, name: "Plastic Fruit & Vegetable Containers", type: "Recyclable", description: "Using toiletry bottles when you travel allows you to bring all your favourite...", rewards: { points: 10, tokens: 1 }, image: "https://via.placeholder.com/40", acceptance: "Active" },
];

const ItemCategories = () => {
  const [sortOption, setSortOption] = useState("Default");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [isModalOpen, setModalOpen] = useState(false);

  // Handler for opening and closing modal
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Handler for sorting (optional)
  const handleSortChange = (event) => setSortOption(event.target.value);

  // Handler for saving new item data from modal
  const handleSaveNewItem = (newItem) => {
    setData(prevData => [
      ...prevData,
      {
        id: prevData.length + 1,
        name: newItem.itemCategory,
        type: newItem.categoryType,
        description: "New item description...", // You can add a description field to modal form if needed
        rewards: { points: 10, tokens: 1 }, // Set rewards or add fields in modal
        image: "https://via.placeholder.com/40", // Placeholder or set to uploaded image
        acceptance: newItem.activeStatus
      }
    ]);
    handleCloseModal(); // Close modal after saving
  };

  return (
    <Box className="item-categories-page" p={3}>
      {/* Header Section */}
      <ItemCatHeader />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" component="h1" className="title">Item Categories</Typography>
          <Typography variant="body2" color="textSecondary">See all of your retail deals here.</Typography>
        </Box>
        <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleOpenModal}>
          Add New
        </Button>
      </Box>

      {/* Sort Controls */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          displayEmpty
          variant="outlined"
          size="small"
          className="sort-select"
        >
          <MenuItem value="Default">Sort by: Default</MenuItem>
          <MenuItem value="A-Z">A - Z</MenuItem>
          <MenuItem value="Z-A">Z - A</MenuItem>
        </Select>
        <Box className="sort-order">
          <Typography variant="body2" color="textSecondary">A - Z</Typography>
          <Typography variant="body2" color="textSecondary">Z - A</Typography>
        </Box>
      </Box>

      {/* Item Categories Table */}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Category Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Rewards</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Acceptance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1} alignItems="center">
                    {/* Token Badge */}
                    <Box className="reward-badge-container">
                      <span className="reward-number">{item.rewards.tokens}</span>
                      <img src={badgeIcon1} alt="Token Badge" width={20} height={20} className="reward-badge" />
                    </Box>

                    {/* Point Badge */}
                    <Box className="reward-badge-container">
                      <span className="reward-number">{item.rewards.points}</span>
                      <img src={badgeIcon2} alt="Point Badge" width={20} height={20} className="reward-badge" />
                    </Box>
                  </Box>
                </TableCell>

                <TableCell><img src={item.image} alt={item.name} width={40} height={40} /></TableCell>
                <TableCell>{item.acceptance}</TableCell>
                <TableCell>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Typography variant="body2">1-10 of {data.length}</Typography>
        <Pagination
          count={10}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
        />
      </Box>

      {/* Add Item Category Modal */}
      <AddItemCatModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveNewItem} />
    </Box>
  );
};

export default ItemCategories;
