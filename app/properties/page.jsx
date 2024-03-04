import Link from 'next/link';
console.log('Hello from the Properties component!');
const PropertiesPage = () => {
  return (
    <div>
      <h1 className='text-3xl'>Properties</h1>
      <Link href='/'>Go Home</Link>
    </div>
  );
};

export default PropertiesPage;
