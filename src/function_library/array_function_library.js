/**
 * Remove a single object from the array
 * @param {Array} array 
 * @param {Number} index 
 * @returns The element that was removed from the array
 */
export function removeAt(array, index)
{
    return array.splice(index, 1)[0];
}