export default class Prop extends God {
  constructor(defaultValue) {
    this.priv.map = new UniqueMap();
    this.val = defaultValue;
  }

  connect(callback) {
    callback(this.val);
    const id = this.priv.map.add(callback);
    return id;
  }

  disconnect(id) {
    this.priv.map.delete(id);
  }

  runCallbacks() {
    for (const callback of this.priv.map.toArray()) {
      callback(this.val);
    }
  }

  set val(value) {
    this.priv.value = value;
    this.runCallbacks();
  }

  get val() {
    return this.priv.value;
  }
}
