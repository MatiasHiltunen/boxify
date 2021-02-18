import Box from './src/index.js'

// Pass the customization object as parameter to Box.new({}) if you want to add custom sides
// Box.new() returns new Box object with its own properties
const custom = {
    corners: ['/*', ' ', ' ', '*/'],
    horizontal: ' ',
    vertical: '*',
    padding: {
        left: 10,
        right: 10,
        top: 3,
        bottom: 3,
    },
};

const customBox = Box.new(custom); // Or new Box(custom)
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


// Currently only default box support columns, providing custom object will most likely break it.
// Box.columns() is static function which takes array of Box instances as an argument
// save() method preserves the given string and after that instance of the Box can be logged with .log() method
const a = new Box();
a.save(`Test "save()" method. Lorem ipsum dolor sit amet, consectetur adipiscing 
elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua.`, 40);
a.log()
// Logs:
/* 
┌─────────────────────────────────────────┐
│                                         │
│   Test "save()" method. Lorem ipsum     │
│      dolor sit amet, consectetur        │
│    adipiscing elit, sed do eiusmod      │
│     tempor incididunt ut labore et      │
│          dolore magna aliqua.           │
└─────────────────────────────────────────┘
*/

const b = Box.new();
const c = new Box();

b.save(
    `Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua.`,
    50
);
c.save('This is just dummy filler', 15);

console.log(Box.columns(a, b, c))
// Logs:
/* 
┌─────────────────────────────────────────┬───────────────────────────────────────────────────┬────────────────┐
│                                         │                                                   │                │
│   Test "save()" method. Lorem ipsum     │     Lorem ipsum dolor sit amet, consectetur       │    This is     │
│      dolor sit amet, consectetur        │      adipiscing elit, sed do eiusmod tempor       │  just dummy    │
│    adipiscing elit, sed do eiusmod      │   incididunt ut labore et dolore magna aliqua.    │    filler      │
│     tempor incididunt ut labore et      │     Lorem ipsum dolor sit amet, consectetur       │                │
│          dolore magna aliqua.           │      adipiscing elit, sed do eiusmod tempor       │                │
│                                         │   incididunt ut labore et dolore magna aliqua.    │                │
│                                         │     Lorem ipsum dolor sit amet, consectetur       │                │
│                                         │      adipiscing elit, sed do eiusmod tempor       │                │
│                                         │   incididunt ut labore et dolore magna aliqua.    │                │
│                                         │                                                   │                │
└─────────────────────────────────────────┴───────────────────────────────────────────────────┴────────────────┘
*/