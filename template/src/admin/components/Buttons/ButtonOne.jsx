/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
function ButtonOne(props) {
  return (
    <Link to={props.route}>
      <button className="add_doctor">{props.children}</button>
    </Link>

  )
}

export default ButtonOne
