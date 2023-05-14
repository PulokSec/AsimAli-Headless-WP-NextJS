import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Footer, Header, Hero } from 'components';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import emailjs from '@emailjs/browser';



export async function getStaticProps() {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`query{ 
        pages(where: {id: 1582}) {
          nodes {
            HowToApply {
                bannerTitle
                bannerBackgroundImage {
                altText
                sourceUrl
                }
                fromTitle
                fromSubtitle
                formBackgroundImage {
                altText
                sourceUrl
                }
                firstBotton {
                url
                title
                }
                secondButton {
                    url
                    title
                }
                applyNowContent
            }
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
            howApplyData: data?.pages?.nodes,
            metaData: data?.pages?.nodes,
            settings: data?.settingsOptions?.AsimOptions,
            mainMenus: data?.menus?.nodes,
        },
    };
}

type MyProps = {
    howApplyData: any;
    metaData: any;
    settings: any;
    mainMenus: any;

};



function HowtoApply(props) {
    const { settings, mainMenus, howApplyData, metaData } = props;
    const form = useRef();
    const [success, setSuccess] = useState(null);


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
            {howApplyData.map((data, index) => {
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
                        <main className="content">
                            <Header settings={settings} mainMenus={mainMenus} />
                            <Hero
                                title={data?.HowToApply?.bannerTitle}
                                // heading={data?.HowToApply?.bannerTitle}
                                // description={data?.HowToApply?.bannerTitle}
                                bgImage={data?.HowToApply?.bannerBackgroundImage?.sourceUrl}
                            />
                            <div className='text-center my-5'>
                                <div dangerouslySetInnerHTML={{ __html: data?.HowToApply?.applyNowContent }} >

                                </div>
                                <div className="button-apply my-2">
                                    <a href={data?.HowToApply?.firstBotton?.url} >
                                        <Button className='mx-2' variant="primary" size="lg">
                                            {data?.HowToApply?.firstBotton?.title}</Button>
                                    </a>
                                    <a href={data?.HowToApply?.secondButton?.url}  >
                                        <Button variant="primary" size="lg">{data?.HowToApply?.secondButton?.title}</Button>
                                    </a>
                                </div>
                            </div>

                            <div style={{
                                backgroundImage: `url("${data?.HowToApply?.formBackgroundImage?.sourceUrl}")`
                            }} className="howto-application">
                                <div className="overlay"></div>
                                <Container className="py-1">
                                    <Row>
                                        <Col md={12}>
                                            <div className="easyapplication-title">
                                                <h2>{data?.HowToApply?.fromTitle}</h2>
                                                <p>{data?.HowToApply?.fromSubtitle}</p>
                                            </div>

                                            <div className="application-container">
                                                <form ref={form} onSubmit={sendEmail}>
                                                    <input placeholder="Full Name" type="text" name="fullname" />
                                                    <input placeholder="Email" type="email" name="email" />
                                                    <input placeholder="Phone" type="text" name="phone" />
                                                    <input value="Send" type="submit" className="contactBt" />
                                                    {success && <div className="alert alert-success mt-4" role="alert">
                                                        Your message was sent Successfully
                                                    </div>}
                                                </form>

                                            </div>
                                        </Col>
                                        <Col md={6}></Col>
                                    </Row>
                                </Container>

                            </div>

                        </main>
                        <Footer settings={settings} mainMenus={mainMenus} />
                    </div>

                )
            })}
        </>
    );
}

export default HowtoApply;