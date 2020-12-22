document.addEventListener('DOMContentLoaded' , () => {
    const grid = document.querySelector('.grid') // Get the main class "grid"
    let squares = document.querySelectorAll('.grid div') // Get the div(s) inside the "grid" class. This will not effect other divs outside the "grid" class
    var width = 10
    const ScoreDis = document.querySelector('#score') // The score span tag
    const startBtn = document.querySelector('#startBtn') // The button to start/stop the game
    let nextRandom;
    let timerId;
    let score = 0;
    // Tetrominoes
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]


    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    console.log(tTetromino[0][0])

    let currentPosition = 4
    let currentRotation = 0

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]


    const draw = () => {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }
    draw()

    const undraw = () =>  {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''

        })
    }

    // undraw()

    const control = (e) => {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveLeft()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    const moveDown = () => {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    const freeze = () => {
        if (current.some(index => {
            squares[currentPosition + index + width].classList.contains('taken')
        })) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // New falling tetromino
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    const moveLeft = () => {
        // Move left, unless it is at the edge or being blocked
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        draw()
    }

    const isAtRight = () => {
        return current.some(index => (currentPosition + index + 1) % width === 0 )
    }

    const isAtLeft = () => {
        return current.some(index => (currentPosition + index) % width === 0)
    }

    const checkRotatedPostiton = (P) => {
        P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
        if ((P + 1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
            if (isAtRight()) {            //use actual position to check if it's flipped over to right side
                currentPosition += 1    //if so, add one to wrap it back around
                checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
            }
        }
        else if (P % width > 5) {
            if (isAtLeft()) {
                currentPosition -= 1
                checkRotatedPostiton(P)
            }
        }
    }

    const  rotate = () =>  {
        undraw()
        currentRotation++
        if (currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        checkRotatedPostiton()
        draw()
    }
    ///


    // Show tetro in min grid 
    const displaySquares = document.querySelectorAll('.mini-grid div')
    var displayWidth = 4
    var displayIndex = 0

    //the Tetrominos without rotations
    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
    ]


})