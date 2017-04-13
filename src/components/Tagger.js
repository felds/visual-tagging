import React from 'react'
import PropTypes from 'prop-types'
import TaggerCanvas from './TaggerCanvas'

class Tagger extends React.Component {
    constructor(props) {
        super()

        this.state = {
            activeTag: props.activeTag,
            tags: props.initialTags,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            activeTag: props.activeTag,
        })
    }

    render() {
        const { imgSrc, imgWidth, imgHeight } = this.props
        const { tags, activeTag } = this.state

        return (
            <div className="tagger" style={{ backgroundImage: `url(${imgSrc})` }}
                ref={n => this.el = n}
            >
                <TaggerCanvas tags={tags}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    activeTag={activeTag}
                    setActiveTag={this.__setActiveTag.bind(this)}
                />
            </div>
        )
    }

    __setActiveTag(id) {
        this.setState({
            activeTag: id,
        })
    }
}
Tagger.propTypes = {
    activeTag: PropTypes.any,
    imgSrc: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
    imgHeight: PropTypes.number.isRequired,
    initialTags: PropTypes.array.isRequired,
}
Tagger.defaultProps = {
}


export default Tagger