import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{
      pages(where: {id: 499}) {
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
        HowItWorks {
                  bannerTitle
                  bannerBackgroundImage {
                    altText
                    sourceUrl
                  }
                  firstTitle
                  firstContent
                  firstImage {
                    altText
                    sourceUrl
                  }
                  secondTitle
                  secondContent
                  secondImage {
                    altText
                    sourceUrl
                  }
                  fourthTitle
                  fourthContent
                  fourthImage {
                    altText
                    sourceUrl
                  }
                  thirdTitle
                  thirdContent
                  thirdImage {
                    altText
                    sourceUrl
                  }
                  fifthTitle
                  fifthContent
                  fifthImage {
                    altText
                    sourceUrl
                  }
                  sixthTitle
                  sixthImage {
                    altText
                    sourceUrl
                  }
                  sixthImage2 {
                    altText
                    sourceUrl
                  }
                  firstBanner {
                    sourceUrl
                    altText
                  }
                  secondBanner {
                    sourceUrl
                    altText
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
      howItWorksData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  howItWorksData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};


const HowItWorks = (props: MyProps) => {

  const { settings, mainMenus, howItWorksData, metaData } = props;


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  return (
    <>
      {howItWorksData.map((data, key) => {
        return (
          <div key={key}>
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
                title={data?.HowItWorks?.bannerTitle}
                bgImage={data?.HowItWorks?.bannerBackgroundImage?.sourceUrl}
              />
              <Container className='my-5 works-container'>
                <h1 className="works-title">{data?.HowItWorks?.firstTitle}</h1>
                <Row className='my-5'>
                  <Col md={8}>
                    <div className="works-content">
                      <div dangerouslySetInnerHTML={{ __html: data?.HowItWorks?.firstContent }} >
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="howitworks-image">
                      <Image
                        src={data?.HowItWorks?.firstImage?.sourceUrl}
                        loader={myLoader}
                        alt={data?.HowItWorks?.firstImage?.altText}
                        width="100"
                        height="80"
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container className='my-5 works-container'>
                <h2 className="text-end works-title" >{data?.HowItWorks?.secondTitle}</h2>
                <Row className='my-5'>
                  <Col md={4}>
                    <Image
                      src={data?.HowItWorks?.secondImage?.sourceUrl}
                      loader={myLoader}
                      alt={data?.HowItWorks?.secondImage?.altText}
                      width="190"
                      height="150"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                  <Col md={8}>
                    <div className="works-content">
                      <div dangerouslySetInnerHTML={{ __html: data?.HowItWorks?.secondContent }} >
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col md={12}>
                    <Image
                      src={data?.HowItWorks?.firstBanner?.sourceUrl}
                      loader={myLoader}
                      alt={data?.HowItWorks?.firstBanner?.altText}
                      width="100%"
                      height="50"
                      layout="responsive"
                      objectFit="cover"
                    />
                  </Col>
                </Row>
              </Container>
              <Container className='my-5 works-container'>
                <h2 className="works-title">{data?.HowItWorks?.thirdTitle}</h2>
                <Row className='my-5'>
                  <Col md={8}>
                    <div className="works-content">
                      <div dangerouslySetInnerHTML={{ __html: data?.HowItWorks?.thirdContent }} >
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="howitworks-image">
                      <Image
                        src={data?.HowItWorks?.thirdImage?.sourceUrl}
                        loader={myLoader}
                        alt={data?.HowItWorks?.thirdImage?.altText}
                        width="100"
                        height="80"
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container className='my-5 works-container'>
                <h2 className="text-end works-title" >{data?.HowItWorks?.fourthTitle}</h2>
                <Row className='my-5'>
                  <Col md={4}>
                    <Image
                      src={data?.HowItWorks?.fourthImage?.sourceUrl}
                      loader={myLoader}
                      alt={data?.HowItWorks?.fourthImage?.altText}
                      width="190"
                      height="150"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                  <Col md={8}>
                    <div className="works-content">
                      <div dangerouslySetInnerHTML={{ __html: data?.HowItWorks?.fourthContent }} >
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container className='my-5 works-container'>
                <h2 className="works-title">{data?.HowItWorks?.fifthTitle}</h2>
                <Row className='my-5'>
                  <Col md={8}>
                    <div className="works-content">
                      <div dangerouslySetInnerHTML={{ __html: data?.HowItWorks?.fifthContent }} >
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="howitworks-image">
                      <Image
                        src={data?.HowItWorks?.fifthImage?.sourceUrl}
                        loader={myLoader}
                        alt={data?.HowItWorks?.fifthImage?.altText}
                        width="100"
                        height="80"
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col md={12}>
                    <Image
                      src={data?.HowItWorks?.secondBanner?.sourceUrl}
                      loader={myLoader}
                      alt={data?.HowItWorks?.secondBanner?.altText}
                      width="100%"
                      height="50"
                      layout="responsive"
                      objectFit="cover"
                    />
                  </Col>
                </Row>
              </Container>
              <Container className='my-5 works-container'>
                <h2 className="text-end works-title" >{data?.HowItWorks?.sixthTitle}</h2>
                <Row>
                  <Col md={6}>
                    <Image
                      src={data?.HowItWorks?.sixthImage?.sourceUrl}
                      loader={myLoader}
                      alt={data?.HowItWorks?.sixthImage?.altText}
                      width="190"
                      height="100"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                  <Col md={6}>
                    <Image
                      src={data?.HowItWorks?.sixthImage2?.sourceUrl}
                      loader={myLoader}
                      alt={data?.HowItWorks?.sixthImage2?.altText}
                      width="190"
                      height="120"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                </Row>
                {/* <Row>
                        <Col md={8}>
                            
                            </Col>
                            <Col md={4}>
                            <Image 
                               src={data?.HowItWorks?.sixthImage2?.sourceUrl}
                               loader={myLoader}
                               alt={data?.HowItWorks?.sixthImage2?.altText}
                               width="190" 
                               height="150" 
                               layout="responsive" 
                               objectFit="contain"
                                />
                            </Col>
                            
                        </Row> */}
              </Container>

            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>

        )
      })}
      <div>

      </div>
    </>
  );
};

export default HowItWorks;