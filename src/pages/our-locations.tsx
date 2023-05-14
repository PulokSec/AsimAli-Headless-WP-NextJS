import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';



export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ 
      pages(where: {id: 555}) {
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
          locations {
                  locationsBannerTitle
                  locationsBannerHeading
                  locationsBannerDescription
                  locationMap
                  locationsBannerImage {
                    sourceUrl
                  }
                  secondLocationList {
                    locationLink {
                      url
                      title
                    }
                    locationImage {
                      altText
                      sourceUrl
                    }
                  }
                  firstLocationList {
                    locationImage {
                      altText
                      sourceUrl
                    }
                    locationLink {
                      url
                      title
                    }
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
      locationData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  locationData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};


const Locations = (props: MyProps) => {

  const { settings, mainMenus, locationData, metaData } = props;


  const [showMaps, setShowMaps] = useState(false);
  const [showLists, setShowLists] = useState(true)
  const [isActive, setIsActive] = useState(false);


  const mapHandler = () => {
    setShowMaps(true);
    setShowLists(false)
    setIsActive(current => !current);
  }
  const listHandler = () => {
    setShowMaps(false);
    setShowLists(true)
    setIsActive(current => !current);
  }

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>
      {locationData.map((data, index) => {
        return (
          <div key={index} className='our-locations'>
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
              {data?.locations?.locationsBannerTitle == null ? "" : (
                <Hero
                  title={data?.locations?.locationsBannerTitle}
                  heading={data?.locations?.locationsBannerHeading}
                  description={data?.locations?.locationsBannerDescription}
                  bgImage={data?.locations?.locationsBannerImage?.sourceUrl}
                />
              )}

              <Container className='my-5'>

                <Row className='location-heading'>
                  <Col md={8}>
                    <h1>{data?.locations?.locationsBannerTitle.split(" ")[0]} <span>{data?.locations?.locationsBannerTitle.split(" ")[1]}</span></h1>
                  </Col>
                  {data?.locations?.firstLocationList == null ? "" : (
                    <Col md={2}>
                      <Button className={isActive ? '' : 'active-button'} onClick={() => listHandler()}> A-Z LIST</Button>
                    </Col>
                  )}
                  {data?.locations?.locationMap == null ? "" : (
                    <Col md={2}>
                      <Button className={isActive ? 'active-button' : ''} onClick={() => mapHandler()}>MAP</Button>
                    </Col>
                  )}

                </Row>
                {showMaps == true ? (
                  data?.locations?.locationMap == null ? "" : (
                    <div className="listMap">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.855336349133!2d-122.84547831628339!3d49.13573927015761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d162fec05fd5%3A0x44d696e4c0940576!2sMortgage%20Broker%20Surrey%20-%20Asim%20Ali!5e0!3m2!1sen!2sbd!4v1668782884638!5m2!1sen!2sbd" width="100%" height="450" ></iframe>
                    </div>
                  )
                ) : (

                  <div className="imageList">
                    {data?.locations?.firstLocationList == null ? "" : (
                      <Row className='mt-5 location-images'>

                        {data?.locations?.firstLocationList.map((fImage, a) => {
                          return (
                            <Col key={a}>
                              <Image
                                src={fImage?.locationImage?.sourceUrl}
                                loader={myLoader}
                                alt={fImage?.locationImage?.altText}
                                width="190"
                                height="700"
                                layout="responsive"
                                objectFit="contain"
                              />
                              <div>
                                <a href={fImage?.locationLink?.url}>
                                  <p className='verticall-location' >{fImage?.locationLink?.title}</p>

                                  {/* <span dangerouslySetInnerHTML={{__html: fImage?.locationLink?.title.split('').join('</span><span>') + '</span>' }}  ></span> */}
                                </a>
                              </div>


                            </Col>

                          )
                        })}


                      </Row>
                    )}

                    {data?.locations?.secondLocationList == null ? "" : (
                      <Row className='location-images mb-5'>
                        {data?.locations?.secondLocationList.map((sImage, b) => {
                          return (
                            <Col key={b}>
                              <Image
                                src={sImage?.locationImage?.sourceUrl}
                                loader={myLoader}
                                alt={sImage?.locationImage?.altText}
                                width="190"
                                height="700"
                                layout="responsive"
                                objectFit="contain"
                              />
                              <div>
                                <a href={sImage?.locationLink?.url}>
                                  <p className='verticall-location' >{sImage?.locationLink?.title}</p>
                                  {/* <span dangerouslySetInnerHTML={{__html:  sImage?.locationLink?.title?.split('').join('</span><span>') + '</span>' }}  ></span> */}
                                </a>
                              </div>
                            </Col>
                          )
                        })}



                      </Row>
                    )}
                  </div>


                )}




              </Container>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />

          </div>
        )
      })}

    </>
  );
};

export default Locations;