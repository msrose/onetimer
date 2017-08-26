const loadScriptIntoDOM = src => new Promise(resolve => {
  // https://developers.google.com/drive/v3/web/quickstart/js
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = src;
  script.onload = function() {
    this.onload = function() {};
    resolve();
  };
  script.onreadystatechange = function() {
    if(this.readyState === 'complete') {
      this.onload();
    }
  };
  document.body.appendChild(script);
});

let loadPromise = null;

const get = () => {
  if(!loadPromise) {
    throw new Error('gapi must be injected before calling `get`');
  }
  return loadPromise.then(() => window.gapi);
};

const inject = () => {
  loadPromise = loadPromise || loadScriptIntoDOM('https://apis.google.com/js/api.js');
};

export default { inject, get };
