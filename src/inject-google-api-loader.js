const loadScript = src => new Promise(resolve => {
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

// googleApiLoader.inject().then(gapi => {
//   gapi.load('client:auth2', () => console.log(gapi));
// }).catch(err => {
//   console.log(err);
// });
const inject = () => {
  const { gapi } = window;
  if(gapi) {
    return Promise.resolve(gapi);
  }
  return loadScript('https://apis.google.com/js/api.js').then(() => {
    return window.gapi;
  });
};

export default { inject };
