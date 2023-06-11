import React, { useState } from 'react'
import useStyles from './Styles'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from '@material-ui/core/'
import { useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))
  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    )
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2} name="edit">
          {(user?.result.sub === post?.creator ||
            user?.result?._id === post.creator) && (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentId(post._id)
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <BorderColorIcon fontSize="medium" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
          disabled={!user?.result}
        >
          <Likes />
        </Button>

        {(user?.result.sub === post?.creator ||
          user?.result?._id === post.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
            disabled={!user?.result}
          >
            <DeleteIcon fontSize="small" />
            &nbsp; Delete &nbsp;
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post
