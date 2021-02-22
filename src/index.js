class Box {
  #corners;
  #horizontal;
  #vertical;
  #content;
  #originalContent;
  #result;
  #padding;
  #autoWidth;

  height;
  width;

  constructor(custom) {
    this.#corners = custom?.corners ?? ['┌', '┐', '└', '┘'];
    this.#horizontal = custom?.horizontal ?? '─';
    this.#vertical = custom?.vertical ?? '│';
    this.#padding = custom?.padding ?? {
      left: 1,
      right: 1,
      top: 1,
      bottom: 1,
    };
    this.#h = custom?.height ?? 0;
    this.#w = custom?.width ?? 0;
    this.#autoWidth = custom?.width == null;
  }

  // TODO: these can't be used with a custom box
  static #joinages = {
    '┌': '┬',
    '┐': '┬',
    '└': '┴',
    '┘': '┴',
    '─': '─',
    '│': '│',
  };

  get originalContent() {
    return this.#originalContent;
  }
  set #h(val) {
    this.height = val;
  }
  set #w(val) {

    this.width = val

  }
  set #c(val) {
    // TODO: Next step would be to support multiline strings in boxes, refactoring starts here.
    // TODO: auto-width can be determined here also.

    this.#content = val.split(/[\n\r\s]+/g);
    if (this.#autoWidth) {
      let auto = 0;
      for (let item of this.#content) {
        if (auto < item.length) auto = item.length;
      }
      this.#w = auto * 2;
    }
    this.#originalContent = val;
  }

  get #maxCharacters() {
    return (this.height - 2) * (this.width - 2);
  }
  get #maxCharactersInLine() {
    return ~~(this.#maxCharacters / (this.height - 2)) + 1;
  }
  #fill() {
    // Check if the content has been consumed already and return empty filler item
    // TODO: this could be removed if the check id done in create
    if (
      !this.#content ||
      this.#content.length == 0 ||
      this.#content[0] == null
    ) {
      return Array(this.width).join(' ');
    }
    let str = '';
    while (str.length <= this.#maxCharactersInLine) {

      // Check if the line width is exactly the width of the content item
      if (
        this.#content[0] != null &&
        str.length + this.#content[0].length === this.#maxCharactersInLine
      ) {
        str += this.#content.shift();
      }

      // Break too long string to match space in line
      if (
        this.#content[0] != null &&
        this.#content[0].length >= this.#maxCharactersInLine
      ) {
        let a = this.#content[0].slice(0, this.#maxCharactersInLine - 2) + '-';
        let b = this.#content[0].slice(this.#maxCharactersInLine - 2);

        this.#content.shift();
        this.#content.unshift(b);
        this.#content.unshift(a);
      }

      // Break when content has been consumed or the characters of the next item can't fit the line width
      if (
        !this.#content[0] ||
        str.length + this.#content[0].length >= this.#maxCharactersInLine
      ) {
        break;
      }

      // Add the item to line string
      str += this.#content.shift() + ' ';
    }


    // Pad the string to match the line width
    if (str.length < this.#maxCharactersInLine) {
      let toFill = this.#maxCharactersInLine - str.length;
      let l = ~~(toFill / 2);
      let r = toFill - l;
      str = str.padStart(str.length + l, ' ');
      str = str.padEnd(str.length + r, ' ');
    }

    return str + '';
  }
  #create() {
    const paddingX = this.#padding.left + this.#padding.right;
    const centerY = true;

    const emptyFiller = () => '\n' + this.#vertical + Array(this.width + paddingX).join(' ') + this.#vertical

    // Top padding
    const contentPaddingTop = Array(this.#padding.top)
      .fill()
      .map(emptyFiller);

    // Fill content
    let content = []
    while (this.#content.length > 0) {
      content.push(
        '\n' +
        this.#vertical +
        Array(this.#padding.left).fill(' ').join('') +
        this.#fill() +
        Array(this.#padding.right).fill(' ').join('') +
        this.#vertical
      )
    }

    // Fill leftover height, this has to be done when height has been given as param
    if (content.length < this.height - 1) {
      while (content.length < this.height - 1) {
        // TODO: add centerY to custom config options
        if (centerY) content.push(null)
        else content.push(emptyFiller())
      }
    }

    // Bottom padding
    const contentPaddingBottom = Array(this.#padding.bottom)
      .fill()
      .map(emptyFiller);

    if (centerY) {
      let count = 0;
      content = content.filter((a) => {
        if (!a) {
          count++;
          return false;
        }
        return true;
      });

      while (count > 0) {
        if (count % 2 == 0) {
          content.push(
            emptyFiller()
          );
        } else if (count > 1) {
          content.unshift(
            emptyFiller()
          );
        }
        --count;
      }
    }

    let sides = [...contentPaddingTop, ...content, ...contentPaddingBottom];


    // Add the borders and corners
    let top = Array(this.width + paddingX).fill(this.#horizontal);
    let bottom = [...top];

    top[0] = '\n' + this.#corners[0];
    top[this.width + paddingX] = this.#corners[1];
    top = top.join('');

    bottom[0] = '\n' + this.#corners[2];
    bottom[this.width + paddingX] = this.#corners[3];
    bottom = bottom.join('');

    sides.unshift(top);
    sides.push(bottom);

    return sides.join('') + '\n';
  }

  static log(...args) {
    let logger = new Box();
    console.log(logger.asString(...args));
  }

  log(...args) {
    console.log(this.asString(...args));
  }

  save(text, w, h = 0) {
    if (w) this.#autoWidth = false
    if (!text)
      text = this.#originalContent ? this.#originalContent : '(empty log)';
    this.#h = h;

    if (this.width == 0) this.#w = w;

    while (this.#maxCharacters < text.length) this.height++;
  

    this.#c = text.trim();
    this.#result = this.#create();
  }

  asString(text, w, h = 0) {

    if (w) this.#autoWidth = false
    if (this.#result && !text) return this.#result;
    if (!text) text = '(empty log)';
    this.#h = h;
    if (this.width == 0) this.#w = w;
    while (this.#maxCharacters < text.length) this.height++;


    this.#c = text.trim();
    this.#result = this.#create();

    return this.#result;
  }

  static asString(...args) {
    let logger = new Box();
    return logger.asString(...args);
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

    // Takes only strings as arguments
    if (args.length === 1) {
      return new Box().asString(args[0]);
    }

    let maxHeight = 0;

    const arr = args.map((a) => {
      if (typeof a == 'object') {
        /*let as = Object.entries(a);
        let map = as.map((c, i) => {
          return '|' + c[0] + ' : ' + c[1] + '|';
        });

        a = map.join(' ');*/
      } else {
        a = a.toString();
      }

      let b = new Box({
        width: this.widthConstraints(a),
      });
      b.save(a);

      if (maxHeight < b.height) maxHeight = b.height;
      return b;
    });

    let start = arr.shift();

    start.save(start.originalContent, null, maxHeight);

    return arr.reduce((a, c) => {
      c.save(c.originalContent, null, maxHeight);

      a = this.#joinToRight(a, c);
      return a;
    }, start);
  }

  static widthConstraints(content) {
    if (!content) return;
    let contentArr = content.split(/[\n\r\s]+/g);

    let auto = 7;
    for (let item of contentArr) {
      if (auto < item.length) auto = item.length;
    }

    return auto + 2;
  }

  static new(custom) {
    return new Box(custom);
  }
}

export default Box

