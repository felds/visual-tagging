import React from 'react'
import PropTypes from 'prop-types'
import TaggerTag from './TaggerTag'

class Tagger extends React.Component {
  constructor(props) {
    super()

    this.state = {
      activeTag: props.activeTag,
    }

    this.__adjustCanvas = this.__adjustCanvas.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      activeTag: props.activeTag,
    })
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
      <div className="tagger" style={{ backgroundImage: `url(${imgSrc})` }} ref={n => this.el = n}
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

  __setActiveTag(id) {
    this.setState({
      activeTag: id,
    })
  }

  get canvasStyles() {
    if (!this.el) return {}

    const minProportion = Math.min(
      this.el.clientWidth / this.props.imgWidth,
      this.el.clientHeight / this.props.imgHeight,
    )
    const width = this.props.imgWidth * minProportion
    const height = this.props.imgHeight * minProportion
    const left = (this.el.clientWidth - width) / 2
    const top = (this.el.clientHeight - height) / 2

    return { width, height, left, top }
  }

  get tags() {
    const { tags } = this.props
    const { activeTag } = this.state
    
    return tags.map(tag =>
      <TaggerTag {...tag} key={tag.id}
        isActive={tag.id === Number(activeTag)}
        setActiveTag={this.__setActiveTag.bind(this)}
      />
    )
  }
}
Tagger.propTypes = {
  activeTag: PropTypes.any,
  imgSrc: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
}
Tagger.defaultProps = {
}


export default Tagger