
/**
 * @function randomNum
 * @param {number} min max to resolve random number
 * @param {number} max max to resolve random number
 * @return a new random number calculated by function
 */
export function randomNum(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}