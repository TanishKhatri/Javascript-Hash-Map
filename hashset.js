import { LinkedList } from "./linkedList.js";

class HashSet {
  loadfactor;
  capacity;
  mapArray;
  maxSize;
  currSize;

  constructor (capacity = 16) {
    this.loadfactor = 0.75;
    this.capacity =  capacity;
    this.mapArray = Array(this.capacity).fill(null);
    this.maxSize = Math.round(this.loadfactor*this.capacity);
    this.currSize = 0;
  }

  hash(key) {
    let hashCode = 0;

    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = prime * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  #resize() {
    if (this.currSize > this.maxSize) {
      let keys = this.keys();
      this.clear();
      this.capacity *= 2;
      this.maxSize = this.capacity * this.loadfactor;
      this.mapArray = Array(this.capacity).fill(null);
      for (let key of keys) {
        this.set(key);
      }
    }
  }

  add(key) {
    const keyHashCode = this.hash(key);
    let bucket = this.mapArray[keyHashCode];
    
    //Put in bucket if bucket is null, after making a linked list there;
    if (bucket === null) {
      bucket = new LinkedList();
      bucket.append(key);
      this.mapArray[keyHashCode] = bucket;
      this.currSize++;
      this.#resize();
      return;
    }
    
    if (bucket.contains(key)) {
      return;
    }

    bucket.append(key);
    this.currSize++;
    this.#resize();
  }

  has(key) {
    const keyHashCode = this.hash(key);
    const bucket = this.mapArray[keyHashCode];

    if (bucket === null) {
      return false;
    }

    if (bucket.contains(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    const keyHashCode = this.hash(key);
    const bucket = this.mapArray[keyHashCode];

    if (bucket === null) {
      return false;
    }

    const indexOfKey = bucket.findIndex(key);
    if (indexOfKey === -1) return false;

    bucket.removeAt(indexOfKey);
    if (bucket.headNode === null) {
      this.mapArray[keyHashCode] = null;
    }
    this.currSize--;
    return true;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.mapArray[i];
      if (bucket === null) {
        continue;
      }
      const bucketSize = bucket.size();
      count += bucketSize;
    }

    return count;
  } 

  clear() {
    this.mapArray.fill(null, 0, this.capacity);
    this.currSize = 0;
  }

  keys() {
    let arr = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.mapArray[i];
      if (bucket === null) {
        continue;
      }
      const bucketSize = bucket.size();
      for (let i = 0; i < bucketSize; i++) {
        arr.push(bucket.at(i));
      }
    }

    return arr;
  }

  toString() {
    let string = "";
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.mapArray[i];
      if (bucket === null) {
        string += `[${i}] => null\n`;
      } else {
        string += `[${i}] => ${bucket.toString()}\n`;
      }
    }

    return string;
  }
}

export {HashSet};