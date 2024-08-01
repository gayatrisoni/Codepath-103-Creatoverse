// src/pages/EditCreator.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {supabase} from '../Client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({ name: '', url: '', description: '', instgrameUrl: '', twitterUrl: '',  imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        let { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
        if (error) throw error;
        setCreator(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator((prevCreator) => ({
      ...prevCreator,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('creators').update(creator).eq('id', id);
      if (error) throw error;
      navigate(`/creator/${id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="edit-creator p-4 bg-black ">
    <h1 className="text-2xl font-bold mb-4 text-white">Edit Creator</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="block">
        <span className="text-white ">Name:</span>
        <input
          type="text"
          name="name"
          value={creator.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block">
        <span className="text-white">URL:</span>
        <input
          type="text"
          name="url"
          value={creator.url}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block">
        <span className="text-white">Description:</span>
        <textarea
          name="description"
          value={creator.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block">
        <span className="text-white">Instagram URL:</span>
        <input
          type="text"
          name="instagramUrl"
          value={creator.instagramUrl}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block">
        <span className="text-white">Twitter URL:</span>
        <input
          type="text"
          name="twitterUrl"
          value={creator.twitterUrl}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block">
        <span className="text-white">Image URL:</span>
        <input
          type="text"
          name="imageUrl"
          value={creator.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Creator
        </button>
        <button
          type="button"
          onClick={() => navigate(`/creator/${id}`)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditCreator;
