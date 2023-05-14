
import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import Image from 'next/image';   
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';



function Header(): JSX.Element {
  const { menuItems } = client.useQuery()
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  const [settings, setSettings] = useState({});
  const [isLoading, seIsLoading] = useState(true);

    useEffect(() => {
      const client = new ApolloClient({
          uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
          cache: new InMemoryCache(),
        });
      client
      .query({
        query: gql`
        query{
          settingsOptions {
            asimOptions {
              headerSettings {
                uploadLogo {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }`,
      })
      .then((result) => 
        {
          setSettings(result?.data?.settingsOptions?.asimOptions)
        seIsLoading(false);
        }
        );
        
      
      
  }, []);
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
   <>
   
    {/* {isLoading && 
      <div className="preloader" >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>
      </div>
      } */}
    <Navbar bg="light" expand="lg">
       
      <Container>
        <Navbar.Brand>
            { (settings as any)?.headerSettings?.uploadLogo == null ? "" : (
            <Link href="/">
            <Image 
            src={(settings as any)?.headerSettings?.uploadLogo?.sourceUrl}
            loader={myLoader}  
            style={{cursor: 'pointer'}} 
            alt='Logo' 
            width={200}
            height={55}
            objectFit="contain"
            
            />
            </Link>
            )}
           
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            // style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {links?.map((link) => (
              
            <Nav.Link key={`${link.label}$-menu`} as={Link} href={`${link.url}`} >
             
               <li><a 
               onClick={() => (link.url)}
                >{link.label}</a></li>
            </Nav.Link>
            ))}
           
          </Nav>
        

        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  );
}

export default Header;
