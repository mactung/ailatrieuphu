

// Đáp Án được chọn
var indexQuestion = 0;
var indexRight = null;
var level = null;
var titleAnswer = ["A","B","C","D"];
// Check xem đâu là câu trả lời đúng
function checkRightAnswer() {
    for(let i = 0; i < 4; i++){
        if(selectedQuestions[indexQuestion].answers[i].isRight === true){
            indexRight = i;
        }
    }
}
function setLevel(){
    level = selectedQuestions[indexQuestion].level;
}
function displayQuestion() {
    if (indexQuestion < 15){
        is5050 = false;
        isChecked = false;
        checkRightAnswer();
        setLevel();
        answerChecked(-1);
        removeAnimate();
        displayQuestionBoard();
        document.getElementById("question").style.display = "block";
        document.getElementById("question").classList.add('bounce');
        document.getElementById(`title-question`).innerHTML = selectedQuestions[indexQuestion].title ;
        for( let i = 0; i < 4; i++){
            document.getElementById(`answer-${i}`).innerHTML = `${titleAnswer[i]}.${selectedQuestions[indexQuestion].answers[i].content}`;
            // document.getElementById(`answer-${i}`).classList.add('bounce');
        }

    } else {
        document.getElementById("noti-wingame").style.display = "block";
    }

}
// Start Game 

function startGame() {
    getName();
    selectedQuestions = [];
    chon15cauhoi(questions);
    document.getElementById("audio-start").play();
    displayQuestion();
    document.getElementById("question").style.display = "block";
    document.getElementById("start-board").style.display = "none";
    document.getElementById("line-life").style.display = "inline-block";
    document.getElementById("main-title").innerHTML = `<div id="title-text">Chào mừng ${playerName} đến với game Ai Là Triệu Phú</div>`;
}
//Stop Game
function stopGame() {
    isChecked = true;
    document.getElementById("noti-endgame").style.display = "block";
}
// Chơi lại
function playAgain() {
    indexQuestion = 0;
    startGame();
    document.getElementById("noti-endgame").style.display = "none";  
}
// Hàm nhận index từ câu trả lời
var indexChecked = -1;
var isChecked = false;
function answerChecked(index) {
    if (isChecked === false){
        // Đổi màu câu trả lời đc chọn
        indexChecked = index;
        for (i = 0; i < 4; i++){
            if(i === indexChecked){
                // document.getElementById(`answer-${indexChecked}`).style.backgroundImage = "linear-gradient(#B76B27, #FFCB7A)";
                document.getElementById(`answer-${indexChecked}`).classList.remove('no-checked');
                document.getElementById(`answer-${indexChecked}`).classList.add('checked');
            }else {
                // document.getElementById(`answer-${i}`).style.backgroundImage = "linear-gradient(#102693, #3366FF)";
                document.getElementById(`answer-${i}`).classList.remove('checked');
                document.getElementById(`answer-${i}`).classList.add('no-checked');
            }
        }
    }
}
// Submit câu trả lời cuối cùng   
function submitAnswer() {
    isChecked = true;
    if (indexChecked === -1){
    alert("bạn chưa trả lời")
    isChecked = false;
    }else {
        checkAnswer();
    }
    
}
// Kiểm tra câu trả lời
function checkAnswer() {
    if (selectedQuestions[indexQuestion].answers[indexChecked].isRight === true){
        setTimeout(function(){
            document.getElementById(`answer-${indexChecked}`).classList.add('animated','tada');
            document.getElementById(`audio-true-1`).play();
            
        },level *1000);
        setTimeout(function(){indexQuestion++;displayQuestion();},level*1000 + 2000);
    }else {
        for ( i = 0; i < 4; i++){
            if (selectedQuestions[indexQuestion].answers[i].isRight === true ){
                setTimeout(function(){document.getElementById(`answer-${i}`).classList.add('animated','tada');},level *1000);
                setTimeout(function(){document.getElementById("noti-endgame").style.display = "block";}, level*1000 + 1000);
                break;
            }
        }

    }
}
function removeAnimate() {
    for ( i = 0; i < 4; i++){
        document.getElementById(`answer-${i}`).classList.remove('animated','tada');
        document.getElementById(`question`).classList.remove('bounce'); 

    }
}


// Function trợ giúp 50-50
var indexCut1 = null;
var indexCut2 = null;
var is5050 = false;


function lifeLine5050(){
    is5050 = true;
    document.getElementById("line-life-5050").style.display = "none";

    do{
        indexCut1 = Math.floor(Math.random()*4);
    } while (indexCut1 === indexRight);

    do{
        indexCut2 = Math.floor(Math.random()*4);
    } while (indexCut2 === indexRight || indexCut2 === indexCut1);
    
    for( let i = 0; i < 4; i++){
        if (i === indexCut1 || i === indexCut2 ){
            document.getElementById(`answer-${i}`).innerHTML = ``;
        }else{
            document.getElementById(`answer-${i}`).innerHTML = `${titleAnswer[i]}.${selectedQuestions[indexQuestion].answers[i].content}`;
        }
    }
}
// Hỏi ý kiến khán giả
function askViewer() {
    document.getElementById("ask-viewer-board-result").style.display ="block";
    let percentAnswer =[0,0,0,0];
    let j = 1;
    percentAnswer[0] = getRanDomPercent(50, 100);
    // console.log(indexRight);
    document.getElementById(`percent-column-${indexRight}`).style.height = `calc( 2 *${percentAnswer[0]}px)`;
    document.getElementById(`percent-number-${indexRight}`).innerHTML = `${percentAnswer[0]}`;
    if ( is5050 === true){  // Check xem đã sử dung 50-50 chưa
        percentAnswer[1] = 100 - percentAnswer[0]
        for ( i = 0; i < 4; i++){
            if( i != indexRight && i != indexCut1 && i !=indexCut2){ 
                document.getElementById(`percent-column-${i}`).style.height = `calc( 2 *${percentAnswer[1]}px)` ;
                document.getElementById(`percent-number-${i}`).innerHTML = `${percentAnswer[1]}`;
            }
        }
    }else {
        percentAnswer[1] = getRanDomPercent(0,100 - percentAnswer[0]);
        percentAnswer[2] = getRanDomPercent(0,100 - percentAnswer[0] - percentAnswer[1]);
        percentAnswer[3] = 100 - percentAnswer[0] - percentAnswer[1] - percentAnswer[2];
        
        for ( i = 0; i < 4; i++){
            if( i != indexRight){
                document.getElementById(`percent-column-${i}`).style.height = `calc( 2 *${percentAnswer[j]}px)`;
                document.getElementById(`percent-number-${i}`).innerHTML = `${percentAnswer[j]}`;
                j++; 
            }
        }
    }
}
function getRanDomPercent(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//check Index Professor
var indexProfessor = null;
function checkIndexProfes(indexProfes) {
    switch (indexProfes) {
        case 0:
            indexProfessor = "sport";
            break;
        case 1:
            indexProfessor = "life";
            break;
        case 2:
            indexProfessor = "science";
            break;
        case 3:
            indexProfessor = "art";
            break;
    }
}
// Hỏi ý kiến chuyên gia
function displayAskProfessor() {
    document.getElementById('ask-professor-board').style.display = "block";
}
function askProfessor(indexProfes) {
    checkIndexProfes(indexProfes);
    let indexRandomProfes = null;
    if ( selectedQuestions[indexQuestion].main === indexProfessor){
        console.log ( selectedQuestions[indexQuestion].answers[indexRight].content);
    }else { 
        do{
            indexRandomProfes = Math.floor(Math.random()*4);
        } while (indexRandomProfes === indexRight || indexRandomProfes === indexCut1 || indexRandomProfes === indexCut2);
        console.log ( selectedQuestions[indexQuestion].answers[indexRandomProfes].content);

    }
}

// Display question board
function displayQuestionBoard() {
    document.getElementById("question-board").style.display = "block";
    let list = "";
    money = [500,1000,2000,3000,5000,7000,10000,20000,30000,50000,100000,250000,500000,1000000,2000000];
    for (i = selectedQuestions.length - 1; i >= 0; i--){
        if ( i === indexQuestion){
            list += `<div style="background-color: yellow; color: black;" class="level-question"> &#9830 &#160 Câu ${i+1}: ${money[i]}$</div>`
        }else if ( (i+1) % 5 === 0){
            list += `<div style="color: yellow;" class="level-question"> &#9830 &#160 Câu ${i+1}: ${money[i]}$</div>`;
        }
        else{
            list += `<div class="level-question"> &#9830 &#160 Câu ${i+1}: ${money[i]}$</div>`;
        }
    }
    document.getElementById("question-board").innerHTML = list;
}

// Lấy tên người chơi
var playerName = "";
function getName() {
    playerName = document.getElementById("player-name").value;
}
function playIntro (){
    document.getElementById("audio-intro").play();
}