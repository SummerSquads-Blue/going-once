import styled from 'styled-components'
import { useContext } from "react";
import GetCurrentLocation from "./GetCurrentLocation";
import { LocationContext } from "../lib/LocationContext";

const PageStyles = styled.main`
  margin: 2rem auto;
  width: 80%;
  max-width: 1000px;
  
  @media (max-width: 992px) {
    max-width: 90%;
    width: 90%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 0rem 1rem;
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