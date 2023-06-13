import { gql } from "@apollo/client";
import { client } from "lib/apollo";
import { Container } from "react-bootstrap";
import styles from "scss/components/Banner.module.scss";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
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
      }
    `,
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
        {teams?.map((team) => {
          return (
            <div key={team}>
              {team?.HomeLandingPage?.teamSection?.hideSection == true ? (
                ""
              ) : (
                <div
                  className="team_section"
                  style={{
                    backgroundImage: `url("${team?.HomeLandingPage?.teamSection?.teamImage?.sourceUrl}")`,
                  }}
                >
                  <div className={styles.overlay}>
                    <h1
                      dangerouslySetInnerHTML={{
                        __html: team?.HomeLandingPage?.teamSection?.teamTitle,
                      }}
                    ></h1>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default Team;
