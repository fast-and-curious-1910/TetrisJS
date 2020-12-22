document.addEventListener('DOMContentLoaded' , () => {
    const grid = document.querySelector('.grid') // Get the main class "grid"
    let squares = document.querySelectorAll('.grid div') // Get the div(s) inside the "grid" class. This will not effect other divs outside the "grid" class
    var width = 10
    const ScoreDis = document.querySelector('#score') // The score span tag
    const startBtn = document.querySelector('#startBtn') // The button to start/stop the game

    // Tetrominoes
    var lTetro = [
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
        [width,width*2,width*2+1,width*2+2]
    ]
    console.log(lTetro)
})