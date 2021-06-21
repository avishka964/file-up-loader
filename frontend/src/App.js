import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import FileUpload from './components/fileuploads'

import './app.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  }, 
}))

const App = () => {
  const classes = useStyles()

  return (
    <div className='body'>
      <div className='root'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem'
                }}
              >
                <InsertDriveFileIcon style={{ fontSize: 25 }} />
                <span style={{ fontSize: '1.2rem' }}>React File Upload</span>
              </div>
              <FileUpload/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
export default App
