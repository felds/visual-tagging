import React from 'react'
import PropTypes from 'prop-types'
import TaggerTag from './TaggerTag'
import { default as Rect, compareRectsSize } from '../utils/Rect'


const relativeCoords = (e) => {
    const elRects = e.target.getBoundingClientRect()
    const x = (e.clientX - elRects.left) / elRects.width
    const y = (e.clientY - elRects.top) / elRects.height

    return { x, y }
}


class TaggerCanvas extends React.Component {
    constructor() {
        super()
        
        this.state = {
            draftTag: undefined,
        }

        this.__adjustCanvas = this.__adjustCanvas.bind(this)
        this.__handleWindowMouseMove = this.__handleWindowMouseMove.bind(this)
        this.__handleWindowMouseUp = this.__handleWindowMouseUp.bind(this)
    }

    render() {
        return (
            <div className="tagger__canvas" style={this.style} ref={n => this.el = n}
                onClick={this.__handleClick.bind(this)}
                onMouseDown={this.__handleMouseDown.bind(this)}
            >
                {this.tags}
            </div>
        )
    }

    componentWillMount() {
        window.addEventListener('resize', this.__adjustCanvas)
        window.addEventListener('mousemove', this.__handleWindowMouseMove)
        window.addEventListener('mouseup', this.__handleWindowMouseUp)
    }

    componentDidMount() {
        this.__adjustCanvas()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.__adjustCanvas)
        window.removeEventListener('mousemove', this.__handleWindowMouseMove)
        window.removeEventListener('mouseup', this.__handleWindowMouseUp)
    }

    __adjustCanvas() {
        this.forceUpdate()
    }

    __handleClick(e) {
        // unselect tags
        if (e.target !== e.currentTarget) return
        const { setActiveTag } = this.context
        setActiveTag(undefined)
    }

    __handleMouseDown(e) {
        // start new tag
        const coords = relativeCoords(e)
        this.setState({
            draftTag: new Rect(coords.x, coords.y, 0, 0),
        })
    }
    __handleWindowMouseMove(e) {
        // resize the new tag
    }
    __handleWindowMouseUp(e) {
        // add tag to collection
        this.setState({
            draftTag: undefined,
        })
    }

    get tags() {
        const { tags, activeTag } = this.props

        return tags
            .sort((a, b) => compareRectsSize(a.rect, b.rect))
            .reverse()
            .map(tag =>
                <TaggerTag {...tag} key={tag.id} isActive={tag.id === Number(activeTag)} />
            ).concat([
                this.state.draftTag && <TaggerTag key="new" rect={this.state.draftTag} />
            ])
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
TaggerCanvas.contextTypes = {
    setActiveTag: PropTypes.func.isRequired,
}


export default TaggerCanvas