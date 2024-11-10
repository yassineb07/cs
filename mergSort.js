function mergeSort(array) {
  if (array.length <= 1) return array;
  let midPoint = array.length / 2;
  const sortedLeft = mergeSort(array.slice(0, midPoint));
  const sortedRight = mergeSort(array.slice(midPoint));
  const sortedArray = [];
  let i = 0,
    j = 0,
    k = 0;
  while (i < sortedLeft.length && j < sortedRight.length) {
    if (sortedLeft[i] < sortedRight[j]) {
      sortedArray[k] = sortedLeft[i];
      k++;
      i++;
    } else {
      sortedArray[k] = sortedRight[j];
      k++;
      j++;
    }
  }
  for (i; i < sortedLeft.length; i++) {
    sortedArray[k] = sortedLeft[i];
    k++;
  }
  for (j; j < sortedRight.length; j++) {
    sortedArray[k] = sortedRight[j];
    k++;
  }
  return sortedArray;
}

const input1 = [3, 2, 1, 13, 8, 5, 0, 1];
const input2 = [105, 79, 100, 110];
const output1 = mergeSort(input1);
const output2 = mergeSort(input2);
console.log({ input1, output1 });
console.log({ input2, output2 });
