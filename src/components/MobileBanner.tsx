import React, { useState, useEffect } from 'react';
import { Carousel, Col, Row, Button, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import styles from 'scss/components/Banner.module.scss';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Head from 'next/head';


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
                      homeSliderSection {
                        homeSlider {
                          sliderTitle
                          sliderSubtitle
                          sliderDescription
                          mobileImage {
                              sourceUrl
                          }
                          sliderButtonUrl {
                            url
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
            msliders: data?.pages?.nodes,
        },
    };
}

type MyProps = {
    msliders: any;
};


const MobileBanner = (props: MyProps) => {

    const { msliders } = props;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [msliders]);

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }



    return (
        <div>
            <div className="home-slider">



                {isLoading &&
                    <div className="text-center py-5">
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                <Head>
                    <link rel="preload" href={msliders[0].HomeLandingPage.homeSliderSection.homeSlider[0].mobileImage?.sourceUrl} as="image" />
                </Head>

                <Carousel fade>


                    {msliders?.map(function (slider) {

                        return (

                            slider?.HomeLandingPage?.homeSliderSection?.homeSlider == null ? "" :

                                slider?.HomeLandingPage?.homeSliderSection?.homeSlider.map((slide) => {
                                    return (
                                        <Carousel.Item key={slide.sliderTitle}>
                                            <div className={styles.overlay}></div>

                                            {/* <div
                                                style={{
                                                    position: 'relative',
                                                    height: '100vh',
                                                    width: '100%',
                                                    clipPath: 'inset(0 0 0 0)',
                                                }}
                                            > */}

                                            {/* <div
                                                    style={{
                                                        position: 'absolute',
                                                        height: '100%',
                                                        width: '100%',
                                                        left: '0',
                                                        top: '0',
                                                    }}
                                                > */}


                                            <div className="slider-images">

                                                <Image
                                                    loader={myLoader}
                                                    alt="Asim Ali Slider"
                                                    src={slide?.mobileImage?.sourceUrl}
                                                    width={100}
                                                    height={67}
                                                    layout="responsive"
                                                    objectFit="cover"
                                                />
                                                {console.log("Home slider Shabbir", slide)}

                                            </div>
                                            {/* </div> */}
                                            {/* </div> */}
                                            <Carousel.Caption className={styles.carouselcaption}>
                                                <Row className="align-items-center home-slide">
                                                    <Col className='text-center' xs={12} lg="6">
                                                        <div className={styles.bannerCaption}>
                                                            <p className={styles.sliderSubtitle}>{slide.sliderSubtitle}</p>
                                                            <p className={styles.sliderTitle}>{slide.sliderTitle}</p>
                                                            <p>{slide.sliderDescription}</p>
                                                        </div>

                                                    </Col>
                                                    {slide.sliderButtonUrl == null ? "" : (
                                                        <Col className='text-center mt-3' xs={12} lg="6">
                                                            <Link href={slide.sliderButtonUrl.url}><Button className={styles.bannerBtn} >Get <span>Approved</span></Button></Link>
                                                        </Col>
                                                    )}

                                                </Row>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                }  //  --

                                ))


                    }

                    )}

                </Carousel>




            </div>
        </div >
    );
};

export default MobileBanner;