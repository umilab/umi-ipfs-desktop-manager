import React from 'react'
import PropTypes from 'prop-types'
import {resolve, join} from 'path'



/**
 * Is an Icon.
 *
 * @param {Object} props
 *
 * @prop {String} name
 * @prop {String} color
 *
 * @return {ReactElement}
 */
export default function AppIcon (props) {
  let style = {}
  if (props.color) {
    style.color = props.color
  }

  var logoBlack = resolve(join(__dirname, '../img/apps/'+props.name+'.png'))
  return (
    <div>
      <img style={style} alt={props.name} src={`file://${logoBlack}`} />
      <h4><b>{props.name}</b></h4>
    </div>
  )

}

AppIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string
}
