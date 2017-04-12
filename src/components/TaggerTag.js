import React from 'react'
import PropTypes from 'prop-types'
import { default as Rect, stylesFromRect } from '../utils/Rect'

class TaggerTag extends React.Component {
    render() {
        const { rect } = this.props

        return <div className={this.classes}
            style={stylesFromRect(rect)}
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
}
TaggerTag.propTypes = {
    isActive: PropTypes.bool,
    id: PropTypes.number,
    rect: PropTypes.instanceOf(Rect).isRequired,
}
TaggerTag.defaultProps = {
    isActive: false,
}
TaggerTag.contextTypes = {
    setActiveTag: PropTypes.func.isRequired,
}


export default TaggerTag