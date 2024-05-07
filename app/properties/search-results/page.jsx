'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { fetchSearchResults } from '@/utils/requests';

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

  properties && console.log('properties', properties);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        properties.map((item) => <PropertyCard key={item.id} property={item} />)
      )}
    </>
  );
};

export default SearchResultsPage;
