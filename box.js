// Author box used as example
/*
*-----------------------------*
|  Author: Matias Hiltunen.   |
|   Please do whatever you    |
|    want to do with it.      |
*-----------------------------*
*/
const Box = {
  corner: '*',
  horizontal: '-',
  vertical: '|',
  height: 0,
  width: 0,
  content: null,
  set h(val) {
    this.height = val;
  },
  set w(val) {
    this.width = val;
  },
  set c(val) {
    this.content = val.split(' ');
  },
  get maxCharacters() {
    return (this.height - 2) * (this.width - 2);
  },
  get maxCharactersInLine() {
    return this.maxCharacters / (this.height - 2);
  },
  fill() {
    if (!this.content || this.content.length == 0) {
      return Array(this.width).join(' ');
    }
    let str = ' ';
    while (str.length <= this.maxCharactersInLine) {
      if (
        !this.content[0] ||
        str.length + this.content[0].length >= this.maxCharactersInLine
      )
        break;

      str += this.content.shift() + ' ';
    }

    if (str.length < this.maxCharactersInLine) {
      let toFill = this.maxCharactersInLine - str.length;
      let l = ~~(toFill / 2);
      let r = toFill - l;
      str = str.padStart(str.length + l, ' ');
      str = str.padEnd(str.length + r, ' ');
    }

    return str + ' ';
  },
  create() {
    let topAndBottom = Array(this.width).fill(this.horizontal);
    topAndBottom[0] = '\n' + this.corner;
    topAndBottom[this.width] = this.corner;
    topAndBottom = topAndBottom.join('');

    let sides = Array(this.height)
      .fill(' ')
      .map((a, i) => {
        if (i === 0)
          return (
            '\n' + this.vertical + Array(this.width).join(' ') + this.vertical
          );
        if (!this.content || this.content.length == 0) {
          return '';
        }
        a = '\n' + this.vertical + this.fill() + this.vertical;
        return a;
      });

    sides[0] = topAndBottom;
    sides[this.height] = topAndBottom;

    return sides.join('') + '\n';
  },
  log(text = '(empty log)', w = 50, h = 3) {
    this.h = h;
    this.w = w;
    while (this.maxCharacters < text.length) this.height++;

    this.c = text.trim();
    console.log(this.create());
  },
  asString(text = '(empty log)', w = 50, h = 3) {
    this.h = h;
    this.w = w;
    while (this.maxCharacters < text.length) this.height++;

    this.c = text.trim();
 
    return this.create()
  },
};


Box.log(
  'Author: Matias Hiltunen. Please do whatever you want to do with it.',30
);

console.log(Box.asString('Author: Matias Hiltunen. Please do whatever you want to do with it.',30))
