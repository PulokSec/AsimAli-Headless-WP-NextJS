import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Container } from 'react-bootstrap';


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ 
      pages(where: {id: 1370}) {
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
     
          Testimonials {
                  bannerTitle
                  bannerHeading
                  bannerDescription
                  bannerImage {
                    altText
                    sourceUrl
                  }
                  sectionTitle
                  testimonials {
                    testimonial
                    clientName
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
      testimonialsData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  testimonialsData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};



const Testimonials = (props: MyProps) => {
  const { settings, mainMenus, testimonialsData, metaData } = props;

  return (
    <>
      {testimonialsData.map((data, index) => {
        return (
          <div key={index} className='our-testimonial'>
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
            <main className="content">
              <Hero
                title={data?.Testimonials?.bannerTitle}
                bgImage={data?.Testimonials?.bannerImage?.sourceUrl}
              />
              <Container className="my-5 blog-container">
                <h1 className="my-3 text-center">{data?.Testimonials?.sectionTitle}</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4 items">

                  {data?.Testimonials?.testimonials?.slice(0)
                    .reverse().map((testimonial, key) => {
                      return (
                        <div key={key} className="col">
                          <div className="testimonial-box card h-100">
                            <div className="card-body">

                              <q className='testimonials-content'>{testimonial?.testimonial}</q>
                              <p className="testimonials-name">{testimonial?.clientName}</p>
                            </div>

                          </div>
                        </div>
                      )
                    })}






                </div>

              </Container>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        )
      })}
    </>
  );
};

export default Testimonials;