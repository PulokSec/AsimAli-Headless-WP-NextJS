import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
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
            faqSection {
              hideSection
              faqTitle
              faqSubitle
              faqImage {
                altText
                sourceUrl
              }
              faqAccordion {
                question
                answer
              }
            }
          }
        }
      }
    }`,
  });

  return {
    props: {
      faqsections: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  faqsections: any;
};


const FAQ = (props: MyProps) => {

  const { faqsections } = props;

  return (
    <>

      {faqsections?.map(faq => {
        return (
          <Container key={faq}>
            {faq?.HomeLandingPage?.faqSection?.hideSection == true ? "" : (
              <div>
                <div
                  style={{
                    backgroundImage: `url("${faq?.HomeLandingPage?.faqSection?.faqImage?.sourceUrl}")`
                  }}
                  className='faq_section'>
                  <div className="faq_text">
                    <h2><span className="faq-span">{faq?.HomeLandingPage?.faqSection?.faqTitle} </span>
                      <span className="faq-span" dangerouslySetInnerHTML={{ __html: faq?.HomeLandingPage?.faqSection?.faqSubitle }} ></span></h2>

                  </div>
                </div>
                <div className='faq-accordion'>
                  {faq?.HomeLandingPage?.faqSection?.faqAccordion == null ? "" : (
                    <Accordion defaultActiveKey="0">
                      {faq?.HomeLandingPage?.faqSection?.faqAccordion.map((qa, index) => {
                        return (
                          <Accordion.Item key={index} eventKey={index.toString()} >
                            <Accordion.Header as="h3">{qa.question}</Accordion.Header>
                            <Accordion.Body dangerouslySetInnerHTML={{ __html: qa.answer }}>
                            </Accordion.Body>
                          </Accordion.Item>
                        )
                      })}

                    </Accordion>
                  )}

                </div>
              </div>
            )}

          </Container>
        )
      })}

    </>
  );
};

export default FAQ;