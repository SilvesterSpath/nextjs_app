import Link from 'next/link';
import properties from '@/data/properties.json';

const PropertiesPage = () => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {properties.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
