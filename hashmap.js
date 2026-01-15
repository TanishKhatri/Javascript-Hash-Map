import { LinkedList } from "./linkedList.js";

class HashMap {
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
      let entries = this.entries();
      this.clear();
      this.capacity *= 2;
      this.currSize = 0;
      this.maxSize = this.capacity * this.loadfactor;
      this.mapArray = Array(this.capacity).fill(null);
      for (let entry of entries) {
        this.set(entry[0], entry[1]);
      }
    }
  }

  set(key, value) {
    const keyHashCode = this.hash(key);
    let bucket = this.mapArray[keyHashCode];
    
    //Put in bucket if bucket is null, after making a linked list there;
    if (bucket === null) {
      bucket = new LinkedList();
      bucket.append([key, value]);
      this.mapArray[keyHashCode] = bucket;
      this.currSize++;
      this.#resize();
      return;
    }
    
    const bucketSize = bucket.size();
    for (let i = 0; i < bucketSize; i++) {
      let itemAtIndexi = bucket.at(i);
      if (itemAtIndexi[0] === key) {
        itemAtIndexi[1] = value;
        return;
      }
    }

    bucket.append([key, value]);
    this.currSize++;
    this.#resize();
  }

  get(key) {
    const keyHashCode = this.hash(key);
    const bucket = this.mapArray[keyHashCode];

    if (bucket === null) {
      return null;
    }

    const bucketSize = bucket.size();
    for (let i = 0; i < bucketSize; i++) {
      const valueAtIndex = bucket.at(i);
      if (valueAtIndex[0] === key) {
        return valueAtIndex[1];
      }
    }

    return null;
  }

  has(key) {
    const keyHashCode = this.hash(key);
    const bucket = this.mapArray[keyHashCode];

    if (bucket === null) {
      return false;
    }

    const bucketSize = bucket.size();
    for (let i = 0; i < bucketSize; i++) {
      const valueAtIndex = bucket.at(i);
      if (valueAtIndex[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const keyHashCode = this.hash(key);
    const bucket = this.mapArray[keyHashCode];

    if (bucket === null) {
      return false;
    }

    const bucketSize = bucket.size();
    for (let i = 0; i < bucketSize; i++) {
      const valueAtIndex = bucket.at(i);
      if (valueAtIndex[0] === key) {
        bucket.removeAt(i);
        if (bucket.headNode === null) {
          this.mapArray[keyHashCode] = null;
        }
        this.currSize--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.currSize;
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
        arr.push(bucket.at(i)[0]);
      }
    }

    return arr;
  }

  values() {
    let arr = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.mapArray[i];
      if (bucket === null) {
        continue;
      }
      const bucketSize = bucket.size();
      for (let i = 0; i < bucketSize; i++) {
        arr.push(bucket.at(i)[1]);
      }
    }

    return arr;
  }

  entries() {
    let arr = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.mapArray[i];
      if (bucket === null) {
        continue;
      }
      const bucketSize = bucket.size();
      for (let i = 0; i < bucketSize; i++) {
        const item = bucket.at(i);
        arr.push([item[0], item[1]]);
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

export {HashMap};