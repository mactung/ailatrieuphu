
displayQuestionBoard1();
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
        isSubmit = false;
        is5050 = false;
        isChecked = false;
        indexCut1 = null;
        indexCut2 = null;
        checkRightAnswer();
        setLevel();
        answerChecked(-1);
        removeAnimate();
        displayQuestionBoard();
        document.getElementById("ask-viewer-board-result").style.display = "none";
        document.getElementById("ask-professor-board").style.display = "none";
        document.getElementById("question").style.display = "block";
        document.getElementById("question").classList.add('bounce');
        document.getElementById(`title-question`).innerHTML = selectedQuestions[indexQuestion].title ;
        for( let i = 0; i < 4; i++){
            document.getElementById(`answer-${i}`).innerHTML = `<span>${titleAnswer[i]}. &#160 ${selectedQuestions[indexQuestion].answers[i].content}</span>`;
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
    document.getElementById("stop-game").style.display = "inline";
    document.getElementById("start-board").style.display = "none";
    
    // document.getElementById("line-life").style.display = "inline-block";
    document.getElementById("main-title").innerHTML = `<div id="title-text">Chào mừng ${playerName} đến với game Ai Là Triệu Phú</div>`;
}
//Stop Game
function stopGame() {
    isChecked = true;
    document.getElementById("noti-endgame").style.display = "block";
    displayMoney(indexQuestion-1);
}
// Chơi lại
function playAgain() {
    // indexQuestion = 0;
    // startGame();
    // document.getElementById("noti-endgame").style.display = "none";  
    location.reload();
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
var isSubmit = false;
function submitAnswer() {
    if (isSubmit === false){
        isChecked = true;
        if (indexChecked === -1){
            alert("bạn chưa trả lời")
            isChecked = false;
        }else {
            checkAnswer();
            isSubmit = true;
        }
    }
    
}
// Kiểm tra câu trả lời
function checkAnswer() {
    if (selectedQuestions[indexQuestion].answers[indexChecked].isRight === true){
        setTimeout(function(){
            document.getElementById(`answer-${indexChecked}`).classList.add('blink-color');
            document.getElementById(`answer-${indexChecked}`).style.backgroundColor = "#4CA419";
            // let indexAudioTrue = ;
            // console.log(indexAudioTrue);
            
            document.getElementById(`audio-true-${getRanDomPercent(1,3)}`).play();
            
        },level *1000);
        setTimeout(function(){indexQuestion++;displayQuestion();},level*1000 + 2000);
    }else {
        for ( i = 0; i < 4; i++){
            if (selectedQuestions[indexQuestion].answers[i].isRight === true ){
                setTimeout(function(){document.getElementById(`answer-${i}`).classList.add('blink-color');},level *1000);
                setTimeout(function(){document.getElementById("noti-endgame").style.display = "block";displayMoney(indexQuestion);}, level*1000 + 1000);
                break;
            }
        }

    }
}
function removeAnimate() {
    for ( i = 0; i < 4; i++){
        document.getElementById(`answer-${i}`).classList.remove('blink-color');
        document.getElementById(`question`).classList.remove('bounce'); 

    }
}


// Function trợ giúp 50-50
var indexCut1 = null;
var indexCut2 = null;
var is5050 = false;


function lifeLine5050(){
    is5050 = true;
    // document.getElementById("line-life-5050").style.display = "none";
    document.getElementById("line-life-5050").onclick = "";
    document.getElementById("line-life-5050").innerHTML = `<img src="img/Classic5050-use.png" width="100px">`;

    do{
        indexCut1 = Math.floor(Math.random()*4);
    } while (indexCut1 === indexRight);

    do{
        indexCut2 = Math.floor(Math.random()*4);
    } while (indexCut2 === indexRight || indexCut2 === indexCut1);
    
    for( let i = 0; i < 4; i++){
        if (i === indexCut1 || i === indexCut2 ){
            document.getElementById(`answer-${i}`).innerHTML = `${titleAnswer[i]}.`;
        }else{
            document.getElementById(`answer-${i}`).innerHTML = `${titleAnswer[i]}. &#160 ${selectedQuestions[indexQuestion].answers[i].content}`;
        }
    }
}
// Hỏi ý kiến khán giả
function askViewer() {
    document.getElementById("ask-viewer-board-result").style.display ="block";

    document.getElementById("ask-viewer").onclick = "";
    document.getElementById("ask-viewer").innerHTML = `<img src="img/ClassicATA-use.png" width="100px">`;
    let percentAnswer =[0,0,0,0];
    let j = 1;
    percentAnswer[0] = getRanDomPercent(40, 100);
    // console.log(indexRight);
    document.getElementById(`percent-column-${indexRight}`).style.width = `calc( 2 *${percentAnswer[0]}px)`;
    document.getElementById(`percent-number-${indexRight}`).innerHTML = `${percentAnswer[0]}`;
    if ( is5050 === true){  // Check xem đã sử dung 50-50 chưa
        percentAnswer[1] = 100 - percentAnswer[0]
        for ( i = 0; i < 4; i++){
            if( i != indexRight && i != indexCut1 && i !=indexCut2){ 
                document.getElementById(`percent-column-${i}`).style.width = `calc( 2 *${percentAnswer[1]}px)` ;
                document.getElementById(`percent-number-${i}`).innerHTML = `${percentAnswer[1]}`;
            }
        }
    }else {
        percentAnswer[1] = getRanDomPercent(0,100 - percentAnswer[0]);
        percentAnswer[2] = getRanDomPercent(0,100 - percentAnswer[0] - percentAnswer[1]);
        percentAnswer[3] = 100 - percentAnswer[0] - percentAnswer[1] - percentAnswer[2];
        
        for ( i = 0; i < 4; i++){
            if( i != indexRight){
                document.getElementById(`percent-column-${i}`).style.width = `calc( 2 *${percentAnswer[j]}px)`;
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
//Closse 
function closeAskViewerBoard(){
    document.getElementById("ask-viewer-board-result").style.display = "none";

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
    document.getElementById("ask-professor").onclick = "";
    document.getElementById("ask-professor").innerHTML = `<img src="img/ClassicPAF-use.png" width="100px">`;
}
function askProfessor(indexProfes) {
    document.getElementById("sport").onclick = "";
    document.getElementById("life").onclick = "";
    document.getElementById("science").onclick = "";
    document.getElementById("art").onclick = "";
    checkIndexProfes(indexProfes);
    let indexRandomProfes = null;
    if ( selectedQuestions[indexQuestion].major === indexProfessor){
        console.log ( selectedQuestions[indexQuestion].answers[indexRight].content);
        document.getElementById("suggest-answer").innerHTML =  selectedQuestions[indexQuestion].answers[indexRight].content ;
    }else { 
        do{
            indexRandomProfes = Math.floor(Math.random()*4);
        } while ( indexRandomProfes === indexCut1 || indexRandomProfes === indexCut2);
        console.log ( selectedQuestions[indexQuestion].answers[indexRandomProfes].content);
        document.getElementById("suggest-answer").innerHTML =  selectedQuestions[indexQuestion].answers[indexRandomProfes].content ;


    }
}

//Closse 
function closeAskProfessorBoard(){
    document.getElementById("ask-professor-board").style.display = "none";

}
// Display question board
var money = [500,1000,2000,3000,5000,7000,10000,20000,30000,50000,100000,250000,500000,1000000,2000000]; 
function displayQuestionBoard() {
    document.getElementById("question-board").style.display = "block";
    let list = "";
    for (i = selectedQuestions.length - 1; i >= 0; i--){
        if ( i === indexQuestion){
            list += `<div style="background-color: #F9CA3B; color: black; border-radius : 10px;" class="level-question"> &#9830 &#160 Câu ${i+1}:&#160$ ${money[i]}</div>`
        }else if ( (i+1) % 5 === 0){
            list += `<div style="color: yellow;" class="level-question"> &#9830 &#160 Câu ${i+1}: &#160 $ ${money[i]}</div>`;
        }
        else{
            list += `<div class="level-question"> &#9830 &#160 Câu ${i+1}:&#160 $ ${money[i]}</div>`;
        }
    }
    document.getElementById("question-board").innerHTML = list;
}

function displayQuestionBoard1() {
    document.getElementById("question-board").style.display = "block";
    let list = "";
    money = [500,1000,2000,3000,5000,7000,10000,20000,30000,50000,100000,250000,500000,1000000,2000000];
    for (i = selectedQuestions.length - 1; i >= 0; i--){
        if ( (i+1) % 5 === 0){
            list += `<div style="color: yellow;" class="level-question"> &#9830 &#160 Câu ${i+1}: &#160 $ ${money[i]}</div>`;
        }
        else{
            list += `<div class="level-question"> &#9830 &#160 Câu ${i+1}:&#160 $ ${money[i]}</div>`;
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
// In số tiền nhận được
function displayMoney(index) {
    document.getElementById("money").innerHTML = `$${money[index]} `;
}