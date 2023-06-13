import dynamic from "next/dynamic";
import Head from "next/head";
// import { CTA, Footer, Header } from 'components';

import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import Banner from "../components/Banner";
import WeHelp from "../components/WeHelp";
import Team from "components/Team";
import Meeting from "components/Meeting";
import PartnerLogo from "components/PartnerLogo";
import SplitImageLeft from "../components/SplitImageLeft";
import FAQ from "components/FAQ";
import Gallery from "components/Gallery";
import FlexabilitySlider from "components/FlexabilitySlider";
import SplitImageRight from "../components/SplitImageRight";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import MobileBanner from "components/MobileBanner";
import ClientReviews from "components/ClientReviews";

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
              jsonLd {
                raw
              }
            }
            HomeLandingPage {
              homeSliderSection {
                homeSlider {
                  sliderTitle
                  sliderSubtitle
                  sliderDescription
                  sliderImage {
                    sourceUrl
                  }
                  mobileImage {
                    sourceUrl
                  }
                  sliderButtonUrl {
                    url
                  }
                }
              }
              weHelpSection {
                helpTitle
                helpDescription
                hideSection
                helpImage {
                  mediaItemUrl
                }
              }
              partnerLogoSection {
                hideSection
                partnerLogo {
                  sourceUrl
                  altText
                }
              }
              teamSection {
                teamTitle
                hideSection
                teamImage {
                  sourceUrl
                  altText
                }
              }
              meetingSection {
                meetingTitle
                meetingDescription
                hideSection
                meetingImage {
                  sourceUrl
                  altText
                }
              }
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
              flexabilitySlider {
                sliderTitle
                sliderSubtitle
                sliderDescription
                sliderImage {
                  altText
                  sourceUrl
                }
                sliderButtonUrl {
                  url
                }
              }
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
              gallery {
                hideSection
                galleryImage1 {
                  altText
                  sourceUrl
                }
                galleryImage2 {
                  altText
                  sourceUrl
                }
                galleryImage3 {
                  altText
                  sourceUrl
                }
                galleryImage4 {
                  altText
                  sourceUrl
                }
                galleryImage5 {
                  altText
                  sourceUrl
                }
              }
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
              callToActionSection {
                hideSection
                actionTitle
                actionLink {
                  url
                  title
                }
                actionBackgroundImage {
                  sourceUrl
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
            generalSettings {
              schemaProductRating
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

        menus(where: { location: PRIMARY }) {
          nodes {
            name
            slug
            menuItems(first: 50) {
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
      }
    `,
  });
  const reviews = await client.query({
    query: gql`query{ 
      pages(where: {id: 1370}) {
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
     
          Testimonials {
                  bannerTitle
                  bannerHeading
                  bannerDescription
                  bannerImage {
                    altText
                    sourceUrl
                  }
                  sectionTitle
                  testimonials {
                    testimonial
                    clientName
                  }
            }
        }
      }
  }`,});

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      sliders: data?.pages?.nodes,
      msliders: data?.pages?.nodes,
      helps: data?.pages?.nodes,
      logos: data?.pages?.nodes,
      teams: data?.pages?.nodes,
      meetings: data?.pages?.nodes,
      splitImagesLeft: data?.pages?.nodes,
      flexsliders: data?.pages?.nodes,
      splitImagesRight: data?.pages?.nodes,
      images: data?.pages?.nodes,
      faqsections: data?.pages?.nodes,
      reviewsData: reviews?.data?.pages?.nodes[0]?.Testimonials,
    },
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  sliders: any;
  msliders: any;
  helps: any;
  logos: any;
  teams: any;
  meetings: any;
  splitImagesLeft: any;
  flexsliders: any;
  splitImagesRight: any;
  images: any;
  faqsections: any;
  reviewsData: any;
};

export default function Page(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    sliders,
    msliders,
    helps,
    logos,
    teams,
    meetings,
    splitImagesLeft,
    flexsliders,
    splitImagesRight,
    images,
    faqsections,
    reviewsData,
  } = props;
console.log(reviewsData);
  return (
    <>
      <Head>
        {metaData.map((meta) => {
          return (
            <>
              <noscript
                dangerouslySetInnerHTML={{
                  __html: meta?.seo?.jsonLd?.raw,
                }}
              ></noscript>
              {meta?.seo?.jsonLd?.raw}

              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta
                property="og:description"
                content={meta?.seo?.description}
              />
              <meta
                property="og:image"
                content={meta?.seo?.openGraph?.image?.url}
              />
            </>
          );
        })}
      </Head>
      <main className="content">
        <Header settings={settings} mainMenus={mainMenus} />
        <div className="desktop-banner">
          <Banner sliders={sliders} />
        </div>
        <div className="mobile-banner">
          <MobileBanner msliders={msliders} />
        </div>
        <WeHelp helps={helps} />
        <PartnerLogo logos={logos} />
        <Team teams={teams} />
        <Meeting meetings={meetings} />
        <SplitImageLeft splitImagesLeft={splitImagesLeft} />
        <FlexabilitySlider flexsliders={flexsliders} />
        <SplitImageRight splitImagesRight={splitImagesRight} />
        <Gallery images={images} />
        <ClientReviews reviews={reviewsData} />
        <FAQ faqsections={faqsections} />
        <CTA />
      </main>

      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
