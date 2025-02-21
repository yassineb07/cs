import LinkedList from './linked-list.js';

function HashSet() {
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

  const growHashSet = () => {
    const oldKeys = keys();
    capacity *= 2;
    buckets = Array.from(Array(capacity), LinkedList);
    oldKeys.forEach((key) => {
      set(key);
    });
  };

  const set = (key) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    if (bucket.contains(key)) return;
    bucket.append(key);
    if (loadLevel() > LOADFACTOR) {
      growHashSet();
    }
  };

  const get = (key) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    if (bucket.contains(key)) {
      return bucket.at(bucket.find(key)).value;
    }
    return null;
  };

  const has = (key) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    return bucket.contains(key);
  };

  const remove = (key) => {
    let index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    let bucket = buckets[index];
    return bucket.removeAt(bucket.find(key));
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
      for (let i = 0; i < bucket.size(); i++) {
        keys.push(bucket.at(i).value);
      }
    });
    return keys;
  };

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    loadLevel,
  };
}

const test = HashSet();

//test set
test.set('apple');
test.set('banana');
test.set('carrot');
test.set('dog');
test.set('elephant');
test.set('frog');
test.set('grape');
test.set('hat');
test.set('ice cream');
test.set('jacket');
test.set('kite');
test.set('lion');

test.set('moon');
