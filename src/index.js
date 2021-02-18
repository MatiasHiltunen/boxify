////┘ 	┐ 	┌ 	└ 	┤ 	┴ 	┬ 	├ 	─ 	│ 	┼
class Box {
  #corners = ['┌', '┐', '└', '┘'];
  #horizontal = '─';
  #vertical = '│';
  height = 0;
  width = 0;
  #content;
  #originalContent;
  #result;
  #padding = {
    left: 1,
    right: 1,
    top: 1,
    bottom: 1,
  };

  constructor(custom) {
    this.#corners = custom?.corners ?? ['┌', '┐', '└', '┘'];
    this.#horizontal = custom?.horizontal ?? '─';
    this.#vertical = custom?.vertical ?? '│';
    this.height = custom?.height ?? 0;
    this.width = custom?.width ?? 0;
    this.#padding = custom?.padding ?? {
      left: 1,
      right: 1,
      top: 1,
      bottom: 1,
    };

    return this;
  }
  static #joinages = {
    '┌': '┬',
    '┐': '┬',
    '└': '┴',
    '┘': '┴',
    '─': '─',
    '│': '│',
  };

  get originalContent() {
    return this.#originalContent
  }
  set #h(val) {
    this.height = val;
  }
  set #w(val) {
    this.width = val;
  }
  set #c(val) {
    this.#content = val.split(/[\n\r\s]+/g);
    this.#originalContent = val;
  }

  get #maxCharacters() {
    return (this.height - 2) * (this.width - 2);
  }
  get #maxCharactersInLine() {
    return this.#maxCharacters / (this.height - 2);
  }
  #fill() {
    if (!this.#content || this.#content.length == 0) {
      return Array(this.width).join(' ');
    }
    let str = ' ';
    while (str.length <= this.#maxCharactersInLine) {
      if (
        !this.#content[0] ||
        str.length + this.#content[0].length >= this.#maxCharactersInLine
      )
        break;

      str += this.#content.shift() + ' ';
    }

    if (str.length < this.#maxCharactersInLine) {
      let toFill = this.#maxCharactersInLine - str.length;
      let l = ~~(toFill / 2);
      let r = toFill - l;
      str = str.padStart(str.length + l, ' ');
      str = str.padEnd(str.length + r, ' ');
    }

    return str + ' ';
  }
  #create() {
    let paddingX = this.#padding.left + this.#padding.right;
    let paddingY = this.#padding.top + this.#padding.bottom - 1;

    let top = Array(this.width + paddingX).fill(this.#horizontal);
    let bottom = [...top];

    top[0] = '\n' + this.#corners[0];
    top[this.width + paddingX] = this.#corners[1];
    top = top.join('');

    bottom[0] = '\n' + this.#corners[2];
    bottom[this.width + paddingX] = this.#corners[3];
    bottom = bottom.join('');

    let sides = Array(this.height + paddingY)
      .fill()
      .map((_, i) => {
        if (i === 0 || i <= this.#padding.top) {
          return (
            '\n' +
            this.#vertical +
            Array(this.width + paddingX).join(' ') +
            this.#vertical
          );
        }

        if (paddingY - 1 < 0 && (!this.#content || this.#content.length == 0))
          return '';

        return (
          '\n' +
          this.#vertical +
          Array(this.#padding.left + 1).join(' ') +
          this.#fill() +
          Array(this.#padding.right + 1).join(' ') +
          this.#vertical
        );
      });

    sides[0] = top;
    sides[this.height + paddingY] = bottom;

    return sides.join('') + '\n';
  }

  static log(text, w = 50, h = 3) {

    let logger = new Box()
    console.log(logger.asString(text, w, h))

  }

  log(text, w = 50, h = 3) {
    if (this.#result && !text) return console.log(this.#result);
    if (!text) text = '(empty log)';
    this.#h = h;
    this.#w = w;
    while (this.#maxCharacters < text.length) this.height++;

    this.#c = text.trim();
    this.#result = this.#create();
    console.log(this.#result);
  }

  save(text, w = 50, h = 3) {
    if (!text)
      text = this.#originalContent ? this.#originalContent : '(empty log)';
    this.#h = h;
    if (this.width == 0) this.#w = w;
    while (this.#maxCharacters < text.length) this.height++;

    this.#c = text.trim();
    this.#result = this.#create();
  }

  asString(text, w = 50, h = 3) {
    if (this.#result && !text) return this.#result;
    if (!text) text = '(empty log)';
    this.#h = h;
    this.#w = w;
    while (this.#maxCharacters < text.length) this.height++;

    this.#c = text.trim();
    this.#result = this.#create();
    return this.#result;
  }

  static asString(text, w = 50, h = 3) {
    let logger = new Box()
    return logger.asString(text, w, h)
  }

  static #joinToRight(leftBox, rightBox) {
    let rightBoxArr = rightBox.asString().split('\n');

    if (typeof leftBox != 'string') {
      leftBox = leftBox.asString();
    }

    return leftBox
      .split('\n')
      .map((a, i) => {
        if (a)
          return (
            a.slice(0, -1) +
            this.#joinages[rightBoxArr[i][0]] +
            rightBoxArr[i].slice(1)
          );
      })
      .join('\n');
  }

  static columnsFromBoxes(start, ...args) {
    let maxHeight = start.height;
    args.forEach((a) => {
      if (maxHeight < a.height) maxHeight = a.height;
    });

    start.save(start.originalContent, null, maxHeight);

    return args.reduce((a, c) => {
      c.save(c.originalContent, null, maxHeight);

      a = this.#joinToRight(a, c);
      return a;
    }, start);
  }

  static columns(...args) {
    let maxHeight = 0;

    const arr = args.map(a => {
      if (typeof a !== 'string') a.toString()
      let b = new Box()
      b.save(a)
      if (maxHeight < b.height) maxHeight = b.height;
      return b
    })

    let start = arr.shift()

    start.save(start.originalContent, null, maxHeight);

    return arr.reduce((a, c) => {
      c.save(c.originalContent, null, maxHeight);

      a = this.#joinToRight(a, c);
      return a;
    }, start);
  }

  static new(custom) {
    return new Box(custom)
  }
}

export default Box

/* let a = Box.new();
let b = Box.new();
let c = Box.new();

a.save('basdbab');
b.save(
  'asdasd asd kdjnkdjf kdjfnkjdf kdjnfkjdf kjdnfgkjndf kjndkjfng kjdnfkjndfg kjdnfgkjnkjdnfkgjn dkjfngkj dkfjng',
  35
);
c.save('basdbab');

console.log(b);

console.log(Box.columns(a,b,c))
 */