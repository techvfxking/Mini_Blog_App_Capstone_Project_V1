import React, { useEffect, useState } from "react";
import miniBlogHeaderLogo from "./assets/icons/mini_blog_header_icon.svg";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts"
import Posts from "./components/Posts/Posts";
import Form from "./components/Forms/Form";
import useStyles from "./Styles";

const App = () => {

  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,dispatch])

  return (
    <Container maxWidth='xl'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>
          Mini Blog
        </Typography>
        <img className={classes.image} src={miniBlogHeaderLogo} alt='Mini Blog Logo' height='60' />
      </AppBar>
      <Grow in>
        <Container maxWidth='xl'>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={4}>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={ setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
