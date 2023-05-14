import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType } from 'client';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import CustomHeader from 'components/CustomHeader';
import CustomFooter from 'components/CustomFooter';


export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    const client = new ApolloClient({
      uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
      cache: new InMemoryCache(),
    });


    client
      .query({
        query: gql`query{
        pages(where: {id: ${page.pageId}}) {
          nodes {
            seo {
              title
              description
              canonicalUrl
              focusKeywords
              openGraph {
                image {
                  url
                }
              }
            }
          }
        }
      }`,
      })
      .then((result) => setMetaData(result?.data?.pages?.nodes));

  }, [page]);


  return (
    <>
      <Head>
        {metaData.map((meta) => {
          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta property="og:description" content={meta?.seo?.description} />
              <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
            </>
          )
        })}
      </Head>
      <CustomHeader />

      <Hero
        title={page?.title()}
        bgImage={page?.featuredImage?.node.sourceUrl()}
      />

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
        </div>
      </main>

      <CustomFooter />

    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
}



export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
