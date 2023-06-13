import { gql } from "@apollo/client";
import { client } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import styles from "scss/components/Banner.module.scss";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              homeSliderSection {
                homeSlider {
                  sliderTitle
                  sliderSubtitle
                  sliderDescription
                  sliderImage {
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
      }
    `,
  });

  return {
    props: {
      sliders: data?.pages?.nodes,
    },
    revalidate: 10,
  };
}

type MyProps = {
  sliders: any;
};

const Banner = (props: MyProps) => {
  const { sliders } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [sliders]);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div>
      <div className="home-slider">
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <Head>
          <link
            rel="preload"
            href={
              sliders[0].HomeLandingPage.homeSliderSection.homeSlider[0]
                .sliderImage.sourceUrl
            }
            as="image"
          />
        </Head>

        <Carousel fade>
          {sliders?.map(function (slider) {
            return slider?.HomeLandingPage?.homeSliderSection?.homeSlider ==
              null
              ? ""
              : slider?.HomeLandingPage?.homeSliderSection?.homeSlider.map(
                  (slide) => {
                    return (
                      <Carousel.Item key={slide.sliderTitle}>
                        {/* <div className={styles.overlay}></div> */}

                        <div
                          style={{
                            position: "relative",
                            height: "100vh",
                            width: "100%",
                            clipPath: "inset(0 0 0 0)",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              left: "0",
                              top: "0",
                            }}
                          >
                            <div className="slider-images">
                              <Image
                                loader={myLoader}
                                alt="Asim Ali Slider"
                                src={slide?.sliderImage?.sourceUrl}
                                width={100}
                                height={57}
                                layout="responsive"
                                objectFit="cover"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={styles.overlay}>
                          <Carousel.Caption className={styles.carouselcaption}>
                            <Row className="align-items-center home-slide">
                              <Col className="text-start" xs={12} lg="6">
                                <div className={styles.bannerCaption}>
                                  <p className={styles.sliderSubtitle}>
                                    {slide.sliderSubtitle}
                                  </p>
                                  <p className={styles.sliderTitle}>
                                    {slide.sliderTitle}
                                  </p>
                                  <p>{slide.sliderDescription}</p>
                                </div>
                              </Col>
                              {slide.sliderButtonUrl == null ? (
                                ""
                              ) : (
                                <Col className="text-end" xs={12} lg="6">
                                  <Link href={slide.sliderButtonUrl.url}>
                                    <Button className={styles.bannerBtn}>
                                      Get <span>Approved</span>
                                    </Button>
                                  </Link>
                                </Col>
                              )}
                            </Row>
                          </Carousel.Caption>
                        </div>
                      </Carousel.Item>
                    );
                  } //  --
                );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
