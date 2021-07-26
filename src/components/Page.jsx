import NavBar from "./NavBar"
import styled from 'styled-components'
import { useContext } from "react";
import GetCurrentLocation from "./GetCurrentLocation";
import { LocationContext } from "../lib/LocationContext";

const PageStyles = styled.main`
  margin: 2rem auto 0 auto;
  width: 80%;
  max-width: 1000px;

  @media (max-width: 992px) {
    max-width: 100%;
    width: 100%;
  }
  button {
    font-size: 1.5rem
  }
`;

export default function Page({children}) { 
  const locData = useContext(LocationContext);
  
  return (
    <>
      {!locData.location.name && <GetCurrentLocation />}
      <PageStyles>
        {children}
      </PageStyles>
    </>
  )
}