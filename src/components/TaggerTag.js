import React from 'react'
import PropTypes from 'prop-types'
import Rect from '../utils/Rect'

class TaggerTag extends React.Component {
    render() {
        return <div className={this.classes}
            style={this.styles}
            onClick={this.__handleClick.bind(this)}
        />
    }

    __handleClick(e) {
        const { id } = this.props
        const { setActiveTag } = this.context
        setActiveTag(id)
    }

    get classes() {
        const classes = ['tagger__tag']
        const { isActive } = this.props

        if (isActive) classes.push('tagger__tag--active')

        return classes.join(' ')
    }

    get styles() {
        const { rect } = this.props

        const left = (rect.x * 100) + '%'
        const top = (rect.y * 100) + '%'
        const width = (rect.w * 100) + '%'
        const height = (rect.h * 100) + '%'

        return { left, top, width, height }
    }
}
TaggerTag.propTypes = {
    isActive: PropTypes.bool,
    id: PropTypes.number.isRequired,
    rect: PropTypes.instanceOf(Rect).isRequired,
}
TaggerTag.defaultProps = {
    isActive: false,
}
TaggerTag.contextTypes = {
    setActiveTag: PropTypes.func.isRequired,
}


export default TaggerTag