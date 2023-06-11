import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  },
}))
