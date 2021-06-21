import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
} from '@material-ui/core'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import axios from 'axios'
import Message from './message'
import Progress from './progressBar'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '52rem',
  },
  input: {
    display: 'none',
  },
  card: {
    maxWidth: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  media: {
    height: '50%',
  },
}))

const FileUploads = () => {
  const classes = useStyles()

  const [file, setFile] = useState('')
  const [uploadFile, setUploadFile] = useState({})
  const [alert, setAlert] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const submit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          )
          setTimeout(() => setUploadPercentage(0), 10000)
        },
      })

      const { fileName, filePath } = res.data

      setUploadFile({ fileName, filePath })

      setAlert('File Uploaded')
    } catch (error) {
      if (error.response.status === 500) {
        setAlert('Server Error')
      } else {
        setAlert(error.response.data.msg)
      }
    }
  }

  return (
    <Fragment>
      {alert ? <Message msg={alert} /> : null}
      <form onSubmit={submit}>
        <Grid
          container
          spacing={2}
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={12}>
            <input
              accept='image/*'
              className={classes.input}
              id='contained-button-file'
              multiple
              type='file'
              onChange={onChangeFile}
            />
            <label htmlFor='contained-button-file'>
              <Button
                variant='contained'
                color='primary'
                component='span'
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid item md={12}>
        <Progress percentage={uploadPercentage} />
      </Grid>
      {uploadFile ? (
        <div style={{ marginTop: '2rem' }}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component='img'
                className={classes.media}
                src={uploadFile.filePath}
                title={uploadFile.fileName}
              />
            </CardActionArea>
          </Card>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FileUploads
