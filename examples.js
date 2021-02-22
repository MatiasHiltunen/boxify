import Box from './src/index.js'

// Box.log() takes as arguments the text, width of the box as characters and height.
// For now the height is determined by the character count to fit the lines inside the box so its basically useless.
Box.log(
    `Lorem ipsum dolor sit amet, consectetur adipiscing 
    elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua.`
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
    corners: ['[', ']', '[', ']'],
    horizontal: '=',
    vertical: ':',
    width: 40
}).log("This is custom box 2 Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur")
// Logs:
/*
#####################################################
#                                                   #
#               This is custom box 2                #
#                                                   #
#####################################################
*/



// Box.asString() returns the boxified string as a string. 
// Can be used for example with html <pre> tags to preserve the box form
console.log(
    Box.asString(
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`
    )
);


// Currently only default box support columns, providing custom object will most likely break it.
// Box.columns() is static function which takes n number of strings as an arguments

console.log(
    Box.columns(
        "Column 1",
        "Column 2",
        `Currently only default box support columns, 
        providing custom object will most likely break it. 
        Box.columns() is static function which takes n number of strings as an arguments`,
    ),
)

// Logs:
/* 
┌──────────┬──────────┬────────────────┐
│          │          │                │
│          │          │ Currently only │
│          │          │  default box   │
│          │          │    support     │
│          │          │   columns,     │
│          │          │   providing    │
│          │          │ custom object  │
│          │          │   will most    │
│ Column 1 │ Column 2 │ likely break   │
│          │          │      it.       │
│          │          │ Box.columns()  │
│          │          │   is static    │
│          │          │ function which │
│          │          │ takes n number │
│          │          │ of strings as  │
│          │          │ an arguments   │
│          │          │                │
└──────────┴──────────┴────────────────┘
*/

console.log(Box.columns("ports:", 8000, 8080))
// Box.columnsFromBoxes() static function takes n number Box instances as an argument
// columnsFromBoxes gives more options for customization of the columns
const a = new Box();
// save() method preserves the given string and can be later logged with .log() method
a.save(`Test "save()" method. Lorem ipsum dolor sit amet consectetur adipiscing 
elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua. dfvdfvdfv ldkmlkfm öflg,öl, fgbfgbfb`, 50);
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
  dolore magna aliqua. `,
    50
);
c.save('This is just dummy filler', 15);

console.log(Box.columnsFromBoxes(a, b, c))
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