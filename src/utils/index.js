import Vector from './Vector'

export const relativeEventCoordsFromElement = (e, el = e.currentTarget) => {
    const elRects = el.getBoundingClientRect()
    const x = (e.clientX - elRects.left) / elRects.width
    const y = (e.clientY - elRects.top) / elRects.height

    return new Vector(x, y)
}