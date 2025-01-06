const score = JSON.parse(localStorage.getItem('score'))||  {
    wins:0,
    losses:0,
    ties:0
};
update_scores();
console.log(score);
function cm(){

    let computerMove =Math.random();
    if(computerMove>0 && computerMove<1/3){
        computerMove = 'Rock';
    }
    else if(computerMove>=1/3 && computerMove<2/3){
        computerMove = 'Paper';
    }
    else{
        computerMove='Scissors';
    }
    return computerMove;
}
let auto_id='';
let auto_playing = 0;
function auto_play(){
    const auto_play_btn = document.querySelector('.auto_play');
    if(!auto_playing){
        auto_play_btn.innerText="Stop Play";
        auto_play_btn.classList.add('auto_stop');
        auto_playing=1;
        auto_id = setInterval(function(){
            const input = cm();
            game(input);
        },1000);
    }
    else{
        auto_play_btn.innerText="Auto Play";
        auto_play_btn.classList.remove('auto_stop');
        clearInterval(auto_id);
        auto_playing=0;
    }

}
function game(input){
    const computerMove = cm();
    let result='';
    if(input===computerMove){
        result = 'Tie.';
    }
    else{
        if(input==='Rock'){
            if (computerMove=='Scissors'){
                result = 'You Win.';
            }
            else{
                result = 'You Lose.';
            }
        }
        else if(input==='Paper'){
            if (computerMove=='Scissors'){
                result = 'You Lose.';
            }
            else{
                result = 'You Win.';
            }
        }
        else{
            if (computerMove=='Paper'){
                result = 'You Win.';
            }
            else{
                result = 'You Lose.';
            }
        }
    }
    if(result==='You Win.'){
        score.wins+=1;
    }
    else if(result==='You Lose.'){
        score.losses+=1;
    }
    else{
        score.ties +=1;
    }
    update_scores();
    document.querySelector(".game-result").innerHTML = result;
    const MoveClass1 = result==='You Win.'?"move-img2":"move-img1";
    const MoveClass2 = result==='You Lose.'?"move-img2":"move-img1";
    document.querySelector(".game-moves").innerHTML = ` <img class=${MoveClass1} src="rps_icons/${input}.png"> <img class=${MoveClass2} src="rps_icons/${computerMove}.png">`;
    document.querySelector(".choices").innerHTML=`<p>You Chose</p>
    <p>Computer Chose</p>`;
    localStorage.setItem('score',JSON.stringify(score));
}
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='s'){
        game('Scissors');
    }
    else if(event.key==='r'){
        game('Rock');
    }
    else if(event.key==='p'){
        game('Paper');
    }
})
function update_scores(){
    const sc = document.querySelector('.current_scores')
    sc.innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}