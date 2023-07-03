import React from 'react';
import loader from '../../public/Images/loader.png'
import Image from 'next/image';

const Loader = () => {
    return (
        <div className='w-full p-32 mt-[30%] backdrop-blur-sm h-[400px] z-10'>
            <Image src={loader} alt="loader" className='w-[80px] animate-spin' />
        </div>
    );
};

export default Loader;