import { randomList } from "./list-utils";
export class  LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => T[];
  getRandomList: (min: number, max: number, maxValue: number) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;
  constructor(elements?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (elements?.length) {
      elements.forEach(el => this.append(el));
    }
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }
    this.tail = node;
    this.size++;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Incorrect index value");
    } else {
      const node = new LinkedListNode(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index -1) {
          curr = curr!.next;
          currIndex++;
        }
        node.next = curr!.next;
        curr!.next = node;
      }
      this.size++;
    }
  }

  deleteByIndex(index: number): void {
    if (index < 0 || index > this.size) {
      throw new Error("Incorrect index value");
    } else {
      let curr = this.head;
      switch (index) {
        case 0:
          this.deleteHead();
          break;
        case this.size -1:
          this.deleteTail();
          break;
        default:
          let prev = null;
          let currIndex = 0;
          while (currIndex < index) {
            prev = curr;
            curr ? curr = curr?.next : curr = null;
            currIndex++;
          }
          prev!.next = curr!.next;
          this.size--;
          break;
      }
    }
  }

  deleteHead() {
    if (this.head === null) {
      throw new Error("No head")
    } 
    if (this.head.next) {
      this.head = this.head.next;
    } else this.head = null;
    this.size--;
  }

  deleteTail() {
    if (!this.head || !this.head.next) {
      this.head = null;
      this.size = 0;
    } else {
      let curr = this.head;
      while (curr.next && curr.next.next) {
        curr = curr.next;
      }
      curr.next = null;
      this.size--;
    }
  }

  toArray() {
    let curr = this.head;
    let arr:T[] = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }

  getRandomList(minLen: number = 2, maxLen: number = 6, maxValue: number = 100) {
    const arr = randomList(minLen, maxLen, maxValue);
    arr.forEach((item) => this.append(item));
  }

}