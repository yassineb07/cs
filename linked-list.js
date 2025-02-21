function Node(value = null, next = null) {
  return { value, next };
}
function LinkedList() {
  let headEl = null;

  const clear = () => {
    headEl = null;
  };

  const append = (value) => {
    if (!headEl) {
      prepend(value);
    } else {
      let current = headEl;
      while (current.next) {
        current = current.next;
      }
      current.next = Node(value);
    }

    return headEl;
  };

  const prepend = (value) => {
    headEl = Node(value, headEl);
    return headEl;
  };

  const size = () => {
    let current = headEl;
    let count = 0;
    while (current) {
      current = current.next;
      count++;
    }
    return count;
  };

  const head = () => {
    return headEl;
  };

  const tail = () => {
    let current = headEl;
    while (current.next) {
      current = current.next;
    }
    return current;
  };

  const at = (index) => {
    let current = headEl;
    let count = 0;
    while (current) {
      if (count === index) {
        return current;
      }
      current = current.next;
      count++;
    }
    return current;
  };

  const pop = () => {
    let current = headEl;
    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
  };

  const contains = (value) => {
    let current = headEl;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  };

  const find = (value) => {
    let current = headEl;
    let count = 0;
    while (current) {
      if (current.value === value) return count;
      current = current.next;
      count++;
    }
    return null;
  };

  const toString = () => {
    let current = headEl;
    let output = '';
    while (current) {
      output += `( ${current.value} ) -> `;
      current = current.next;
    }
    return output + current;
  };

  const insertAt = (value, index) => {
    let current = headEl;
    if (index === 0) {
      prepend(value);
    }
    let count = 1;
    while (current) {
      if (index === count) {
        current.next = Node(value, current.next);
        return;
      }
      current = current.next;
      count++;
    }
  };
  const removeAt = (index) => {
    let current = headEl;
    if (index === 0) {
      headEl = headEl.next;
      return;
    }
    let count = 1;
    while (current) {
      if (index === count) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
      count++;
    }
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    clear,
  };
}

const list = LinkedList();

list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');

//console.log(list.toString());

export default LinkedList;
