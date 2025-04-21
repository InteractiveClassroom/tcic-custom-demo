TCIC.SDK.instance.promiseState('TStateComponentLoaded', true).then(() => {
    TCIC.SDK.instance.loadComponent('header-mic-switch-component', {
      display: 'block',
      width: '60px',
      height: '64px',
      top: '100px',
      right: '100px',
      bottom: '100px',
      left: '100px',
      position: 'fixed',
      zIndex: '9999999',
    }).then((dom) => {
      const el = dom.$el || dom;
      if (el instanceof HTMLElement) {
        document.body.appendChild(el);
      } else {
        console.warn('Loaded component is not a valid DOM element:', el);
      }
    });
  
    TCIC.SDK.instance.loadComponent('header-camera-switch-component', {
      display: 'block',
      width: '60px',
      height: '64px',
      top: '200px',
      right: '100px',
      bottom: '100px',
      left: '100px',
      position: 'fixed',
      zIndex: '9999999',
    }).then((dom) => {
      const el = dom.$el || dom;
      if (el instanceof HTMLElement) {
        document.body.appendChild(el);
      } else {
        console.warn('Loaded component is not a valid DOM element:', el);
      }
    });
  }
);
  