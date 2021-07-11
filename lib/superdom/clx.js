class ClassListX extends God {
  constructor(classList) {
    super();
    this.priv.classList = classList;
  }

  find(string) {
    if (!this.priv.classList) return;

    const it = this.priv.classList.values();
    let val = it.next().value;
    while (val) {
      if (val.includes(string)) return val;
      val = it.next().value;
    }
  }
}

export function clx(classList) {
  return new ClassListX(classList);
}
