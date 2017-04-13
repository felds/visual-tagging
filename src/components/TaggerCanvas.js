import React from 'react'
import PropTypes from 'prop-types'
import TaggerTag from './TaggerTag'
import { relativeEventCoordsFromElement } from '../utils'
import { compareRectsSize, rectFromCoordPairs } from '../utils/Rect'
import { distance } from '../utils/Vector'


class TaggerCanvas extends React.Component {
    constructor() {
        super()
        
        this.state = {
            isDrawing: false,
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
                {this.draftTagRect && <TaggerTag isDraft rect={this.draftTagRect} />}
            </div>
        )
    }

    componentWillMount() {
        window.addEventListener('resize', this.__adjustCanvas)
        window.addEventListener('mousemove', this.__handleWindowMouseMove)
        window.addEventListener('mouseup', this.__handleWindowMouseUp)
    }

    componentDidMount() {
        // calculate canvas size and position when injected into the DOM
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
        const { setActiveTag } = this.props
        setActiveTag(undefined)
    }

    __handleMouseDown(e) {
        // start new tag
        const coords = relativeEventCoordsFromElement(e, this.el)
        this.setState(prevState => {
            return {
                isDrawing: true,
                drawingStart: coords,
                drawingEnd: false,
            }
        })
    }
    __handleWindowMouseMove(e) {
        // resize tag
        const coords = relativeEventCoordsFromElement(e, this.el)
        this.setState(prevState => {
            return {
                drawingEnd: prevState.isDrawing ? coords : prevState.drawingEnd,
            }
        })
    }
    __handleWindowMouseUp(e) {
        // unselect active tag
        const { setActiveTag } = this.props
        setActiveTag(undefined)

        // add tag to collection
        this.setState(prevState => {
            const keep = distance(prevState.drawingStart, prevState.drawingEnd) > 0.01 
            // @TODO use pixels
            return {
                isDrawing: false,
                drawingStart: keep && prevState.drawingStart,
                drawingEnd: keep && prevState.drawingEnd,
            }
        })
    }

    get tags() {
        const { draftTagRect } = this
        const { tags, activeTag, setActiveTag } = this.props
        
        return tags
            .sort((a, b) => compareRectsSize(a.rect, b.rect))
            .reverse()
            .map(tag =>
                <TaggerTag {...tag} key={tag.id} isActive={tag.id === activeTag}
                    setActiveTag={draftTagRect ? undefined : setActiveTag}
                />
            )
            //                                                                 @TODO  draft tag shouldn't come from the loop
            
            // .concat([
            //     
            // ])
    }

    /**
     * Calculate the current size and position of the canvas
     * 
     * @return Object
     */
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

    /**
     * Create a new Rect from the starting and ending drawing coords
     * 
     * @return Rect
     */
    get draftTagRect() {
        const { drawingStart, drawingEnd } = this.state

        return (drawingStart && drawingEnd) &&
            rectFromCoordPairs(drawingStart, drawingEnd)
    }
}
TaggerCanvas.propTypes = {
    activeTag: PropTypes.any,
    tags: PropTypes.array.isRequired,
}


export default TaggerCanvas