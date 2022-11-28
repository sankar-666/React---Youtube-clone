import React from 'react'
import { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box,Typography, Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material';
import { fetchFromApi } from '../utils/fetchFromApi';
import Videos from './Videos';


function VideoDetail() {
  const [videoDetail , setVideoDetail] = useState(null)
  const [videos , setVideos] = useState(null)
  const { id } = useParams();

  useEffect(() => {
      fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]))
      
      fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => setVideos(data.items))
    },[id])

  if (!videoDetail?.snippet) return <span style={{color:'white'}}>Loading...</span>;

  const { snippet:{title , channelId,channelTitle} ,statistics: {viewCount , likeCount}  } = videoDetail;

  return (
    <Box minHeight='95vh'>
        <Stack direction={{ xs:'column', md:'row' }}>
            <Box flex={1}>
                <Box sx={{width:'100p%' , position:'sticky' , top:'86px'}}> 
                      <ReactPlayer url={`https://WWW.youtube.com/watch?v=${id}`} className="react-player" controls  />
                      <Typography color="#fff" variant='h5' fontWeight="bold" p={2}>
                        {title}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between" sx={{color:'#fff' , marginTop:{md:"-15px"}}} py={1} px={2}  >
       
                                <Link to={`/channel/${channelId}`}>
                                  <Typography variant={{ sm:'subtitle1' ,md:'h6' }} color="#fff">
                                    {channelTitle}
                                    <CheckCircle sx={{fontSize:'12px' , color:'darkgray' , ml:'5px' }}></CheckCircle>
                                  </Typography>
                                </Link>
                                <Stack direction="row" gap="20px" alignItems="center" sx={{marginTop:{md:"-20px"}}} >
                                {/*  */}
                                <Typography variant="body1" sx={{opacity:0.7}} color="#fff">
                                    {parseInt(viewCount).toLocaleString()} Views
                                   
                                  </Typography>
                                <Typography variant="body1" sx={{opacity:0.7}} color="#fff">
                                    {parseInt(likeCount).toLocaleString()} Likes
                                   
                                  </Typography>
                                </Stack>
                      </Stack>

                </Box>
            </Box>
        <Box px={2} py={{md:1, sm:5}} justifyContent="center" alignItems="center">
              <Videos videos={videos} direction="column" />
        </Box>
        </Stack>

    </Box>

  )
}

export default VideoDetail
