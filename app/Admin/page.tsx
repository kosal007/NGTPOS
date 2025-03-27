import React from 'react';

const Adminpage = () => {
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <h1 className="text-5xl font-light text-gray-800 mb-8">Welcome Morchil</h1>
      
      <div className="max-w-2xl w-full rounded-lg overflow-hidden shadow-sm">
        <img 
          src="https://static.vecteezy.com/system/resources/thumbnails/005/422/610/small_2x/happy-khmer-new-year-background-free-vector.jpg" 
          alt="Khmer New Year Celebration"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Adminpage;