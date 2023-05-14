import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React from 'react';
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
      pages(where: {id: 1205}) {
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
          surrey {
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
      surreyData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  surreyData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};


const MortgageSurrey = (props: MyProps) => {

  const { settings, mainMenus, surreyData, metaData } = props;

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  return (
    <>
      {surreyData?.map((data, index) => {
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
              {data?.surrey?.serviceBannerTitle == null ? "" : (
                <Hero
                  title={data?.surrey?.serviceBannerTitle}
                  heading={data?.surrey?.serviceBannerHeading}
                  description={data?.surrey?.serviceBannerDescription}
                  bgImage={data?.surrey?.serviceBannerImage?.sourceUrl}
                />
              )}

              <div className="service-container">
                <h1 className="text-center mt-5">{data?.surrey?.ourMortgageServicesTitle}</h1>

                {data?.surrey?.ourServices.map(
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

                              <div className='service-content'>
                                <div className='mt-4' dangerouslySetInnerHTML={{ __html: service?.serviceTitle }}></div>
                                {console.log(service.serviceContent)}
                                <p dangerouslySetInnerHTML={{ __html: service.serviceContent }} ></p>
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

export default MortgageSurrey;