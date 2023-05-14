import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Image from 'next/image';

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ 
      pages(where: {id: 1308}) {
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
          commercialvancouver {
                  serviceBannerTitle
                  serviceBannerHeading
                  serviceBannerDescription
                  serviceBannerImage {
                    altText
                    sourceUrl
                  }
                  ourServices {
                    serviceTitle
                    serviceContent
                    serviceImage {
                      altText
                      sourceUrl
                    }
                  }
                  ourMortgageServicesTitle
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
      commercialvancouverData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60
  };
}

type MyProps = {
  commercialvancouverData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};

const CommercialVancouver = (props: MyProps) => {
  const { settings, mainMenus, commercialvancouverData, metaData } = props;


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  return (
    <>
      {commercialvancouverData?.map((data, index) => {
        return (
          <div key={index} className='our-services'>
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
              {data?.commercialvancouver?.serviceBannerTitle == null ? "" : (
                <Hero
                  title={data?.commercialvancouver?.serviceBannerTitle}
                  heading={data?.commercialvancouver?.serviceBannerHeading}
                  description={data?.commercialvancouver?.serviceBannerDescription}
                  bgImage={data?.commercialvancouver?.serviceBannerImage?.sourceUrl}
                />
              )}

              <div className="service-container">
                <h1 className="text-center mt-5">{data?.commercialvancouver?.ourMortgageServicesTitle}</h1>

                {data?.commercialvancouver?.ourServices.map(
                  (service, key) => {
                    return (

                      <div className="service-row" id={key} key={key}>

                        <Container>
                          <Row>
                            <Col className='service-texts' lg={6} >
                              <div className='service-image'>
                                <Image
                                  loader={myLoader}
                                  objectFit="contain"
                                  src={service?.serviceImage?.sourceUrl}
                                  width={500}
                                  height={400}
                                  alt={service?.serviceImage?.altText} />
                              </div>
                            </Col>
                            <Col className='service-texts' lg={6}>

                              <div className="service-content">
                                <h3 className='mt-4'>{service?.serviceTitle}</h3>
                                {console.log("Hello Conent", service?.serviceContent)}
                                <div dangerouslySetInnerHTML={{ __html: service?.serviceContent }} ></div>
                              </div>

                            </Col>
                          </Row>
                        </Container>



                      </div>

                    )
                  })}

              </div>
              <CTA />
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />

          </div>

        )
      })}
    </>

  );
};

export default CommercialVancouver;