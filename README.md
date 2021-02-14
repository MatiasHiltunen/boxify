# boxify
Wrap JavaScript string in a box and log it or use it however you like. Written just for fun to pass time while waiting.

![Screenshot](https://github.com/MatiasHiltunen/boxify/blob/main/boxifyjs.PNG)

Couldn't let this be so added some customization options:
```javascript
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

```
