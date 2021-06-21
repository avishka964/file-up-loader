import React from 'react'
import PropTypes from 'prop-types'
import Alert from '@material-ui/lab/Alert'

const Message = ({ msg }) => {
  return <Alert severity='info' style={{marginBottom: '1rem'}}>{msg}</Alert>
}

Message.propTypes = {
  msg: PropTypes.string.isRequired,
}

export default Message
