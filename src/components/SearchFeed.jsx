import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box,Typography } from '@mui/material'

import Videos from './Videos';
import { fetchFromApi }  from '../utils/fetchFromApi';  
 
function SearchFeed() {


  const[videos,setVideos] = useState([])
  const { searchTerm } = useParams()

  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${searchTerm}`)
      .then((data) =>  
      setVideos(data.items)
    )
  },[searchTerm])

  return (

    <Box p={2} sx={{overflowY:"auto",height:'90vh',flex:2 , paddingLeft:{md:'120px'} }}>
    <Typography variant="h4" fontWeight='bold' mb={2} sx={{color:'white'}}> 
      Search results for: <span style={{color: "#F31503"}}>{searchTerm}</span> Videos
    </Typography>

    <Videos videos= {videos} />

</Box>


  )
}

export default SearchFeed
