import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useRef } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{
      pages(where: {id: 301}) {
      nodes {
        seo {
          title
          description
          canonicalUrl
          focusKeywords
          openGraph {
            image {
              url
            }
          }
        }
   
        CurrentRates {
          bannerTitle
          currentMortgageRate
          currentPrimeRate
          easyApplicationSubtitle
          easyApplicationTitle
          paymentCalculatorTitle
          tableBottomNotes
          bannerBackgroundImage {
            altText
            sourceUrl
          }
          easyApplicationBackground {
            altText
            sourceUrl
          }
          paymentCalculatorLink {
            url
          }
          tableRateInformation {
            terms
            bankRates
            dominion
          }
        }



    
}
}
settingsOptions {
    AsimOptions {
      headerSettings {
        uploadLogo {
          sourceUrl
          altText
        }
      }
      footerSettings {
      socialUrl {
        facebook
        tiktok
        linkedin
        instagram
      }
      copyrightText
      footerLeftWidget {
        title
        phoneNumber
        emailAddress
      }
      footerLogoSection {
        logoText
        logoUpload {
          altText
          sourceUrl
        }
      }
      footerRightWidget {
        title
        address
      }
    }
 
    }
  }

  menus(where: {location: PRIMARY}) {
    nodes {
      name
      slug
      menuItems(first: 50){
        nodes {
          url
          target
          parentId
          label
          cssClasses
          description
          id
          childItems {
            nodes {
              uri
              label
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
      currentData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  currentData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};

const Current = (props: MyProps) => {

  const { settings, mainMenus, currentData, metaData } = props;

  const [success, setSuccess] = useState(null);
  const [success2, setSuccess2] = useState(null);


  const form = useRef();
  const form2 = useRef();


  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_12yqpdo",
        "template_hvh5bop",
        form.current,
        "bKO8M-uo0olOYAj7Z"
      )
      .then(
        (result) => {
          setSuccess(result.text);

        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const sendEmail2 = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_12yqpdo",
        "template_hvh5bop",
        form2.current,
        "bKO8M-uo0olOYAj7Z"
      )
      .then(
        (result) => {
          setSuccess2(result.text);

        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };



  return (
    <div className='currentRate'>
      {currentData?.map((data, index) => {
        return (
          <div key={index} className="currentRate-container">
            <Head>
              {metaData.map((meta) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link rel="canonical" href={meta?.seo?.canonicalUrl} />
                    <meta property="og:title" content={meta?.seo?.title} />
                    <meta property="og:description" content={meta?.seo?.description} />
                    <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
                  </>
                )
              })}
            </Head>
            <Header settings={settings} mainMenus={mainMenus} />

            <main className="content">
              <Hero
                title={data?.CurrentRates?.bannerTitle}
                bgImage={data?.CurrentRates?.bannerBackgroundImage?.sourceUrl}
              />

              <div className="container py-5">
                <div className="row">
                  <div className="col-md-12">
                    <div className="current-rate">
                      <div className="current-container">
                        {data?.CurrentRates?.currentMortgageRate == null ? "" : (
                          <p>Current Variable Mortgage Rate is <b>{data?.CurrentRates?.currentMortgageRate}</b></p>

                        )}
                        {data?.CurrentRates?.currentPrimeRate == null ? "" : (
                          <p>Current Prime Rate is <b>{data?.CurrentRates?.currentPrimeRate}</b></p>
                        )}



                        <table className="text-center table table-striped table-hover">
                          <thead className='table-light'>
                            <tr>
                              <th scope="col">Terms</th>
                              <th scope="col">Bank Rates</th>
                              <th scope="col">Dominion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.CurrentRates?.tableRateInformation.map((info, i) => {
                              return (
                                <tr key={i}>
                                  <td>{info?.terms}</td>
                                  <td>{info?.bankRates}%</td>
                                  <td>{info?.dominion}%</td>
                                </tr>
                              )
                            })}


                          </tbody>

                        </table>
                        <div dangerouslySetInnerHTML={{ __html: data?.CurrentRates?.tableBottomNotes }} className="notes fst-italic">
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-md-12">
                    <div className="current-container"  >
                      <h1>Apply for a Mortgage Loan Now!</h1>
                      <form ref={form} onSubmit={sendEmail} >
                        <input placeholder="Full Name" type="text" name="fullname" />
                        <input placeholder="Email" type="email" name="email" />
                        <input placeholder="Phone" type="text" name="phone" />
                        <input placeholder="Purchase Price" type="text" name="price" />
                        <input value="Apply Now" type="submit" className="contactBtn" />
                        {success && <div className="alert alert-success mt-4" role="alert">
                          Your message was sent Successfully
                        </div>}
                      </form>
                    </div>
                  </div> */}
                </div>
              </div>

              <div style={{
                backgroundImage: `url("${data?.CurrentRates?.easyApplicationBackground?.sourceUrl}")`
              }} className="easy-application">
                <div className="overlay"></div>
                <Container className="py-1">
                  <Row>
                    <Col md={6}>
                      <div className="easyapplication-title">
                        <h2>{data?.CurrentRates?.easyApplicationTitle}</h2>
                        <p>{data?.CurrentRates?.easyApplicationSubtitle}</p>
                      </div>

                      <div className="application-container">
                        <form ref={form2} onSubmit={sendEmail2}>
                          <input placeholder="Full Name" type="text" name="fullname" />
                          <input placeholder="Email" type="email" name="email" />
                          <input placeholder="Phone" type="text" name="phone" />
                          <input value="Send" type="submit" className="contactBt" />
                          {success2 && <div className="alert alert-success mt-4" role="alert">
                            Your message was sent Successfully
                          </div>}
                        </form>

                      </div>
                    </Col>
                    <Col md={6}></Col>
                  </Row>
                </Container>

              </div>

              <div className="calculator-cta">
                <h2>{data?.CurrentRates?.paymentCalculatorTitle}</h2>
                <Link href={data?.CurrentRates?.paymentCalculatorLink?.url}>
                  <Button className="contactBtn">Mortgage Calculator</Button>
                </Link>
              </div>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        )
      })}

    </div>

  );
};

export default Current;