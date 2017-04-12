export default class Rect {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        Object.freeze(this)
    }
}


export const compareRectsSize = (a, b) => {
    const aSize = a.w + a.h
    const bSize = b.w + b.h

    return (aSize - bSize) / Math.abs(aSize - bSize)
}
