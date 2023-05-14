import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import CustomHeader from 'components/CustomHeader';
import CustomFooter from 'components/CustomFooter';
import CustomHero from 'components/CustomHero';

export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
}

export function PostComponent({ post }: PostProps) {
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
        posts(where: {id: ${post?.postId}}) {
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
      .then((result) => setMetaData(result?.data?.posts?.nodes));

  }, [post]);

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

      <CustomHero
        title={post?.title()}
        bgImage={post?.featuredImage?.node?.sourceUrl()}
      />
      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} />
        </div>
      </main>

      <CustomFooter />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
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
