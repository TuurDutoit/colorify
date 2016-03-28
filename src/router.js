const $body = document.body;
const rmodes = /^(input|colors|about)$/i;
const rhashes = /^#(input|colors-.*|about)$/i;
const rroutes = /^(input|colors|about|\*)$/;
const callbacks = {
  "input": [],
  "colors": [],
  "about": [],
  "*": []
};

const routeListener = e => {
  if(rhashes.test(location.hash)) {
    let mode;
    let str;

    if(location.hash.slice(1, 7) === "colors") {
      mode = "colors";
      str = decodeURIComponent(location.hash.slice(8));
    }
    else {
      mode = location.hash.slice(1).toLowerCase();
    }

    $body.classList.remove("mode-input", "mode-colors", "mode-about");
    $body.classList.add("mode-"+mode);

    callbacks[mode].forEach(cb => {
      cb(str);
    });

    callbacks["*"].forEach(cb => {
      cb(mode, str);
    });
  }
  else {
    location.hash = "#input";
  }
}

export const addListener = (mode, cb) => {
  if(rroutes.test(mode)) {
    callbacks[mode].push(cb);
  }
}

export const go = (mode, str) => {
  if(rmodes.test(mode)) {
    if(mode === "colors") {
      mode += "-" + encodeURIComponent(str);
    }
    location.hash = "#"+mode;
  }
}

const init = () => {
  window.addEventListener("hashchange", routeListener);
  window.addEventListener("load", routeListener);
}

init();
