import LinkedList from './linked-list.js';

function HashMap() {
  const LOADFACTOR = 0.75;
  let capacity = 16;
  let buckets = Array.from(Array(capacity), LinkedList);

  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % capacity;
    }
    return hashCode;
  };

  const loadLevel = () => {
    return length() / capacity;
  };

  const growHashMap = () => {
    const oldEntries = entries();
    capacity *= 2;
    buckets = Array.from(Array(capacity), LinkedList);
    oldEntries.forEach((entry) => {
      set(entry[0], entry[1]);
    });
  };

  const set = (key, val) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    let current = bucket.head();
    while (current) {
      if (Object.hasOwn(current.value, key)) {
        current.value[key] = val;
        return;
      }
      current = current.next;
    }
    bucket.append({ [key]: val });
    if (loadLevel() > LOADFACTOR) {
      growHashMap();
    }
  };

  const get = (key) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    if (!bucket.head()) return null;
    let current = bucket.head();
    while (current) {
      if (Object.hasOwn(current.value, key)) {
        return current.value[key];
      }
      current = current.next;
    }
    return null;
  };

  const has = (key) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    if (!bucket.head()) return false;
    let current = bucket.head();
    while (current) {
      if (Object.hasOwn(current.value, key)) return true;
      current = current.next;
    }
    return false;
  };

  const remove = (key) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    if (!bucket.head()) return false;
    let current = bucket.head();
    let count = 0;
    while (current) {
      if (Object.hasOwn(current.value, key)) {
        bucket.removeAt(count);
        return true;
      }
      current = current.next;
      count++;
    }
    return false;
  };

  const length = () => {
    let count = 0;
    buckets.forEach((bucket) => {
      count += bucket.size();
    });
    return count;
  };

  const clear = () => {
    buckets.forEach((bucket) => {
      bucket.clear();
    });
  };

  const keys = () => {
    const keys = [];
    buckets.forEach((bucket) => {
      if (!bucket.head()) return;
      let current = bucket.head();
      while (current) {
        keys.push(Object.keys(current.value)[0]);
        current = current.next;
      }
    });
    return keys;
  };

  const values = () => {
    const values = [];
    buckets.forEach((bucket) => {
      if (!bucket.head()) return;
      let current = bucket.head();
      while (current) {
        values.push(Object.values(current.value)[0]);
        current = current.next;
      }
    });
    return values;
  };

  const entries = () => {
    const entries = [];
    buckets.forEach((bucket) => {
      if (!bucket.head()) return;
      let current = bucket.head();
      while (current) {
        entries.push(Object.entries(current.value)[0]);
        current = current.next;
      }
    });
    return entries;
  };

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    loadLevel,
  };
}

const test = HashMap();

//test set
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set('moon', 'silver');
