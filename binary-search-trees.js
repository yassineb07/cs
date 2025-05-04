function Node(data, left = null, right = null) {
  return { data, left, right };
}

const createBST = (arr, start, end) => {
  if (start > end) return null;
  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(arr[mid]);
  root.left = createBST(arr, start, mid - 1);
  root.right = createBST(arr, mid + 1, end);

  return root;
};

const buildTree = (arr) => {
  arr.sort((a, b) => a - b);
  arr = [...new Set(arr)];

  return createBST(arr, 0, arr.length - 1);
};

const prettyPrint = (node, prefivalue = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefivalue}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefivalue}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefivalue}${isLeft ? '    ' : '│   '}`, true);
  }
};

function Tree(arr) {
  let root = buildTree(arr);

  const insert = (value, rootNode = root) => {
    if (rootNode === null) return Node(value);
    if (rootNode.data === value) return rootNode;
    if (value < rootNode.data) rootNode.left = insert(value, rootNode.left);
    else if (value > rootNode.data)
      rootNode.right = insert(value, rootNode.right);

    return rootNode;
  };

  function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  const deleteItem = (value, rootNode = root) => {
    if (rootNode === null) return rootNode;

    if (rootNode.data > value) {
      rootNode.left = deleteItem(value, rootNode.left);
    } else if (rootNode.data < value) {
      rootNode.right = deleteItem(value, rootNode.right);
    } else {
      if (rootNode.left === null) return rootNode.right;
      if (rootNode.right === null) return rootNode.left;

      let succ = getSuccessor(rootNode);
      rootNode.data = succ.data;
      rootNode.right = deleteItem(succ.data, rootNode.right);
    }
    return rootNode;
  };

  const find = (value, rootNode = root) => {
    if (rootNode === null) return null;
    if (rootNode.data === value) return rootNode;
    if (value < rootNode.data) return find(value, rootNode.left);
    else return find(value, rootNode.right);
  };

  const levelOrder = (callback, rootNode = root) => {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }
    if (rootNode === null) return;
    const queue = [];
    queue.push(rootNode);
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  };

  const inOrder = (callback, rootNode = root) => {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }
    if (rootNode === null) return;
    inOrder(callback, rootNode.left);
    callback(rootNode);
    inOrder(callback, rootNode.right);
  };

  const preOrder = (callback, rootNode = root) => {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }
    if (rootNode === null) return;
    callback(rootNode);
    preOrder(callback, rootNode.left);
    preOrder(callback, rootNode.right);
  };

  const postOrder = (callback, rootNode = root) => {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }
    if (rootNode === null) return;
    postOrder(callback, rootNode.left);
    postOrder(callback, rootNode.right);
    callback(rootNode);
  };

  const findHeight = (rootNode = root, value, height) => {
    if (rootNode === null) return -1;
    let leftHeight = findHeight(value, rootNode.left, height);
    let rightHeight = findHeight(value, rootNode.right, height);

    let ans = Math.max(leftHeight, rightHeight) + 1;

    if (rootNode.data === value) {
      height.value = ans;
      height.found = true;
    }

    return ans;
  };

  const height = (value, rootNode = root) => {
    let nodeHeight = { value: -1, found: false };
    findHeight(rootNode, value, nodeHeight);
    return nodeHeight.found ? nodeHeight.value : null;
  };

  const depth = (value, rootNode = root) => {
    if (rootNode === null) return null;
    if (rootNode.data === value) return 0;

    let leftDepth = depth(value, rootNode.left);
    let rightDepth = depth(value, rootNode.right);

    if (leftDepth !== null) return leftDepth + 1;
    if (rightDepth !== null) return rightDepth + 1;

    return null;
  };

  const heightNode = (node) => {
    if (node === null) return 0;
    return 1 + Math.max(heightNode(node.left), heightNode(node.right));
  };

  const isBalanced = (rootNode = root) => {
    if (rootNode === null) return true;

    let leftHeight = heightNode(rootNode.left);
    let rightHeight = heightNode(rootNode.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return isBalanced(rootNode.left) && isBalanced(rootNode.right);
  };

  const rebalance = (rootNode = root) => {
    const arr = [];
    inOrder((node) => arr.push(node.data), rootNode);
    root = buildTree(arr);
  };

  return {
    get root() {
      return root;
    },
    set root(newRoot) {
      root = newRoot;
    },
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

// test code
const array = [1, 20, 36, 4, 55, 6, 7, 88, 9, 10, 99, 2, 13, 93, 15, 75];

const tree = Tree(array);
prettyPrint(tree.root);
console.log('is tree balanced : ', tree.isBalanced());
tree.insert(100);
tree.insert(120);
tree.insert(145);
tree.insert(200);
console.log('Before rebalancing');
prettyPrint(tree.root);
console.log('is tree balanced : ', tree.isBalanced());
tree.rebalance();
console.log('After rebalancing');
prettyPrint(tree.root);
console.log('is tree balanced : ', tree.isBalanced());

console.log('Level Order');
tree.levelOrder((node) => console.log(node.data));
console.log('In Order');
tree.inOrder((node) => console.log(node.data));
console.log('Pre Order');
tree.preOrder((node) => console.log(node.data));
console.log('Post Order');
tree.postOrder((node) => console.log(node.data));
