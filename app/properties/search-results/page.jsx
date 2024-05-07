'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { fetchSearchResults } from '@/utils/requests';
import Link from 'next/link';
import { FaArrowCircleLeft } from 'react-icons/fa';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSearchResults(location, propertyType);
      setProperties(data);
      setLoading(false);
    };
    fetchData();
  }, [location, propertyType]);

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowCircleLeft className='mr-2 mb-1' /> Back to Properties
          </Link>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            {properties && properties.length === 0
              ? 'No search results found'
              : properties.length === 1
              ? 'Search Result'
              : 'Search Results'}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {loading ? (
              <Spinner />
            ) : (
              properties.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );

  /* return loading ? (
    <Spinner />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto'>
        <Link
          href='/properties'
          className='flex items-center text-blue-500 hover:underline mb-3'
        >
          <FaArrowCircleLeft className='mr-2 mb-1' /> Back to Properties
        </Link>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          {properties && properties.length === 0
            ? 'No results found'
            : properties.length === 1
            ? 'Search Result'
            : 'Search Results'}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {loading ? (
            <Spinner />
          ) : (
            properties.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))
          )}
        </div>
      </div>
    </section>
  ); */
};

export default SearchResultsPage;
