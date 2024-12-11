import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { artistUpdate } from '../store/artistSlice';
import { useNavigate } from 'react-router-dom'; 
import Card from '../utils/Card'
import '../styles/Artist.scss';
import { loginCancel } from '../store/loginSlice';

const IDS = [
  "7uIbLdzzSEqnX0Pkrb56cR",
  "2GoeZ0qOTt6kjsWW4eA6LS",
  "5wJ1H6ud777odtZl5gG507",
  "008PpLcKUtVXle6JSwkq3I",
  "2ZRrPOjBIWoKK5rHedLijj",
  "3gBKY0y3dFFVRqicLnVZYz",
  "0Yb0T3wUUNiIvHjqnfkbuH",
  "1wRPtKGflJrBx9BmLsSwlU",
  "4fEkbug6kZzzJ8eYX6Kbbp",
  "3OLGltG8UPIea8sA4w0yg0",
  "4L0JycQCCwKksT3G5SVApu",
  "4zCH9qm4R2DADamUHMCa6O",
  "1mYsTxnqsietFxj1OgoGbG",
  "6LEG9Ld1aLImEFEVHdWNSB",
  "4ITkqBlf5eoVCOFwsJCnqo"
];

const Artist = () => {
  const navigate = useNavigate();
  const ARTIST_API = `https://api.spotify.com/v1/artists?ids=${IDS}`;
  const globalLoginToken = useSelector((state)=>state.login.loginDetails?.access_token);
  const [artistDetails, setArtistDetails] = useState([]);
  const dispatch = useDispatch();


  const getArtist = async ()=>{
    try {
      const res = await axios.get(ARTIST_API, {
        headers: {
          'Authorization': `Bearer ${globalLoginToken}`
        }
      });
      dispatch(artistUpdate(res.data));
      setArtistDetails(res.data.artists);
    } catch (err) {
      dispatch(loginCancel());
      navigate('/login');
      return ;
    }
  }

  useEffect(()=>{
    getArtist();
  },[])
  
  return (
    <div className="artist_main_box">
      <h2>Popular Artist</h2>
      <Grid container spacing={3} sx={{ justifyContent:"center" }}>
        {
          artistDetails?.map((artist, ind)=> <Card key={ind} artistDetails={artist} url={`/artist?id=${artist.id}`} /> )
        }
      </Grid>
    </div>
  )
}

export default Artist