'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '../../assets/images/profile.png';
import Spinner from '@/components/Spinner';
import { useState, useEffect } from 'react';
import { fetchUserProperties } from '@/utils/requests';

const ProfilePage = async () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  /*  const userProperties = await fetchUserProperties(session?.user?.id);

  console.log(userProperties); */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (session?.user?.id) {
          const userProperties = await fetchUserProperties(session.user.id);

          setProperties(userProperties);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user properties:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session]);

  if (loading) {
    return <Spinner />;
  }

  const handleDeleteProperty = async (id) => {};

  return (
    <>
      <section className='bg-blue-50'>
        <div className='container m-auto py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
            <div className='flex flex-col md:flex-row'>
              <div className='md:w-1/4 mx-20 mt-10'>
                <div className='mb-4'>
                  <Image
                    className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                    src={profileImage || profileDefault}
                    alt='User'
                    width={400}
                    height={400}
                  />
                </div>
                <h2 className='text-2xl mb-4'>
                  <span className='font-bold block'>Name: </span> {profileName}
                </h2>
                <h2 className='text-2xl'>
                  <span className='font-bold block'>Email: </span>{' '}
                  {profileEmail}
                </h2>
              </div>

              <div className='md:w-3/4 md:pl-4'>
                <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
                {properties.length === 0 ? (
                  <p>You have no property listings</p>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {properties.map((item, index) => (
                      <div
                        className='mb-10'
                        key={item._id ? item._id.toString() : index}
                      >
                        <Link href={`/properties/${item._id}`}>
                          <Image
                            className='h-32 w-full rounded-md object-cover'
                            src={item.images[0]}
                            alt='Property 1'
                            width={500}
                            height={100}
                          />
                        </Link>
                        <div className='mt-2'>
                          <p className='text-lg font-semibold'>{item.name}</p>
                          <p className='text-gray-600'>
                            Address: {item.location.street}
                            {item.location.city} {item.location.state}
                          </p>
                        </div>
                        <div className='mt-2'>
                          <Link
                            href={`/properties/${item._id}/edit`}
                            className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProperty(item._id)}
                            className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                            type='button'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
