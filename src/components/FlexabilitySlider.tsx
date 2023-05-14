import React from 'react';
import { Carousel, Col, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{
      pages(where: {id: 14}) {
        nodes {
          HomeLandingPage {
            flexabilitySlider {
              sliderTitle
              sliderSubtitle
              sliderDescription
              sliderImage {
                altText
                sourceUrl
              }
              sliderButtonUrl {
                url
              }
            }
          }
        }
      }
    }`,
  });

  return {
    props: {
      flexsliders: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  flexsliders: any;
};


const FlexabilitySlider = (props: MyProps) => {

  const { flexsliders } = props;


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <>
      <div className="flexability-slider">

        <Carousel fade>


          {flexsliders?.map(function (slider) {

            return (

              slider?.HomeLandingPage?.flexabilitySlider == null ? "" :

                slider?.HomeLandingPage?.flexabilitySlider.map((slide) => {
                  return (
                    <Carousel.Item key={slide.sliderTitle}>
                      <div className="overlay"></div>
                      <div className="slider-images">
                        <Image
                          src={slide?.sliderImage?.sourceUrl}
                          loader={myLoader}
                          width="100%"
                          height="50"
                          layout="responsive"
                          objectFit="cover"
                          alt={slide?.sliderImage?.altText} />
                      </div>
                      <Carousel.Caption className="carouselcaption">
                        <Row className="align-items-center home-slide">
                          <Col className='text-start' xs={12} lg="6">
                            <div className="bannerCaption">
                              <p className='sliderTitle'>{slide?.sliderTitle}</p>
                              <p className='sliderSubtitle'>{slide?.sliderSubtitle}</p>
                              <p>{slide?.sliderDescription}</p>
                              <Link href={slide?.sliderButtonUrl
                                ?.url}><Button className="bannerBtn" >Get <span>Approved</span></Button></Link>
                            </div>

                          </Col>

                        </Row>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                }

                ))


          }

          )}

        </Carousel>
      </div>
    </>
  );
};

export default FlexabilitySlider;