interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  elements: () => T[];
  size: () => number;
  element: () => T | null;
}

export class Stack<T> implements IStack<T> {
  private storage: T[] = [];
  push = (item: T): void => {
    this.storage.push(item);
  }

  pop = (): void => {
    this.storage.pop();
  }

  clear = () => {
    this.storage = [];
  }

  elements = () => this.storage;

  size = () => this.storage.length;

  element = (): T | null => (this.size() > 0 ? this.storage[this.size() - 1] : null);
}