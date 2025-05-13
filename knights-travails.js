function Queue() {
  //queue utility
  let items = [];
  const enqueue = (obj) => {
    items.push(obj);
  };
  const dequeue = () => {
    return items.shift();
  };
  const isEmpty = () => {
    return items.length === 0;
  };
  const clear = () => {
    items = [];
  };
  return { enqueue, dequeue, isEmpty, clear };
}

function Vertex(square) {
  return { square, predecessor: null };
}

const possibleMoves = ([x, y]) => {
  // return array of possible board cells
  const possibleMoves = [];
  const validMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  // all knight next moves
  const newMoves = validMoves.map((move) => {
    return [move[0] + x, move[1] + y];
  });
  // check moves that go outside the board
  newMoves.forEach((move) => {
    if (move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8) {
      possibleMoves.push(move);
    }
  });
  return possibleMoves;
};

const printResult = (array) => {
  const squares = [];
  array.forEach((obj) => {
    squares.push(obj.square);
  });
  console.log(
    `You made it in ${squares.length - 1} moves!  Here's your path: `
  );
  squares.forEach((square) => {
    console.log(square);
  });
};

const findShortestPath = (array) => {
  // backtrack from end square to start square
  const shortest = [];
  const end = array[array.length - 1];
  shortest.push(end);
  let current = end.predecessor;
  while (current != null) {
    shortest.push(current);
    current = current.predecessor;
  }
  return shortest.reverse();
};

const knightMoves = ([sx, sy], [ex, ey]) => {
  const squares = [];
  const source = Vertex([sx, sy]);
  squares.push(source);

  const queue = Queue();
  queue.enqueue(source);

  while (!queue.isEmpty()) {
    let currentVertex = queue.dequeue();
    const nextSquares = possibleMoves(currentVertex.square);

    for (const square of nextSquares) {
      let vertex = Vertex(square);
      vertex.predecessor = currentVertex;
      squares.push(vertex);
      if (square[0] === ex && square[1] === ey) {
        queue.clear();
        break;
      }
      queue.enqueue(vertex);
    }
  }

  const shortestPath = findShortestPath(squares);
  return printResult(shortestPath);
};

// test code
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
knightMoves([3, 3], [4, 3]);
