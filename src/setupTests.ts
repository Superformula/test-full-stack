// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jest-webgl-canvas-mock";

if (typeof window.URL.createObjectURL === "undefined") {
  window.URL.createObjectURL = () => {
    // Do nothing
    // Mock this function for mapbox-gl to work
  };
}

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}

const localStorage = new LocalStorageMock();

// jest test environment expects these to exist
window.localStorage = localStorage;

let storage;
beforeEach(() => {
  storage = window.localStorage;
  window.localStorage = new LocalStorageMock();
});

afterEach(() => {
  window.localStorage = storage;
});

window.MutationObserver = require("mutation-observer");

class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}

window.Worker = Worker;

class mapboxgl {
  Map: () => {};
}
