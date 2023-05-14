import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
            splitImageLeftSection {
              splitTitle
              splitDescription
              splitImage {
                altText
                sourceUrl
              }
              hideSection
              splitButton {
                url
                title
              }
            }
          }
        }
      }
    }`,
  });

  return {
    props: {
      splitImagesLeft: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  splitImagesLeft: any;
};


const SplitImageLeft = (props: MyProps) => {

  const { splitImagesLeft } = props;


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>

      {splitImagesLeft?.map(splitImage => {
        return (
          <section
            key={splitImage}
            className='split_section'>
            {splitImage?.HomeLandingPage?.splitImageLeftSection?.hideSection == true ? "" : (
              <Container>
                <Row>
                  <Col lg={8}>
                    <div className="split_image">
                      <Image
                        src={splitImage?.HomeLandingPage?.splitImageLeftSection?.splitImage?.sourceUrl}
                        loader={myLoader}
                        width="1556"
                        height="1921"
                        alt={splitImage?.HomeLandingPage?.splitImageLeftSection?.splitImage?.altText} />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="split_text">
                      <h3 dangerouslySetInnerHTML={{ __html: splitImage?.HomeLandingPage?.splitImageLeftSection?.splitTitle }} ></h3>
                      <p dangerouslySetInnerHTML={{ __html: splitImage?.HomeLandingPage?.splitImageLeftSection?.splitDescription }}></p>

                      {splitImage?.HomeLandingPage?.splitImageLeftSection?.splitButton == null ? "" : (
                        <Link href={splitImage?.HomeLandingPage?.splitImageLeftSection?.splitButton.url}>
                          <Button className="SplitBtn">Get <span>Approved</span>
                          </Button>
                        </Link>
                      )}


                    </div>
                  </Col>
                </Row>

              </Container>
            )}

          </section>
        )
      })}

    </>
  );
};

export default SplitImageLeft;