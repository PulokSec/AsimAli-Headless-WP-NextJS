import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/', undefined, { shallow: true, locale: false });
  }, [router]);

  return null;
}

export default Redirect;
