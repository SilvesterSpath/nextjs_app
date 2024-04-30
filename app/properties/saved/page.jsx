'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error('Failed to fetch saved properties');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {properties && properties.map((item) => <PropertyCard property={item} />)}
    </>
  );
};

export default SavedPropertiesPage;
