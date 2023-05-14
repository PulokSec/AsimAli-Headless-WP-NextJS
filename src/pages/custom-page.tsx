import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import { Footer, Header, Hero } from 'components';
import CustomFooter from 'components/CustomFooter';
import CustomHeader from 'components/CustomHeader';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <CustomHeader />

      <Head>
        <title>Custom Page - {generalSettings.title}</title>
      </Head>

      <Hero title="Custom Page" />

      <main className="content content-single">
        <div className="wrap">
          <p>
            You can still create pages just as you would in{' '}
            <a
              href="https://nextjs.org/docs/basic-features/pages"
              target="_blank"
              rel="noreferrer">
              Next.js
            </a>
            . Take a look at <code>src/pages/custom-page.tsx</code> for an
            example.
          </p>
        </div>
      </main>

      <CustomFooter />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
