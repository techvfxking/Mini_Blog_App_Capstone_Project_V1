import React, { useState, useEffect, useRef } from 'react'
import useStyles from './Styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'

const Form = ({ currentId, setCurrentId }) => {
  const navigate = useNavigate();
  const imageRef = useRef();
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: null,
  })
  const [image, setImage] = useState('')
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  )
  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post])
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: null,
    });
    setImage(null);
    imageRef.current.value = null;
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (postData === null) {
      return
    }
    const oldTags = postData.tags
    const updatedPostData = {
      ...postData,
      tags: oldTags.filter((tag) => tag !== ''),
      selectedFile: image
    }
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...updatedPostData, name: user?.result.name })
      )
    } else {
      dispatch(
        createPost({ ...updatedPostData, name: user?.result.name }, navigate)
      )
    }
    clear()
  }

  const onImageUpload = (e) => {
    let reader = new FileReader()
    const fileList = e.target.files
    reader.readAsDataURL(fileList[0])
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.onerror = (error) => {
      console.log('Error: ' + error)
    }
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In or Sign Up to continue
          <br />
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Editing' : 'Creating'} a Mini Blog
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required={true}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          minRows={4}
          required={true}
          multiline
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          required={true}
          value={postData.tags}
          onChange={(e) => {
            setPostData({
              ...postData,
              tags: e.target.value.trim().split(','),
            })
          }}
        />
        {image === '' || image === null ? (
          ''
        ) : (
          <img width={100} height={100} src={image} />
        )}
        <div className={classes.fileInput}>
          <input
            accept=".jpg, .jpeg, .png, .gif"
            type="file"
            onChange={onImageUpload}
            ref={imageRef}
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
