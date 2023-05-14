import React from 'react';
import { Container } from 'react-bootstrap';
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
            teamSection {
              teamTitle
              hideSection
              teamImage {
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
      teams: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  teams: any;
};



const Team = (props: MyProps) => {

  const { teams } = props;

  return (
    <>
      <Container>

        {teams?.map(team => {
          return (

            <div key={team}>
              {team?.HomeLandingPage?.teamSection?.hideSection == true ? "" : (
                <div className='team_section'
                  style={{
                    backgroundImage: `url("${team?.HomeLandingPage?.teamSection?.teamImage?.sourceUrl}")`
                  }}

                >

                  <h1 dangerouslySetInnerHTML={{ __html: team?.HomeLandingPage?.teamSection?.teamTitle }} ></h1>
                </div>
              )}

            </div>
          )
        })}




      </Container>

    </>
  );
};

export default Team;