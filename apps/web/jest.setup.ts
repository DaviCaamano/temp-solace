// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';

//Mock Missing ClipboardEvent for JS-Dom
class ClipboardEventMock extends Event {
  clipboardData: {
    getData: jest.Mock<any, [string]>;
    setData: jest.Mock<any, [string, string]>;
  };

  constructor(type: string, eventInitDict?: EventInit) {
    super(type, eventInitDict);
    this.clipboardData = {
      getData: jest.fn(),
      setData: jest.fn(),
    };
  }
}
(globalThis as any).ClipboardEvent = ClipboardEventMock;

//Mock Missing DragEventMock for JS-Dom
class DragEventMock extends Event {
  dataTransfer: {
    getData: jest.Mock<any, [string]>;
    setData: jest.Mock<any, [string, string]>;
  };
  constructor(type: string, eventInitDict?: EventInit) {
    super(type, eventInitDict);
    this.dataTransfer = {
      getData: jest.fn(),
      setData: jest.fn(),
    };
  }
}
(globalThis as any).DragEvent = DragEventMock;

//Fix JsDom issue: [TypeError: target.getClientRects is not a function]
// @ts-ignore
Range.prototype.getBoundingClientRect = () => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});

Range.prototype.getClientRects = () => ({
  item: () => null,
  length: 0,
  [Symbol.iterator]: jest.fn(),
});

global.fetch = jest.fn();
