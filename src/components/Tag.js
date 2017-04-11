import React from 'react'
import PropTypes from 'prop-types'




const Tag = ({ x, y, w, h }) => (
  <div className="tagger__tag" style={{
    
    left: (x * 100) + '%',
    top: (y * 100) + '%',
    width: (w * 100) + '%',
    height: (h * 100) + '%',

  }} />
)


export default Tag