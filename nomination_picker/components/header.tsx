import React from 'react'

const Header = () => {
  return (
    <div className='bg-black text-white h-20 p-6'>
      <span className='font-serif tracking-widest text-3xl'>
        IMDB Nomination Picker
      </span>
      <span className='float-right text-green-200 italic'>Created By: Steven -</span>
    </div>
  );
}
export default Header;