import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div id='preloader'>
      <div id='status'>
        <div className='spinner-chase'>
          <div className='chase-dot' />
          <div className='chase-dot' />
          <div className='chase-dot' />
          <div className='chase-dot' />
          <div className='chase-dot' />
          <div className='chase-dot' />
        </div>
      </div>
    </div>
  );
};
export default Preloader;
