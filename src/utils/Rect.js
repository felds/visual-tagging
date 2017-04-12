export default class Rect {
    constructor(x: Number, y: Number, w: Number, h: Number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}

export const stylesFromRect = (r: Rect) => ({
    left: r.x * 100 + "%",
    top: r.y * 100 + "%",
    width: r.w * 100 + "%",
    height: r.h * 100 + "%",
})

export const compareRectsSize = (a: Rect, b: Rect) => {
    const aSize = a.w + a.h
    const bSize = b.w + b.h

    return (aSize - bSize) / Math.abs(aSize - bSize)
}
