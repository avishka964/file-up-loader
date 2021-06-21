import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { LinearProgress, Box, Typography } from '@material-ui/core'

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginTop: '1rem',
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress)

const ProgressBar = ({ percentage }) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <BorderLinearProgress
          variant='determinate'
          style={{ width: `${percentage}%` }}
          value={percentage}
        />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant='body2'
          color='textSecondary'
        >{`${percentage}%`}</Typography>
      </Box>
    </Box>
  )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default ProgressBar
