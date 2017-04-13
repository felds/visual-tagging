export default class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

export const distance = (a, b) =>
    Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2))