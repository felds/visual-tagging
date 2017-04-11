import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// Components
import Tagger from './components/Tagger'


const config = {
  imgSrc: "image.jpg",
  imgWidth: 5760,
  imgHeight: 3840,
  // activeTag: 2,
  initialTags: [
    { id: 1, x: .1, y: 0, w: .8, h: .5 },
    { id: 2, x: .2, y: .7, w: .6, h: .2 },
    { id: 3, x: 0, y: 0, w: .1231232134234, h: 1 },
  ]
}


ReactDOM.render(
  <Tagger {...config} />,
  root
)
