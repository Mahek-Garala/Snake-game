// Game constants
const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const musicsound = new Audio('music/music.mp3');
const movesound = new Audio('music/move.mp3');
let speed = 5;
let score = 0 ;
let lastPaintTime = 0;
let direction = { x: 0, y: 0 };
let snackArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

//Game function
function main(ctime) {
    window.requestAnimationFrame(main); //become  game loop
    if ((ctime - lastPaintTime) / 1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameengine();
}
function isCollide(sarr){
    // bump into yourself
    for(let i=1 ; i < snackArr.length; i++){
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true ;
        }
    }
    // bump into wall
    if(sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0){
        return true ;
    }
    return false;
}
function gameengine() {
    // 1: Updating the snake array 
    if(isCollide(snackArr)){
        gameoversound.play();
        musicsound.pause();
        direction = {x:0 , y:0};
        alert("Game over. Press any key to play again!!")
        snackArr =  [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
        scoreBox.innerHTML = "Score : " + score ;
    }

    //after eating food , increment the score and regenerate food
    if(snackArr[0].y === food.y && snackArr[0].x === food.x){
        foodsound.play();
        score += 1 ;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score ;
        snackArr.unshift({x: snackArr[0].x + direction.x , y: snackArr[0].y + direction.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a) * Math.random()) , y: Math.round(a+(b-a) * Math.random())}
    }

    //Moving the snack 
    for(let i = snackArr.length - 2 ; i >= 0 ; i--){
        snackArr[i+1] = {...snackArr[i]};  //for solve refrence problem
    }
    snackArr[0].x += direction.x;  //run alltime according game loop timing
    snackArr[0].y += direction.y;

    // 2: Display the snake 
    board.innerHTML = "";
    snackArr.forEach((e, index) => {
        snackElement = document.createElement('div');
        snackElement.style.gridRowStart = e.y;
        snackElement.style.gridColumnStart = e.x;
        if(index === 0){
            snackElement.classList.add('head');
        }
        else{
            snackElement.classList.add('snake');
        }
        board.appendChild(snackElement);
    });

    // 3: Display the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement); 

}




// Main logic
musicsound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);    //randor animation
window.addEventListener('keydown' , e => {
    direction = {x:0 , y:1} // game start
    movesound.play();
    switch(e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;
        default :
            break;
    }
});
