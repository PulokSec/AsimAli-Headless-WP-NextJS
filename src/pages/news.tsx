import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Header, Footer, Hero } from '../components';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import Moment from 'react-moment';



export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ 
      pages(where: {id: 250}) {
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
                news {
                  newsBannerTitle
                  newsBannerBackgroundImage {
                    altText
                    sourceUrl
                  }
                }
              }
      }
      settingsOptions {
      AsimOptions {
        headerSettings {
          uploadLogo {
            sourceUrl
            altText
          }
        }
        footerSettings {
        socialUrl {
          facebook
          tiktok
          linkedin
          instagram
        }
        copyrightText
        footerLeftWidget {
          title
          phoneNumber
          emailAddress
        }
        footerLogoSection {
          logoText
          logoUpload {
            altText
            sourceUrl
          }
        }
        footerRightWidget {
          title
          address
        }
      }
   
      }
    }

    menus(where: {location: PRIMARY}) {
      nodes {
        name
        slug
        menuItems(first: 50){
          nodes {
            url
            target
            parentId
            label
            cssClasses
            description
            id
            childItems {
              nodes {
                uri
                label
              }
            }
          }
        }
      }
    }
  }`,
  });

  return {
    props: {
      newsData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  newsData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};


const News = (props: MyProps) => {

  const { newsData, metaData, settings, mainMenus } = props;

  const [news, setNews] = useState([]);
  const [isLoading, seIsLoading] = useState(true);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 6;




  useEffect(() => {
    const client = new ApolloClient({
      uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql`
          query{
            posts (where: {offsetPagination: {size: 10000 }}) {
              nodes {
                title
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                excerpt
                content
                slug
                uri
                date
                author {
                  node {
                    name
                  }
                }
              }
            }
          }`,
      })
      .then((result) => {

        const count = result?.data?.posts?.nodes.length;

        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);



      }

      );
    const offset = size * page;
    client
      .query({
        query: gql`
          query{
            posts (where: {offsetPagination: {offset: ${offset},  size: ${size}}}) {
              nodes {
                title
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                excerpt
                content
                slug
                uri
                date
                author {
                  node {
                    name
                  }
                }
              }
            }
          }`,
      })
      .then((result) => {
        seIsLoading(false);
        setNews(result?.data?.posts?.nodes);

      }

      );



  }, [page]);


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <div>
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
      <Header settings={settings} mainMenus={mainMenus} />

      {newsData?.map((data, i) => {
        return (
          <div key={i}>
            <main className="content">
              <Hero
                title={data?.news.newsBannerTitle}
                bgImage={data?.news?.newsBannerBackgroundImage?.sourceUrl}
              />

              {isLoading &&
                <div className="text-center py-5">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }

              <Container className="my-5 blog-container">
                <h1 className="my-3">{data?.news?.newsBannerTitle}</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4 items">
                  {news?.map((item, index) => {
                    return (
                      <div key={index} className="col">
                        <div className="card h-100">
                          <div className="blogImage">
                            <Image
                              loader={myLoader}
                              src={item?.featuredImage?.node?.sourceUrl}
                              width="100%"
                              height="65"
                              layout="responsive"
                              objectFit="contain"
                              alt={item?.featuredImage?.node?.altText} />
                          </div>
                          <div className="card-body">
                            <Link href={item?.uri}><h2 className="card-title">{item?.title}</h2>
                            </Link>
                            <span>

                             By Cansoft | <Moment format="MMM D, YYYY" >{item?.date}</Moment></span>
                            {/* <p dangerouslySetInnerHTML={{__html: blog?.content.textContent }}className="card-text my-3"></p> */}
                            <p className='blog-content'>{item?.content?.replace(/(<([^>]+)>)/ig, '')}</p>
                          </div>
                          <div className="card-footers p-3">
                            <Link href={item?.uri}>
                              <Button className="readMoreBtn" >Read <span>More</span></Button>
                            </Link>
                          </div>
                        </div>
                      </div>

                    )
                  })}



                </div>
                <div className="pagination">
                  {
                    [...Array(pageCount).keys()].map((number) => <Button
                      className={number == page ? "contactBtn selected" : 'contactBtn'}
                      key={number}
                      onClick={() => setPage(number)}
                    >{number + 1}
                    </Button>)
                  }
                </div>
              </Container>

            </main>

          </div>
        )
      })}



      <Footer settings={settings} mainMenus={mainMenus} />
    </div>
  );
};

export default News;