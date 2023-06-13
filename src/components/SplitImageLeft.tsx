import { gql } from "@apollo/client";
import { client } from "lib/apollo";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
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
      }
    `,
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
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      {splitImagesLeft?.map((splitImage) => {
        return (
          <section key={splitImage} className="split_section">
            {splitImage?.HomeLandingPage?.splitImageLeftSection?.hideSection ==
            true ? (
              ""
            ) : (
              <Container>
                <Row>
                  <Col lg={8}>
                    <div className="split_image">
                      <Image
                        src={
                          splitImage?.HomeLandingPage?.splitImageLeftSection
                            ?.splitImage?.sourceUrl
                        }
                        loader={myLoader}
                        width={492}
                        height={608}
                        layout="responsive"
                        priority={true}
                        alt={
                          splitImage?.HomeLandingPage?.splitImageLeftSection
                            ?.splitImage?.altText
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="split_text">
                      <h3
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImage?.HomeLandingPage?.splitImageLeftSection
                              ?.splitTitle,
                        }}
                      ></h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImage?.HomeLandingPage?.splitImageLeftSection
                              ?.splitDescription,
                        }}
                      ></div>

                      {splitImage?.HomeLandingPage?.splitImageLeftSection
                        ?.splitButton == null ? (
                        ""
                      ) : (
                        <Link
                          href={
                            splitImage?.HomeLandingPage?.splitImageLeftSection
                              ?.splitButton.url
                          }
                        >
                          <Button className="SplitBtn">
                            Get <span>Approved</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
          </section>
        );
      })}
    </>
  );
};

export default SplitImageLeft;
