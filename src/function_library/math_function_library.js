/**
 * 
 * @param {Number} pointX x-position of the point to rotate
 * @param {Number} pointY y-position of the point to rotate
 * @param {Number} pivotX x-position of the pivot
 * @param {Number} pivotY y-position of the pivot
 * @param {Number} angle angle to rotate, in radians
 * @returns key value pair of the rotated position with the keys = [x, y]
 */
export function rotateAroundPivot(pointX, pointY, pivotX, pivotY, angle)
{
    // Translate pointX and pointY by pivot points, apply rotation matrix, then translate back
    return {x: (Math.cos(angle) * (pointX - pivotX) - Math.sin(angle) * (pointY - pivotY)) + pivotX,
            y: (Math.sin(angle) * (pointX - pivotX) + Math.cos(angle) * (pointY - pivotY)) + pivotY};
}