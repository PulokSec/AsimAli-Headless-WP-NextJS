import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from 'next/link';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ 
      pages(where: {id: 557}) {
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
          coquitlam {
                  coquitlamBannerTitle
                  coquitlamBannerHeading
                  coquitlamBannerDescription
                  thirdApplyStepTitle
                  secondApplyStepTitle
                  secondApplyStepDescription
                  mortgageProductsTitle
                  mortgageProductsRightText
                  mortgageProductsLeftText
                  mortgageBrokerTitle
                  mortgageBrokerDescription
                  firstApplyStepTitle
                  brokerCoquitlamTitle
                  brokerCoquitlamDescription
                  aboutCoquitlamText
                  mortgageProductsImage {
                    altText
                    sourceUrl
                  }
                  coquitlamSlider {
                    title
                    content
                  }
                  coquitlamBannerImage {
                    altText
                    sourceUrl
                  }
                  brokerCoquitlamLink {
                    url
                  }
                  aboutCoquitlamImage {
                    altText
                    sourceUrl
                  }
                  mortgageRenovation {
                    title
                    description
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
      coquitlamData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  coquitlamData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};


const BcCoquitlam = (props: MyProps) => {

  const { settings, mainMenus, coquitlamData, metaData } = props;

  const [key, setKey] = useState(null);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  return (
    <>
      {coquitlamData.map((data, index) => {
        return (
          <div key={index} className='Bc-Coquitlam'>
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
              {data?.coquitlam?.coquitlamBannerTitle == null ? "" : (
                <Hero
                  title={data?.coquitlam?.coquitlamBannerTitle}
                  heading={data?.coquitlam?.coquitlamBannerHeading}
                  description={data?.coquitlam?.coquitlamBannerDescription}
                  bgImage={data?.coquitlam?.coquitlamBannerImage?.sourceUrl}
                />
              )}

              <Container className='my-5'>
                <Row className='refinance-text my-5'>
                  <Col md={5}>
                    <p>{data?.coquitlam?.coquitlamBannerTitle?.split(" ")[0]} <span>{data?.coquitlam?.coquitlamBannerTitle?.split(" ")[1]}</span></p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.coquitlam?.coquitlamBannerDescription}</span>
                  </Col>
                </Row>
                <Row className='coquitlam-grid my-5'>
                  <Col md={7}>
                    <div dangerouslySetInnerHTML={{ __html: data?.coquitlam?.aboutCoquitlamText }} >
                    </div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.coquitlam?.aboutCoquitlamImage?.sourceUrl}
                      loader={myLoader}
                      alt={data?.coquitlam?.aboutCoquitlamImage?.altText}
                      width="100%"
                      height="120"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                </Row>
                {data?.coquitlam?.coquitlamSlider == null ? "" : (
                  <Row className='application-slider'>

                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                    >

                      {data?.coquitlam?.coquitlamSlider.map((slide, a) => {
                        return (
                          <div key={a} className="application-slide text-center">
                            <span>{slide?.title}</span>
                            <p>{slide?.content}</p>
                          </div>
                        )
                      })}

                    </Carousel>
                  </Row>
                )}

                <Row className="product-service">
                  <Col className='mb-5' md={12}>
                    <h2 className='text-center'>{data?.coquitlam?.mortgageProductsTitle}</h2>
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.coquitlam?.mortgageProductsLeftText }}
                    ></span>

                  </Col>
                  <Col md={6}>
                    <Image
                      src={data?.coquitlam?.mortgageProductsImage?.sourceUrl}
                      loader={myLoader}
                      alt={data?.coquitlam?.mortgageProductsImage?.altText}
                      width="190"
                      height="150"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.coquitlam?.mortgageProductsRightText }}
                    ></span>
                  </Col>
                </Row>
                <Row className='apply-step'>
                  <Col md={4}>
                    {data?.coquitlam?.firstApplyStepTitle == null ? "" : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.coquitlam?.firstApplyStepTitle}</p>
                        <div className="apply-border">
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.coquitlam?.secondApplyStepTitle == null ? "" : (
                      <div className="approved">
                        <span>02</span>
                        <p><span>
                          {data?.coquitlam?.secondApplyStepTitle}
                        </span></p>
                        <p>{data?.coquitlam?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.coquitlam?.thirdApplyStepTitle == null ? "" : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.coquitlam?.thirdApplyStepTitle}</p>
                        <div className="apply-border">
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className='mortgage-broker'>
                  <Col>
                    <h2>{data?.coquitlam?.mortgageBrokerTitle}</h2>
                    <p>{data?.coquitlam?.mortgageBrokerDescription}</p>
                  </Col>
                </Row>
                {data.coquitlam.mortgageRenovation == null ? "" : (
                  <Row className="renovation-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 1 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.coquitlam.mortgageRenovation.map((tab, item) => {
                        return (
                          <Tab key={item} eventKey={item.toString()} title={tab.title}>
                            <div
                              dangerouslySetInnerHTML={{ __html: tab.description }}
                              className="renovation-content-list">
                            </div>
                          </Tab>
                        )
                      })}
                    </Tabs>
                  </Row>
                )}
                <Row className='broker-coquitlam'>
                  <Col>
                    <h2>{data?.coquitlam?.
                      brokerCoquitlamTitle}</h2>
                    <p>{data?.coquitlam?.brokerCoquitlamDescription}</p>
                    {data?.coquitlam?.brokerCoquitlamLink == null ? "" : (
                      <Link href={data?.coquitlam?.brokerCoquitlamLink?.url}>
                        <span>
                          Read More <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                    )}

                  </Col>
                </Row>

              </Container>
              <CTA />
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />

          </div>
        )
      })}

    </>
  );
};

export default BcCoquitlam;