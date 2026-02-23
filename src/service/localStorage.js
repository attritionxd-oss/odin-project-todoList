import StorageProcessor from "./storage.js";
class LocalStorageProcessor extends StorageProcessor {
  constructor() {
    super();
  }
}

LocalStorageProcessor.prototype.checkAvailability = function (type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
};

LocalStorageProcessor.prototype.clearStorage = function () {
  localStorage.clear();
};

LocalStorageProcessor.prototype.save = async function (key, data) {
  if (this.checkAvailability) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    console.error("localStorage error.");
  }
};

LocalStorageProcessor.prototype.load = async function (key) {
  if (this.checkAvailability) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    console.error("localStorage error.");
  }
};

export default LocalStorageProcessor;
