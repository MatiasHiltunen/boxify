/*
*-----------------------------*
|  Author: Matias Hiltunen.   |
|   Please do whatever you    |
|        want with it.        |
*-----------------------------*
*/
const Box = {
  corners: ['┌', '┐', '└', '┘'],
  horizontal: '─',
  vertical: '│',
  height: 0,
  width: 0,
  content: null,
  padding: {
    left: 1,
    rigth: 1,
    top: 1,
    bottom: 1,
  },
  set h(val) {
    this.height = val;
  },
  set w(val) {
    this.width = val;
  },
  set c(val) {
    this.content = val.split(/[\n\r\s]+/g);
  },
  set custom({ corners, horizontal, vertical, height, width, padding }) {
    this.corners = corners ?? this.corners;
    this.horizontal = horizontal ?? this.horizontal;
    this.vertical = vertical ?? this.vertical;
    this.height = height ?? this.height;
    this.width = width ?? this.width;
    this.padding = padding ?? this.padding;
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
    let paddingX = this.padding.left + this.padding.rigth;
    let paddingY = this.padding.top + this.padding.bottom - 1;

    let top = Array(this.width + paddingX).fill(this.horizontal);
    let bottom = [...top];

    top[0] = '\n' + this.corners[0];
    top[this.width + paddingX] = this.corners[1];
    top = top.join('');

    bottom[0] = '\n' + this.corners[2];
    bottom[this.width + paddingX] = this.corners[3];
    bottom = bottom.join('');

    let sides = Array(this.height + paddingY)
      .fill(' ')
      .map((a, i) => {
        if (i === 0 || i <= this.padding.top)
          return (
            '\n' +
            this.vertical +
            Array(this.width + paddingX).join(' ') +
            this.vertical
          );

        if (paddingY - 1 < 0 && (!this.content || this.content.length == 0)) {
          return '';
        }
        a =
          '\n' +
          this.vertical +
          Array(this.padding.left + 1).join(' ') +
          this.fill() +
          Array(this.padding.rigth + 1).join(' ') +
          this.vertical;
        return a;
      });

    sides[0] = top;
    sides[this.height + paddingY] = bottom;

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

    return this.create();
  },
  new(custom) {
    const newBox = Object.create(this);
    if (custom) newBox.custom = custom;
    return newBox;
  },
};

// Pass the customization object as parameter to Box.new({}) if you want to add custom sides
// Box.new() returns new Box object with its own properties
const custom = {
  corners: ['/*', ' ', ' ', '*/'],
  horizontal: ' ',
  vertical: '*',
  padding: {
    left: 10,
    rigth: 10,
    top: 3,
    bottom: 3,
  },
};

const customBox = Box.new(custom);
customBox.log(
  `Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Ut enim ad minim veniam, quis 
  nostrud exercitation ullamco laboris nisi ut aliquip
  ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum 
  dolore eu fugiat nulla pariatur. `
);
// Logs:
/*                                                                      
*                                                                     *
*                                                                     *
*                                                                     *
*              Lorem ipsum dolor sit amet, consectetur                *
*               adipiscing elit, sed do eiusmod tempor                *
*            incididunt ut labore et dolore magna aliqua.             *
*               Ut enim ad minim veniam, quis nostrud                 *
*            exercitation ullamco laboris nisi ut aliquip             *
*           ex ea commodo consequat. Duis aute irure dolor            *
*              in reprehenderit in voluptate velit esse               *
*              cillum dolore eu fugiat nulla pariatur.                *
*                                                                     *
*                                                                     *
*                                                                     *
                                                                      */

// Quick way to create new custom box
Box.new({
  corners: ['#', '#', '#', '#'],
  horizontal: '#',
  vertical: '#',
}).log("This is custom box 2")
// Logs:
/*
#####################################################
#                                                   #
#               This is custom box 2                #
#                                                   #
#####################################################
*/

// Box.log() takes as arguments the text, width of the box as characters and height.
// For now the height is determined by the character count to fit the lines inside the box so its basically useless.
Box.log(
  `Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua.`,
  40
);
// Logs:
/*
┌─────────────────────────────────────────┐
│                                         │
│      Lorem ipsum dolor sit amet,        │
│  consectetur adipiscing elit, sed do    │
│  eiusmod tempor incididunt ut labore    │
│        et dolore magna aliqua.          │
│                                         │
└─────────────────────────────────────────┘
*/

// Box.asString() returns the boxified string as a string. 
// Can be used for example with html <pre> tags to preserve the box form
console.log(
  Box.asString(
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`
  )
);
