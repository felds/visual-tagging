import React from 'react'
import PropTypes from 'prop-types'
import TaggerTag from './TaggerTag'


class TaggerCanvas extends React.Component {
  constructor() {
    super()
    this.__adjustCanvas = this.__adjustCanvas.bind(this)
  }

  render() {
    return <div className="tagger__canvas" style={this.style} ref={n => this.el = n}>
      {this.tags}
    </div>
  }

  componentWillMount() {
    window.addEventListener('resize', this.__adjustCanvas)
  }

  componentDidMount() {
    this.__adjustCanvas()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.__adjustCanvas)
  }

  __adjustCanvas() {
    this.forceUpdate()
  }




  get tags() {
    const { tags, activeTag } = this.props

    return tags.map(tag =>
      <TaggerTag {...tag} key={tag.id} isActive={tag.id === Number(activeTag)} />
    )
  }


  get style() {
    if (!this.el) return {}
    const el = this.el
    const parent = el.parentElement

    const minProportion = Math.min(
      parent.clientWidth / this.props.imgWidth,
      parent.clientHeight / this.props.imgHeight,
    )
    const width = this.props.imgWidth * minProportion
    const height = this.props.imgHeight * minProportion
    const left = (parent.clientWidth - width) / 2
    const top = (parent.clientHeight - height) / 2

    return { width, height, left, top }
  }




}
TaggerCanvas.propTypes = {
  activeTag: PropTypes.any,
  tags: PropTypes.array.isRequired,
}


export default TaggerCanvas