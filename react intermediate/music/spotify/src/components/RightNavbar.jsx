import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/RightSidebar.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Button from '@mui/material/Button';
import { favSongUpdate } from '../store/favSlice';

const RightNavBar = () => {
  const globalState = useSelector((state) => state?.song?.selectedSong);
  const favSong = useSelector((state)=>state?.favSong?.favSong)
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Set the audio source when the globalState.preview_url changes
    audioRef.current.src = globalState?.preview_url;

    // Play the audio when it's loaded
    audioRef.current.addEventListener('canplaythrough', () => {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started
          })
          .catch((error) => {
            // Autoplay was prevented.
            console.error('Autoplay error:', error);
          });
      }
    });

    // Update the currentTime when audio time is updated
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current.currentTime);
    });

    return () => {
      audioRef?.current?.pause();
    };
  }, [globalState?.preview_url]);

  const handleAddPlaylist = ()=>{
    dispatch(favSongUpdate(globalState));
  }

  return (
    <section className="right_sidebar">
      <h2>Playing now</h2>
      <div className="track_image">
        <img alt="song preview" src={globalState?.album?.images[0]?.url} />
      </div>
      <Box className="seek-control">
        <Slider
          size="small"
          defaultValue={70}
          aria-label="Small"
          min="0"
          max={audioRef.current ? audioRef.current.duration : 0}
          value={currentTime}
          valueLabelDisplay="auto"
          disabled={true}
        />
      </Box>
      <audio className="spotify-audio" controls ref={audioRef}>
      </audio>
      {/* print the list of item about song */}
      <div className="song_details">
        <div className="song_detail_list">
          <span>Name: </span>
          <span> {globalState?.name} </span>
        </div>
        <div className="song_detail_list">
          <span>Playable: </span>
          <span> {globalState?.is_playable ? <ThumbUpIcon sx={{ fill:"green" }} /> : <ThumbDownIcon sx={{ fill: "red" }} /> } </span>
        </div>
        <div className="song_detail_list">
          <span>Popularity: </span>
          <span> {globalState?.popularity} </span>
        </div>
        <Button 
          variant="outlined" 
          sx={{ marginTop:"10px", color: "green" }}
          onClick={handleAddPlaylist}
        >
          ADD TO YOUR PLAYLIST
        </Button>
      </div>
    </section>
  );
};

export default RightNavBar;
