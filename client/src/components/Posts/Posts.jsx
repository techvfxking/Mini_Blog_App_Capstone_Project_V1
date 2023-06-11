import React from 'react'
import Post from './Post/Post'
import useStyles from './Styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core'

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts)
  const classes = useStyles()

  if (!posts.length && !isLoading) return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
       No Posts to show.
        <br />
        Please Create Posts to view
      </Typography>
    </Paper>
  )
  
  return  isLoading ? <CircularProgress /> : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts
