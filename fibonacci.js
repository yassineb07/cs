function fibs(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const fibsArray = [0, 1];
  for (let i = 2; i < n; i++) {
    fibsArray[i] = fibsArray[i - 1] + fibsArray[i - 2];
  }
  return fibsArray;
}

function fibsRec(n) {
  console.log('This was printed recursively');
  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const fibsArray = fibsRec(n - 1);
  fibsArray[n - 1] = fibsArray[n - 2] + fibsArray[n - 3];
  return fibsArray;
}

console.log(fibs(8));
console.log(fibsRec(8));
