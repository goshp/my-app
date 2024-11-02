import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ScannedItemsPage from './ScannedItemsPage';
import ProfilePage from './ProfilePage'; // Import ProfilePage
import ItemCategories from './pages/ItemCategories';
import ServiceAreas from './pages/ServiceAreas';
import BinsDataPage from './pages/BinsDataPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/scanned-items" element={<ScannedItemsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/item-categories" element={<ItemCategories />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/bins-data" element={<BinsDataPage />} />
        {/* Add routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
