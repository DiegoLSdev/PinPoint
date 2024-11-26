import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UrlForm = ({ addUrl, categories, addCategory, urls }) => {
  const localhost = "http://localhost:4000";
  // const deployedUrl = "https://pinpoint-3.onrender.com"; OLD URL ON RENDER
  const deployedUrl = "  https://pin-point-nine.vercel.app";


  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${deployedUrl}/api/urls`, {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });

        const urls = response.data; 
        const extractedCategories = [...new Set(urls.map(url => url.category))];
        setAllCategories(extractedCategories);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
          console.error('You have to log in first  ', error);
        }
        console.error('Error fetching URLs:', error);
      }
    };
    fetchCategories();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedUrl = {
      title: String(title),
      url: String(url),
      favicon: (() => {
        const urlObj = new URL(url);
        return `${urlObj.origin}/favicon.ico`;
      })(), 
      category: String(newCategory || category),
    };

    console.log(formattedUrl);

    try {
      const response = await axios.post(`${deployedUrl}/api/url/add`, formattedUrl, {     
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json'
        }
      });
      console.log("SERVER RESPONSE", response);
      navigate('/url-board'); 
    } catch (error) {
      console.error('Error adding URL:', error);
    }
  };

  const handleBadgeClick = (cat) => {
    setCategory(cat);
    setNewCategory('');  // Reset the new category input if user selects an existing category
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          <button className="text-red-400 hover:text-red-600">
            <a href="/url-board">x</a>
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
            />
            <input
              type="url"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
            />

            <div className="mb-4">
              <h3 className="mb-2 text-lg">Seleccionar Categoría:</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat, index) => (
                  <span
                    key={index}
                    onClick={() => handleBadgeClick(cat)}
                    className={`cursor-pointer px-4 py-2 rounded-full border ${
                      category === cat
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                    } hover:bg-indigo-600 transition`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Nueva Categoría"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                setCategory('');  // Reset the category selection if user types a new category
              }}
              disabled={!!category}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
            />

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Añadir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UrlForm;
