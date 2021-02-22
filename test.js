import Box from './src/index.js'

// Box.log() takes as arguments the text, width of the box as characters and height.
// For now the height is determined by the character count to fit the lines inside the box so its basically useless.
Box.log(
    `Lorem ipsum dolor sit amet, consectetur adipiscing 
    elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua.`
);

console.log(
    Box.asString(
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`,
        50
    )
);



console.log(Box.new({
    corners: ['[', ']', '[', ']'],
    horizontal: '=',
    vertical: ':',
 
}).asString("This is custom box 2 Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur"))

console.log(
    Box.asString(
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ghnghn`,
 
    )
);
