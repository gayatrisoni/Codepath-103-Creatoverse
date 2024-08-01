import React from 'react';
import { Link } from 'react-router-dom';


const Card = ({ creator }) => {
  return (
        <div 
        className="relative flex flex-col gap-4 text-white border border-blue-200 p-4 bg-cover w-full h-96 "
        style={{ backgroundImage: `url(${creator.imageUrl})` }}
        >
        
          <div className=" relative  z-10 flex flex-col gap-8 p-4 ">
            {/* <div className='items-center gap-2'> */}
              {/* {creator.imageUrl && <img src={creator.imageUrl} alt={`${creator.name}'s image`} />} */}
              <div className="flex  justify-between">
                <div>
                  <h2 className="text-lg font-bold">{creator.name}</h2>
                </div>
                <div className="flex gap-2">
                  <Link to={`/creator/${creator.id}`}>
                    <img className="w-6 h-6" src="images/information.png" alt="View More Info" />
                  </Link>
                  <Link to={`/edit/${creator.id}`}>
                    <img className="w-6 h-6" src="images/edit.png" alt="Edit" />
                  </Link>
                </div>
              </div>
              <div className='flex gap-4'>
                
                <a href={creator.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <img className='w-8' src="images/instagram_icon.png" alt="Instagram" />
                </a>
                <a href={creator.twitterUrl} target="_blank" rel="noopener noreferrer">
                  <img className='w-8' src="images/twitter.png" alt="Twitter" />
                </a>
              </div>
              <div className='mb-2 '>
                <p>{creator.description}</p>
              </div>
              
            {/* </div> */}
            
          </div>
        </div>
    
  );
};

export default Card;
