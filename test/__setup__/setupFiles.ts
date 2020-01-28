import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

declare let window: any;

configure({ adapter: new Adapter() });

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

window.requestAnimationFrame = (callback: any) => {
  setTimeout(callback, 0);
};

window.matchMedia = () => ({
  addListener: () => undefined,
  matches: false,
  removeListener: () => undefined,
});
