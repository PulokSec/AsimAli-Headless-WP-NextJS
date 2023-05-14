import React from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CustomRightArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button aria-label="Right Arrow" className='react-multiple-carousel__arrow react-multiple-carousel__arrow-right ' onClick={() => onClick()} ><FontAwesomeIcon icon={faChevronRight} /></button>;
};


const CustomLeftArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button aria-label="Left Arrow" className='react-multiple-carousel__arrow react-multiple-carousel__arrow-left ' onClick={() => onClick()} ><FontAwesomeIcon icon={faChevronLeft} /></button>;
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
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
        pages(where: {id: 14}) {
          nodes {
            HomeLandingPage {
              partnerLogoSection {
                hideSection
                partnerLogo {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }`,
  });

  return {
    props: {
      logos: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  logos: any;
};


const PartnerLogo = (props: MyProps) => {

  const { logos } = props;

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>
      <Container className="partnerLogo" >
        {logos?.map(logo => {
          return (
            <div key={logo.HomeLandingPage} >
              {logo?.HomeLandingPage?.partnerLogoSection.hideSection == true ? "" : (
                <Carousel
                  customRightArrow={<CustomRightArrow />}
                  customLeftArrow={<CustomLeftArrow />}
                  autoPlay={true}
                  infinite={true}
                  responsive={responsive}
                >{
                    logo?.HomeLandingPage?.partnerLogoSection?.partnerLogo.map(singleLogo => {
                      return (
                        <div key={singleLogo.sourceUrl}>
                          <Image
                            loader={myLoader}
                            src={singleLogo.sourceUrl}
                            width="100%"
                            height="15"
                            layout="responsive"
                            objectFit="contain"
                            alt={singleLogo.altText}
                          />
                        </div>
                      )
                    })

                  }
                </Carousel>
              )}

            </div>
          )
        })}

      </Container>
    </>
  );
};

export default PartnerLogo;