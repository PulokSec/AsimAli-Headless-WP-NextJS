import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Image from "next/image";

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              weHelpSection {
                helpTitle
                helpDescription
                hideSection
                helpImage {
                  mediaItemUrl
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
      helps: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  helps: any;
};

const WeHelp = (props: MyProps) => {
  const { helps } = props;
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      {helps?.map((help) => {
        return (
          <div key={help?.HomeLandingPage?.weHelpSection}>
            {help?.HomeLandingPage?.weHelpSection?.hideSection == true ? (
              ""
            ) : (
              <section className="wehelp_section">
                <Container>
                  <Row>
                    <Col lg={5}>
                      <div className="split_image">
                        <Image
                          src={
                            help?.HomeLandingPage?.weHelpSection?.helpImage
                              ?.mediaItemUrl
                          }
                          loader={myLoader}
                          width="300"
                          height="400"
                          layout="responsive"
                          priority={true}
                          alt={
                            help?.HomeLandingPage?.weHelpSection?.helpImage
                              ?.mediaItemUrl
                          }
                        />
                      </div>
                    </Col>
                    <Col lg={1} />
                    <Col lg={6}>
                      <div className="wehelp_text">
                        <p
                          className="wehelp_title"
                          dangerouslySetInnerHTML={{
                            __html:
                              help?.HomeLandingPage?.weHelpSection?.helpTitle,
                          }}
                        ></p>
                        <div
                          className="wehelp_description"
                          dangerouslySetInnerHTML={{
                            __html:
                              help?.HomeLandingPage?.weHelpSection
                                ?.helpDescription,
                          }}
                        ></div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
          </div>
        );
      })}
    </>
  );
};

export default WeHelp;
