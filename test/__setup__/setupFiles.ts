declare let window: any;

window.requestAnimationFrame = (callback: any) => {
  setTimeout(callback, 0);
};

window.matchMedia = () => ({
  addListener: () => undefined,
  matches: false,
  removeListener: () => undefined,
});

export {};
