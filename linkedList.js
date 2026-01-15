class LinkedList {
  headNode;
  currSize;

  constructor() {
    this.headNode = null;
    this.currSize = 0;
  }

  append(value) {
    if (this.headNode === null) {
      this.headNode = new Node();
      this.headNode.value = value;
      this.currSize++;
      return;
    }

    let travelNode = this.headNode;

    while (travelNode.nextNode !== null) {
      travelNode = travelNode.nextNode;
    }

    let newNode = new Node();
    newNode.value = value;
    travelNode.nextNode = newNode;
    this.currSize++;
  }

  prepend(value) {
    let newNode = new Node();
    newNode.value = value;
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
    this.currSize++;
  }

  size() {
    return this.currSize;
  }

  head() {
    if (this.headNode === null) {
      return undefined;
    }

    return this.headNode.value;
  }

  tail() {
    if (this.headNode === null) {
      return undefined;
    }

    let travelNode = this.headNode;

    while (travelNode.nextNode !== null) {
      travelNode = travelNode.nextNode;
    }

    return travelNode.value;
  }

  at(index) {
    if (index < 0 || index > this.currSize - 1) {
      return undefined;
    }

    let travelNode = this.headNode;

    for (let i = 0; i < index; i++) {
      travelNode = travelNode.nextNode;
    }

    return travelNode.value;
  }

  pop() {
    if (this.headNode === null) {
      return undefined;
    }

    if (this.headNode.nextNode === null) {
      const value = this.headNode.value;
      this.headNode = null;
      this.currSize--;
      return value;
    }

    let travelNode = this.headNode;
    while (travelNode.nextNode.nextNode !== null) {
      travelNode = travelNode.nextNode;
    }

    //Travel Node = Second Last Node;
    const valueOfLastNode = travelNode.nextNode.value;
    travelNode.nextNode = null;
    this.currSize--;
    return valueOfLastNode;
  }

  contains(value) {
    if (this.headNode === null) {
      return false;
    }

    let travelNode = this.headNode;

    while (travelNode !== null) {
      if (travelNode.value === value) return true;
      travelNode = travelNode.nextNode;
    }

    return false;
  }

  findIndex(value) {
    if (this.headNode === null) {
      return -1;
    }

    let index = 0;
    let travelNode = this.headNode;

    while (travelNode !== null) {
      if (travelNode.value === value) return index;
      travelNode = travelNode.nextNode;
      index++;
    }

    return -1;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.currSize) {
      throw new RangeError("Index out of Range");
    }

    let travelNode = new Node();
    travelNode.nextNode = this.headNode;

    for (let i = 0; i < index; i++) {
      travelNode = travelNode.nextNode;
    }

    // Inserting at travelNode -> (here) -> connectingNode
    let connectingNode = travelNode.nextNode;
    for (let i = values.length - 1; i >= 0; i--) {
      let node = new Node();
      node.value = values[i];
      node.nextNode = connectingNode;
      connectingNode = node;
      this.currSize++;
    }
    travelNode.nextNode = connectingNode;

    if (index === 0) {
      this.headNode = connectingNode;
    }
  }

  removeAt(index) {
    if (index < 0 || index > this.currSize - 1) {
      throw new RangeError("Index out of Range");
    } else if (index === 0) {
      this.headNode = this.headNode.nextNode;
      this.currSize--;
      return;
    }

    let travelNode = this.headNode;
    for (let i = 0; i < index - 1; i++) {
      travelNode = travelNode.nextNode;
    }

    let prevNode = travelNode;
    let nextNode = travelNode.nextNode.nextNode;

    prevNode.nextNode = nextNode;
    this.currSize--;
  }

  toString() {
    if (this.headNode === null) {
      return "";
    }

    let listString = "";
    let travelNode = this.headNode;
    while (travelNode !== null) {
      listString += `( ${travelNode.value} ) -> `;
      travelNode = travelNode.nextNode;
    }

    listString += " null";

    return listString;
  }
}

class Node {
  value;
  nextNode;

  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

export { LinkedList, Node };
