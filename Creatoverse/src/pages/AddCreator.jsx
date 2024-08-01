// src/pages/AddCreator.jsx
import React, { useState } from 'react';
import {supabase} from '../Client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
  const [creator, setCreator] = useState({ name: '', url: '', description: '', instagramUrl: '', twitterUrl: '' ,imageUrl: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data, error } = await supabase.from('creators').insert([creator]);
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">Add New Creator</h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="name"
            id="name"
            value={creator.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="url">
            URL:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="url"
            id="url"
            value={creator.url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            name="description"
            id="description"
            value={creator.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="instagramUrl">
            Instagram URL:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="instagramUrl"
            id="instagramUrl"
            value={creator.instagramUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="twitterUrl">
            Twitter URL:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="twitterUrl"
            id="twitterUrl"
            value={creator.twitterUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="imageUrl">
            Image URL:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={creator.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors" type="submit">
          Add Creator
        </button>
      </form>
      <button
        className="mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition-colors"
        onClick={() => navigate('/')}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddCreator;
