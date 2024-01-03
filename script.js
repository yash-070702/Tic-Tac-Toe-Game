const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const firstChoice=document.querySelector(".question");
const searchInput =document.querySelector("[data-searchInput]");
const searchForm=document.querySelector("[data-searchForm]");
const mainGame=document.querySelector(".tic-tac-toe")

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

firstChoice.classList.add("active1");
searchForm.classList.add("active");
firstPreference()

function initGame()
{
searchForm.classList.remove("active");
firstChoice.classList.remove("active1");
gameInfo.classList.add("active");
mainGame.classList.add("active");
    gameGrid=["","","","","","","","",""];
    
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";

        box.classList=`box box${index+1} `;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function firstPreference()
{
    firstChoice.classList.add("active1");
searchForm.classList.add("active");
gameInfo.classList.remove("active");
newGameBtn.classList.remove("active");
mainGame.classList.remove("active");
searchInput.value="";
    searchForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        let choice=searchInput.value;
    
        if(choice==="")
        return;
    else
    {
        if(choice==="X" || choice==="x")
    {
        currentPlayer="X";
        
    }
    
    else {
    currentPlayer="O";
    
    }
    initGame();
    }
    
        
      
     });
}


function swapTurn()
{

   
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else
    {
        currentPlayer="X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
let answer="";


winningPositions.forEach((position)=>{
    // all 3 boxes should be non empty and have exactly same value
if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!==""&& gameGrid[position[2]]!=="")
&& (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[2]]===gameGrid[position[1]]))
{
if(gameGrid[position[0]]==="X")
   answer="X";

   else
   answer="O";

   //disabled kro ointer event
   boxes.forEach((box)=>{
   box.style.pointerEvents="none";
   });

   boxes[position[0]].classList.add("win");
   boxes[position[1]].classList.add("win");
   boxes[position[2]].classList.add("win");
}

});

//loi jeet gya
if(answer!=="")
{
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;

}
//when there is no winner
let fillCount=0;
gameGrid.forEach((box)=>{
    if(box!=="")
    fillCount++;    
});
if(fillCount===9)
{
    gameInfo.innerText = `No One Win`;
    newGameBtn.classList.add("active");
}

}

function handleClick(index)
{
    if(gameGrid[index]==="") // yeh condition us index ko unclickable bna deti hai yaani ek baa rvalue daalti to reverse nhi hogi
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap turn 
        swapTurn();
        //koi jeet to nhi gya hai
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{               //   |\    /|     /\      ------  |\    |
    box.addEventListener("click",()=>{    //    | \  / |    /  \       |     | \   |
        handleClick(index);              //     |  \/  |   / __ \      |     |  \  |
    })                                  //      |      |  /      \     |     |   \ |
});                                    //       |      | /        \  __|___  |    \|

newGameBtn.addEventListener("click",firstPreference);
