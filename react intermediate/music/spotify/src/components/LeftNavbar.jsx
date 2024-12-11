import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PushPinIcon from '@mui/icons-material/PushPin';
import '../styles/LeftNavbar.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MusicPlayer from '../utils/MusicPlayer';

const LeftNavBar = () => {
  const favSong = useSelector((state)=>state?.favSong?.favSong);
  
  return (
    <nav>
      <div className="nav">
        <div className="navItems">
          <span> <HomeIcon /> </span>
          <span> <Link to="/">Home</Link> </span>
        </div>
        <div className="navItems">
          <span> <SearchIcon /> </span>
          <span><Link to="/search">Search</Link></span>
        </div>
      </div>
      <div className="library">
        <div className="library_box library_box_icon">
          <span> <LibraryMusicIcon /> </span>
          <span> Your Library </span>
        </div>
        <div className="library_box">
          <span>
            <Tooltip title="Search in your library">
              <IconButton>
                <SearchIcon sx={{ fill:"#fff" }} />
              </IconButton>
            </Tooltip>
            <input type="text" name="search_library" placeholder='Search in your library' className="search_library" />
          </span>
        </div>
        <div className="song_liked_box">
          <div className="liked_image">
            <FavoriteIcon sx={{ fill:"white" }} />
          </div>
          <div className="liked_details">
            <p>Liked Songs</p>
            <div className="pin_box">
              <span> <PushPinIcon sx={{ fill:"green" }} className="pin" /> </span>
              <span className="song_count">Playlist {favSong?.length} song</span>
            </div>
          </div>
        </div>
        <div className="liked_song_list">
          {
            favSong?.map((item, index)=>{
              return <MusicPlayer artistAlbum={item} index={index} key={index} hide={false} />
            })
          }
        </div>
      </div>
    </nav>
  )
}

export default LeftNavBar