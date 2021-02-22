import assert, { doesNotMatch } from 'assert';
import Box from '../src/index.js'

class StrRand {
    static #str = "123456789qwertyuiopåöasdfghjklöäzxcvbnm!#¤%&/()=''\"          ";

    static #r() {
        return StrRand.#str[~~(Math.random() * StrRand.#str.length)];
    }

    static randomString(len) {
        if (!len) len = ~~(Math.random() * 1000)
        let st = '';
        while (st.length < len) st += StrRand.#r();
        return st;
    }
}



describe('Box', function () {
    describe('asString(text, width), min width 4, max width 200', function () {
        for (let i = 4; i <= 200; i++) {
            it(`should match given width ${i} + 1`, function () {
                const box = Box.asString(StrRand.randomString(), i)
                // console.log(box)
                assert.strictEqual(box.split('\n')[1].length, i + 1);
            });
        }
    });

    describe('Custom Box asString(text, width), test that box forms correctly with different padding settings and width', function () {
        for (let i = 4; i <= 100; i++) {
            it(`should match given width ${i} + 1`, function () {

                const custom = {
                    width: i,
                    padding: {
                        left: ~~(Math.random() * 10),
                        right: ~~(Math.random() * 10),
                        top: ~~(Math.random() * 10),
                        bottom: ~~(Math.random() * 10)
                    }
                }
                const box = (new Box(custom)).asString(StrRand.randomString(), i)

                let expectedLineLength = i + 1 + custom.padding.left + custom.padding.right


                let boxLines = box.split('\n')
                let height = boxLines.length
                let topLeft = boxLines[1][0]
                let topRight = boxLines[1][expectedLineLength - 1]
                let bottomLeft = boxLines[height - 2][0]
                let bottomRight = boxLines[height - 2][expectedLineLength - 1]
                let vertical = boxLines[2][0]
                let horizontal = boxLines[1][1]

                let topLine = boxLines[1]
                let bottomLine = boxLines[height - 2]
                let leftRow = boxLines.map(a => a[0])
                let rightRow = boxLines.map(a => a[expectedLineLength - 1])

                // X-axis length, Y-axis is automated
                describe('box line width match', function () {
                    it(`width expected: ${expectedLineLength}`, function () {
                        assert.strictEqual(boxLines[1].length, expectedLineLength);
                    })
                })

                describe('test that box borders are intact', function () {

                    it('should match correct character for each side of the box', function () {

                        topLine.split('').forEach((a, i) => {
                            if (i == 0 || i == expectedLineLength - 1) return
                            assert.strictEqual(a, horizontal)
                        });
                        bottomLine.split('').forEach((a, i) => {
                            if (i == 0 || i == expectedLineLength - 1) return
                            assert.strictEqual(a, horizontal)
                        });
                        leftRow.forEach((a, i) => {
                            if (i <= 1 || i > height - 3) return
                            assert.strictEqual(a, vertical)
                        });
                        rightRow.forEach((a, i) => {
                            if (i <= 1 || i > height - 3) return
                            assert.strictEqual(a, vertical)
                        });


                    })
                })

                describe('test that default box corners are in correct position', function () {
                    it('should match correct character for each corner of the box', function () {
                        assert.strictEqual(topLeft, '┌')
                        assert.strictEqual(topRight, '┐')
                        assert.strictEqual(bottomLeft, '└')
                        assert.strictEqual(bottomRight, '┘')
                        assert.strictEqual(vertical, '│')
                        assert.strictEqual(horizontal, '─')
                    })
                })
            });
        }
    });

});
