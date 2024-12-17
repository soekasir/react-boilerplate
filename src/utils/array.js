export const array={
  /** move([1,2,3], 0, 2) will return [3,2,1]  */
  move:(arr, oldIndex, newIndex)=>{
    if (newIndex >= arr.length) {
      let i = newIndex - arr.length + 1;
      while (i--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  },
}
