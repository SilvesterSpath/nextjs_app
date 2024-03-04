'use client';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';

const PropertyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const name = searchParams.get('name');
  const pathname = usePathname();

  console.log('Hello from the PropertyPage component!', id);
  return (
    <div>
      PropertyPage
      <button onClick={() => router.push('/')} className='bg-blue-500 p2'>
        Go Home {pathname}
      </button>
    </div>
  );
};

export default PropertyPage;
