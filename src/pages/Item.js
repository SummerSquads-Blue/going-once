import { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import Page from "../components/Page";
import { ColOne, ColTwo, TwoCols } from "../components/Styles/TwoCols";
import * as itemService from '../services/itemService'
import ItemMap from '../components/ItemMap'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components'
import { UserContext } from "../lib/UserContext";
import { Button } from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const PageNav = styled.div`
  text-align: left;
  font-size: 2rem;
`;

const ImgDiv = styled.div`
  margin: 2rem auto;
  img {
    max-width: 768px;
    max-height: 400px;
    margin: 0 auto;
    border-radius: 0.5rem;
  }
`;

const ButtonDiv = styled.div`
  margin: 2rem auto;
  button: {
    font-size: 2rem;
  }
`;

export default function ItemPage() {
  const user = useContext(UserContext)
  const history = useHistory()
  const {id} = useParams();
  const [itemData, setItemData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async (id) => {
      const result = await itemService.getItemsById(id);
      (result.title) ? setItemData(result) : setError("Item not found!")
    }
    if (id) fetchItem(id)
  }, [id])

  const deleteItem = async () => {
    if (itemData?.owner !== user._id) return
    await itemService.deleteItem(itemData?._id)
    history.push('/items')
  }

  if (!id) return <Redirect to="/items" />
  return (
    <Page>
      <PageNav>
        <Link to="/items">
          <ArrowBackIcon /> All Items
        </Link>
      </PageNav>
      {error && <p>{error}</p>}
      {itemData?.title && <h1>{itemData.title}</h1>}
      {itemData?.picture && 
        <ImgDiv>
          <img src={itemData.picture} alt={itemData.title} />
        </ImgDiv>
      }
      <TwoCols>
        <ColOne>
          <h2>Details:</h2>
          { itemData?.description && 
            <p>
              <strong>Description: </strong>
              {itemData.description}
            </p> }
          { itemData?.condition && 
            <p>
              <strong>Condition: </strong>
              {itemData.condition}
            </p> }
          { itemData?.category && 
            <p>
              <strong>Category: </strong>
              {itemData.category}
            </p> }
            <ButtonDiv>
              {user?._id === itemData?.owner && 
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={deleteItem}
                >
                  <DeleteOutlineIcon fontSize="large" /> Delete
                </Button>
              }
            </ButtonDiv>
        </ColOne>
        <ColTwo>
          {itemData?.lat && itemData?.lng && 
            <>
              <h2>Location:</h2>
              <ItemMap coords={{
                lat: itemData.lat,
                lng: itemData.lng,
              }}/>
            </>
          }
        </ColTwo>
      </TwoCols>
    </Page>
  )
}
