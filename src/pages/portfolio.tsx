import React from 'react';
import Head from 'next/head';
import { Footer, Header } from 'components';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


export async function getStaticProps() {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`query{ 
        pages(where: {id: 1580}) {
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
            metaData: data?.pages?.nodes,
            settings: data?.settingsOptions?.AsimOptions,
            mainMenus: data?.menus?.nodes,
        },
    };
}

type MyProps = {
    metaData: any;
    settings: any;
    mainMenus: any;

};



function portfolio(props) {
    const { settings, mainMenus, metaData } = props;

    return (
        <>
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

            </main>
            <Footer settings={settings} mainMenus={mainMenus} />


        </>
    );
}

export default portfolio;