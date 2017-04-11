import React from 'react'
import PropTypes from 'prop-types'
import Tag from './Tag'

class Tagger extends React.Component {
  constructor() {
    super()

    this.__adjustCanvas = this.__adjustCanvas.bind(this)
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

  render() {
    const { imgSrc } = this.props

    return (
      <div className="tagger" style={{ backgroundImage: `url(${imgSrc})` }} ref={n => this.rootEl = n}
        onLoad={console.log}
      >
        <div className="tagger__canvas" ref={n => this.canvasEl = n} style={this.canvasStyles}>
          {this.tags}
        </div>
      </div>
    )
  }

  __adjustCanvas() {
    this.forceUpdate()
  }

  get canvasStyles() {
    if (!this.rootEl) return {}

    const minProportion = Math.min(
      this.rootEl.clientWidth / this.props.imgWidth,
      this.rootEl.clientHeight / this.props.imgHeight,
    )
    const width = this.props.imgWidth * minProportion
    const height = this.props.imgHeight * minProportion
    const left = (this.rootEl.clientWidth - width) / 2
    const top = (this.rootEl.clientHeight - height) / 2

    return { width, height, left, top }
  }

  get tags() {
    const { tags, activeTag } = this.props
    
    return tags.map(tag =>
      <Tag {...tag} key={tag.id} isActive={tag.id === activeTag} />
    )
  }
}
Tagger.propTypes = {
  activeTag: PropTypes.number,
  imgSrc: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
}


export default Tagger