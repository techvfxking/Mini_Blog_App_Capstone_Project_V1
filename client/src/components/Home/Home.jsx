import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Forms/Form'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../actions/posts';
import PaginationComp from '../Pagination/PaginationComp'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import useStyles from '../../Styles'
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      let searchValue = search || 'none';
       dispatch(getPostsBySearch({ searchValue, tags: tags.join(',') }))
      navigate(
        `/posts/search?searchQuery=${searchValue}&tags=${tags.join(',')}`
      )
    } else {
      navigate('/');
    }
  }
  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPost();
    }
  }                

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={4}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Searcg Mini Blog"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                onKeyDown={handleKeyPress}
              />
              <ChipInput
                style={{
                  margin: '10px 0px',
                }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} className={classes.pagination}>
              {!searchQuery && !tags.length && <PaginationComp page={page} />}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
