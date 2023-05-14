import React from 'react';
import { Header, Hero, Footer } from '../components';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ settingsOptions {
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
    }}`,
  });

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
};



export default function Page(props: MyProps): JSX.Element {
  const { settings, mainMenus } = props;


  return (
    <>
      <Header settings={settings} mainMenus={mainMenus} />
      <main className="content content-page">
        <Hero title={`Oops! That page can’t be found.`} />
        <div className="wrap">
          <div>
            <div>
              <p>
                The page you were looking for does not exist or is no longer
                available.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
