import React from 'react';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
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
            meetingSection {
              meetingTitle
              meetingDescription
              hideSection
              meetingImage {
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
      meetings: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  meetings: any;
};


const Meeting = (props: MyProps) => {

  const { meetings } = props;


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  return (
    <>
      <section className='meeting_section'>
        {meetings?.map(meeting => {
          return (
            <div key={meeting}>
              {meeting?.HomeLandingPage?.meetingSection?.hideSection == true ? "" : (
                <Container>
                  <Row>
                    <Col>
                      <h2 dangerouslySetInnerHTML={{ __html: meeting?.HomeLandingPage?.meetingSection?.meetingTitle }} ></h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <div dangerouslySetInnerHTML={{ __html: meeting?.HomeLandingPage?.meetingSection?.meetingDescription }} className="meeting_text">
                      </div>
                    </Col>
                    <Col lg={8}>
                      <div className="meeting_image">
                        <Image
                          loader={myLoader}
                          src={meeting?.HomeLandingPage?.meetingSection?.meetingImage?.sourceUrl}
                          width="1920"
                          height="1228"
                          alt={meeting?.HomeLandingPage?.meetingSection?.meetingImage?.altText} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}

            </div>
          )
        })}

      </section>
    </>
  );
};

export default Meeting;