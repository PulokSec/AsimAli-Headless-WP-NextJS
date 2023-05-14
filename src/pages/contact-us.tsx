import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Footer, Header } from 'components';
import { Hero } from '../components';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarker, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import emailjs from '@emailjs/browser';



export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ 
      pages(where: {id: 245}) {
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
                contactPage {
                  contactBannerTitle
                  contactBannerHeading
                  contactBannerDescription
                  phoneNumber
                  eMail
                  address
                  addressMap
                  contactBannerBackgroundImage {
                    altText
                    sourceUrl
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
      contactData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  contactData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};




const Contact = (props: MyProps) => {

  const { settings, mainMenus, contactData, metaData } = props;
  const form = useRef();
  const [contacts, setContacts] = useState([]);
  const [success, setSuccess] = useState(null);
  // const [metaData, setMetaData] = useState([]);


  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_12yqpdo",
        "template_qa4pqev",
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


  return (
    <>
      {contactData.map((contact, index) => {
        return (
          <div key={index}>
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
                title={contact?.contactPage?.contactBannerTitle}
                heading={contact?.contactPage?.contactBannerHeading}
                description={contact?.contactPage?.contactBannerDescription}
                bgImage={contact?.contactPage?.contactBannerBackgroundImage?.sourceUrl}
              />
              <div className="contact-page mt-5">
                <Container>
                  <Row>
                    {contact?.contactPage?.address == null && contact?.contactPage?.eMail == null && contact?.contactPage?.phoneNumber == null ? "" : (
                      <Col xs={12} lg="4">
                        <h1>Get in Touch</h1>

                        <div className="contact-item">
                          <div className="contact-icon">
                            <FontAwesomeIcon icon={faMapMarker} />
                          </div>
                          <h2>Address</h2>
                          <p>{contact?.contactPage?.address}</p>
                        </div>

                        <div className="contact-item">
                          <div className="contact-icon">
                            <FontAwesomeIcon icon={faPhone} />
                          </div>
                          <h2>Call Us</h2>
                          <a href={`tel: ${contact?.contactPage?.phoneNumber}`}>{contact?.contactPage?.phoneNumber}</a>
                        </div>

                        <div className="contact-item">
                          <div className="contact-icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </div>
                          <h2>E-mail</h2>
                          <a href={`mailto:${contact?.contactPage?.eMail}`}>{contact?.contactPage?.eMail}</a>
                        </div>
                      </Col>
                    )}

                    <Col xs={12} lg="8">
                      <form ref={form} onSubmit={sendEmail} id="contact-form">
                        <div id="contact-form">

                          <div className="row contact-row">
                            <h2 className='contact-title'>Contact Information</h2>
                            <div className="col-md-6">
                              <input type="text" name="fname" id="fname" placeholder="First Name" />
                            </div>
                            <div className="col-md-6">
                              <input type="text" name="lname" id="lname" placeholder="Last Name" />
                            </div>
                            <div className="col-md-12">
                              <input type="email" name="mail" id="mail" placeholder="Email" />
                            </div>
                            {/* <div className="col-md-6">
                              <input type="email" name="cmail" id="cmail" placeholder="Confirm Email" />
                            </div> */}
                            <div className="col-md-6">
                              <label htmlFor="Phone">Phone</label>
                              <input type="tel" name="phone" id="phone" placeholder="Phone" />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="contact">How Should We Contact You?</label>
                              <select name="contact" id="contact" className="form_control" aria-required="true" aria-invalid="false">
                                <option value="Email">Email</option>
                                <option value="Phone">Phone</option>
                              </select>
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="about">Please Contact Me About</label>
                              <select name="about" id="about" className="form_control" aria-required="true" aria-invalid="false">
                                <option value="Mortgage">Mortgage</option>
                                <option value="Leasing">Leasing</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="province">Province</label>
                              <select name="province" className="form_control" aria-invalid="false">
                                <option value="Alberta">Alberta</option>
                                <option value="British Columbia">British Columbia</option>
                                <option value="Manitoba">Manitoba</option>
                                <option value="New Brunswick">New Brunswick</option>
                                <option value="Newfoundland &amp; Labrador">Newfoundland &amp; Labrador</option>
                                <option value="Northwest Territories">Northwest Territories</option>
                                <option value="Nova Scotia">Nova Scotia</option>
                                <option value="Nunavut">Nunavut</option>
                                <option value="Ontario">Ontario</option>
                                <option value="Prince Edward Island">Prince Edward Island</option>
                                <option value="Quebec">Quebec</option>
                                <option value="Saskatchewan">Saskatchewan</option>
                                <option value="Yukon">Yukon</option>
                              </select>
                            </div>
                            <div className="col-md-12 mt-3">
                              <input type="text" name="subject" id="subject" placeholder="Subject" />
                            </div>
                            <div className="col-md-12">
                              <textarea name="message" id="message" style={{ height: '120px' }} placeholder="Message"></textarea>
                            </div>






                          </div>
                          <input className='contactBtn' type="submit" value="Send Message" />


                        </div>
                        {success && <div className="alert alert-success mt-4" role="alert">
                          Your message was sent Successfully
                        </div>}
                      </form>

                    </Col>
                  </Row>

                </Container>
                <div dangerouslySetInnerHTML={{ __html: contact?.contactPage?.addressMap }} className="mt-5">

                </div>
              </div>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>

        )
      })}

    </>
  );
};

export default Contact;
