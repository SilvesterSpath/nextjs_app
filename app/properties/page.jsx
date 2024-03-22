import PropertyCard from '@/components/PropertyCard';
import properties from '@/data/properties.json';

async function fetchProperties() {
  try {
    // this is on the server so I have to include full domain
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
    );
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  console.log(properties[0]._id);

  // Sort properties by date
  properties.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((item, index) => (
              <PropertyCard
                key={item._id ? item._id.toString() : index}
                property={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
