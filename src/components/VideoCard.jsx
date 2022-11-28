import React from 'react'
import { Link } from 'react-router-dom' 
import { Typography,Card,CardContent,CardMedia } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import { demoThumbnailUrl , demoVideoUrl , demoVideoTitle , demoChannelUrl , demoChannelTitle } from '../utils/constants'


function VideoCard({ video: { id :{videoId}, snippet } }) {

  return (
    <Card sx={{width: { sx:"100%" ,md:'310px' } , boxShadow:'none' , borderRadius:0  }}>
<Link to={videoId ? `/video/${videoId}` : demoVideoUrl }>

    <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title} sx={{ width:{sx:'100%' , md:'310px'} , height: 180  }}/>
</Link>
        <CardContent sx={{backgroundColor:"#1e1e1e", height: '106px' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl }>

            <Typography variant='subtitle1' fontWeight="bold" color="#fff">
                {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)} 
            </Typography>
        </Link>

        <Link to={snippet?.chanelId ? `/channel/${snippet?.channelId}` : demoChannelUrl }>

            <Typography variant='subtitle2' fontWeight="bold" color="darkgrey">
                {snippet?.channelTitle || demoChannelTitle} 
                <CheckCircle sx={{color:'darkgray' , ml:'5px' ,fontSize:12 }}></CheckCircle>
            </Typography>
        </Link>
        </CardContent>

    </Card>
  )
}

export default VideoCard
