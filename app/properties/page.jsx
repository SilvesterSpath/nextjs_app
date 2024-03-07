'use client';

import Link from 'next/link';
import properties from '@/data/properties.json';

const PropertiesPage = () => {
  console.log(properties);
  return (
    <div>
      <h1 className='text-3xl'>Properties</h1>
      <Link href='/'>Go Home</Link>
    </div>
  );
};

export default PropertiesPage;
