import React from 'react'
import PropTypes from 'prop-types'

class TaggerTag extends React.Component {
  render() {
    return <div className={this.classes}
                style={this.styles}
                onClick={this.__handleClick.bind(this)} />
  }

  __handleClick(e) {
    const { id, setActiveTag } = this.props
    setActiveTag(id)
  }

  get classes() {
    const classes = [ 'tagger__tag' ]
    const { isActive } = this.props

    if (isActive) classes.push('tagger__tag--active')

    return classes.join(' ')
  }

  get styles() {
    const { x, y, w, h } = this.props

    const left = (x * 100) + '%'
    const top = (y * 100) + '%'
    const width = (w * 100) + '%'
    const height = (h * 100) + '%'

    return { left, top, width, height }
  }
}
TaggerTag.propTypes = {
  isActive: PropTypes.bool,
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  setActiveTag: PropTypes.func.isRequired,
}
TaggerTag.defaultProps = {
  isActive: false,
}


export default TaggerTag