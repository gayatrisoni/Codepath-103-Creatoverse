// src/pages/ViewCreator.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {supabase} from '../Client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="border border-black p-4">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {creator ? (
        <>
          {creator.imageUrl && <img src={creator.imageUrl} alt={`${creator.name}'s image`} className="mb-4" />}
          <h1 className="text-2xl font-bold">{creator.name}</h1>
          <p className="text-lg">{creator.description}</p>
          <div className="mt-4 flex gap-4">
            <button  onClick={() => navigate('/')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <p>No creator found.</p>
      )}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p>Are you sure you want to delete {creator?.name}?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                No, never mind
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCreator;
