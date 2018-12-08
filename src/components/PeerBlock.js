import React from 'react'
import PropTypes from 'prop-types'
import InfoBlock from './InfoBlock'
import {clipboard} from 'electron'

function copy (text) {
  return () => { clipboard.writeText(text) }
}

export default function PeerBlock (props) {
  return (
    <InfoBlock
      buttonMessage='Details'
      title={props.id}
      info={props.location}
      /*onClick={copy(props.id)}*/ />
  )
}

PeerBlock.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}
