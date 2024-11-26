import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import Login from './components/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import UrlList from './components/UrlList';

function App() {
  const [urls, setUrls] = useState([]);
  const [categories, setCategories] = useState([]);

  const addUrl = async (urlData) => {
    try {
      const faviconUrl = getFavicon(urlData.url);
      setUrls([...urls, { ...urlData, favicon: faviconUrl }]);
    } catch (error) {
      console.error('Error fetching favicon:', error);
      setUrls([...urls, { ...urlData }]); // Add URL without favicon if an error occurs
    }
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const getFavicon = (url) => {
    const urlObj = new URL(url);
    return `${urlObj.origin}/favicon.ico`;
  };

  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-url" element={<UrlForm addUrl={addUrl} categories={categories} addCategory={addCategory} urls={urls} />} />
        <Route path="/url-board" element={<UrlList urls={urls} />
        } />
      </Routes>
    </Router>

  );
}

export default App;
