// src/pages/ShowCreators.jsx
import React, { useEffect, useState } from 'react';
import {supabase} from '../Client';
import Card from '../components/Card';
import { Link } from 'react-router-dom';


const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreators, setShowCreators] = useState(false);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        let { data, error } = await supabase.from('creators').select('*');
        if (error) throw error;
        setCreators(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const handleViewAllClick = () => {
    setShowCreators(true);
  };


  return (
    <div className="flex flex-col p-6 bg-black min-h-screen">
      <h1 className='font-bold text-xl text-white mb-4'>Creatoverse</h1>
      <div className="mb-4">
        <button
          onClick={handleViewAllClick}
          className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
        >
          View All Creators
        </button>
        <Link to="/new">
          <button className='bg-green-500 text-white px-4 py-2 rounded'>
            Add a Creator
          </button>
        </Link>
      </div>

      {showCreators && (
        <div>
          {loading && <p className='text-white'>Loading...</p>}
          {error && <p className='text-red-500'>Error: {error}</p>}
          {creators.length === 0 ? (
            <p className='text-white'>No content creators found.</p>
          ) : (
            <div className="grid grid-cols-2">
              {creators.map((creator) => (
                <div key={creator.id} className="m-2">
                  <Card creator={creator} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};




export default ShowCreators;
