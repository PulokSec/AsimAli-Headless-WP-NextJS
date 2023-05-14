import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
            splitImageRightSection {
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
      splitImagesRight: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  splitImagesRight: any;
};

const SplitImageRight = (props: MyProps) => {

  const { splitImagesRight } = props;

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>

      {splitImagesRight?.map(splitImage => {
        return (
          <section
            key={splitImage}
            className='split_section'>
            {splitImage?.HomeLandingPage?.splitImageRightSection?.hideSection == true ? "" : (
              <Container>
                <Row className="flex-row-reverse">
                  <Col lg={8}>
                    <div className="split_image">
                      <Image
                        src={splitImage?.HomeLandingPage?.splitImageRightSection?.splitImage?.sourceUrl}
                        loader={myLoader}
                        width="1556"
                        height="1921"
                        alt={splitImage?.HomeLandingPage?.splitImageRightSection?.splitImage?.altText} />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="split_text">
                      <h3 dangerouslySetInnerHTML={{ __html: splitImage?.HomeLandingPage?.splitImageRightSection?.splitTitle }} ></h3>
                      <p dangerouslySetInnerHTML={{ __html: splitImage?.HomeLandingPage?.splitImageRightSection?.splitDescription }}></p>
                      {splitImage?.HomeLandingPage?.splitImageRightSection?.splitButton == null ? "" : (
                        <Link href={splitImage?.HomeLandingPage?.splitImageRightSection?.splitButton.url}>
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

export default SplitImageRight;