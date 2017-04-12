export default class Rect {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}

export const stylesFromRect = (r) => ({
    left: r.x * 100 + "%",
    top: r.y * 100 + "%",
    width: r.w * 100 + "%",
    height: r.h * 100 + "%",
})

export const compareRectsSize = (a, b) => {
    const aSize = a.w + a.h
    const bSize = b.w + b.h

    return (aSize - bSize) / Math.abs(aSize - bSize)
}

export const rectFromCoordPairs = (a, b) => {
    const { min, max } = Math

    const x = max(0, min(a.x, b.x))
    const y = max(0, min(a.y, b.y))
    const w = min(1 - x, max(a.x, b.x) - x)
    const h = min(1 - y, max(a.y, b.y) - y)

    return  new Rect(x, y, w, h)
}