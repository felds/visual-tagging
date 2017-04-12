export const relativeEventCoordsFromElement = (e, el = e.currentTarget) => {
    const elRects = el.getBoundingClientRect()
    const x = (e.clientX - elRects.left) / elRects.width
    const y = (e.clientY - elRects.top) / elRects.height

    return { x, y }
}