import React from 'react'
import ReactDOM from 'react-dom'
import Rect from './utils/Rect'
import './index.css'

// Components
import Tagger from './components/Tagger'

const imgDark = {
    imgSrc: "//unsplash.com/photos/BmsmOjGQegU/download",
    imgWidth: 3648,
    imgHeight: 5472,
}
const imgLight = {
    imgSrc: "//unsplash.com/photos/lcZ9NxhOSlo/download",
    imgWidth: 5130,
    imgHeight: 3840,
}
const imgColorful = {
    imgSrc: "//unsplash.com/photos/x4sQx9iUMBI/download",
    imgWidth: 6000,
    imgHeight: 4000,
}


const config = {
    ...imgDark,
    initialTags: [
        {
            id: 1,
            rect: new Rect(.1, .2, .8, .5),
        },
        // {
        //     id: 2,
        //     rect: new Rect(.2, .7, .6, .2),
        // },
        // {
        //     id: 3,
        //     rect: new Rect(0, 0, .1231232134234, 1),
        // },
        // {
        //     id: 4,
        //     rect: new Rect(.05, .05, .1, .1),
        // },
        // {
        //     id: 99,
        //     rect: new Rect(0, 0, 1, 1),
        // },
    ]
}


ReactDOM.render(
    <Tagger {...config} />,
    root
)
