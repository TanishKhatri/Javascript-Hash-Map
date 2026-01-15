class Node {
  key;
  next;

  constructor(key, next = null) {
    this.key = key;
    this.next = next;
  }
}

class HashSet {
  loadFactor;
  capacity;
  size;
  buckets;

  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  resize() {
    let keys = this.keys();
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null);
    for (let key of keys) {
      this.set(key);
    }
  }

  add(key) {
    if (this.size >= this.capacity*this.loadFactor) {
      this.resize();
    }
    const hashCode = this.hash(key);
    
    //Set when the first entry happens in a bucket 
    if (this.buckets[hashCode] === null) {
      this.buckets[hashCode] = new Node(key);
      this.size++;
      return;
    }

    //Set when a key is already inside
    let travelNode = this.buckets[hashCode];
    while (travelNode.next !== null) {
      if (travelNode.key === key) {
        return;
      }
      travelNode = travelNode.next;
    }
    //Here travelNode is the last element it never gets checked in the loop
    if (travelNode.key === key) {
      return;
    }

    //Set when new key is added and one is already at head
    travelNode.next = new Node(key);
    this.size++;
    return;
  }

  has(key) {
    const hashCode = this.hash(key);

    let travelNode = this.buckets[hashCode];
    while (travelNode !== null) {
      if (travelNode.key === key) {
        return true;
      }
      travelNode = travelNode.next;
    }

    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    if (this.buckets[hashCode] === null) {
      return false;
    }

    let travelNode = this.buckets[hashCode];
    if (travelNode.key === key) {
      this.buckets[hashCode] = travelNode.next;
      this.size--;
      return true;
    }

    while (travelNode.next !== null) {
      if (travelNode.next.key === key) {
        const nodeAfter = travelNode.next.next;
        travelNode.next = nodeAfter;
        this.size--;
        return true;
      }
      travelNode = travelNode.next;
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets.fill(null);
    this.size = 0;
  }

  keys() {
    let keysArr = [];
    for (let bucket of this.buckets) {
      if (bucket === null) {
        continue;
      }

      let travelNode = bucket;
      while (travelNode !== null) {
        keysArr.push(travelNode.key);
        travelNode = travelNode.next;
      }
    }

    return keysArr;
  }

  toString() {
    let finalString = "";
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] === null) {
        finalString += `[${i}] => null\n`;
      } else {
        let travelNode = this.buckets[i];
        finalString += `[${i}] => `
        while (travelNode !== null) {
          finalString += `( ${travelNode.key} ) -> `
          travelNode = travelNode.next;
        }
        finalString += `null\n`;
      }
    }

    return finalString;
  }
}

export {HashSet};