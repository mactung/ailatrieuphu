
// Hiển thị danh sách câu hỏi
// for (i = 0 ; i < questions.length; i++){
//     questions[i].ID = i+1;
// }
// // console.log(questions);
// let stringQuestion = JSON.stringify(questions);
// // document.getElementById("string").innerHTML = stringQuestion;
// console.log(stringQuestion);
var IDQuestion = null;
var pageLength = 0;
function getLenghtPage(arrayQuestions) {
    pageLength = Math.ceil(arrayQuestions.length / 10) ; // lấy  số trang nếu mỗi trang có 10 câu
    displayListIndexPage();
}
var indexPage = 1; 
var copyQuestions = questions;
// Hiển thị index page và LIst Question
displayListQuestion(questions);

// gắn số trang đc chọn 
function pageNumber(index) {
    indexPage = index;
    displayListQuestion(copyQuestions);
    
}
/// hiển thị số trang
function displayListIndexPage() {
    let list ="";
    for ( i = 0; i < pageLength; i++) {
        list += `<div class="index-page" id="page-${i+1}"  onclick="pageNumber(${i+1})">${i+1}</div>`;
    }
    document.getElementById("list-index-page").innerHTML = list;
    // document.getElementById(`page-${indexPage}`).style.backgroundColor = "#666";
    
}

// Cách hiển thị list question
function displayListQuestion(arrayQuestions) {
    getLenghtPage(arrayQuestions);
    
    let list =`<tr> <td style="text-align: center;">STT</td><td style="text-align: center;">Title câu hỏi</td><td colspan="2" style="text-align: center;">Chức năng</td></tr>`;
    
    if (arrayQuestions.length > indexPage * 10){
        for ( i = (indexPage * 10) - 10 ; i < (indexPage * 10) ;i++){
            list += `<tr>
                <td>${i+1}</td>
                <td class="title" ><span  onmousemove="tooltipShow(${arrayQuestions[i].ID});" onmouseout="tooltipOff(${arrayQuestions[i].ID});" >${arrayQuestions[i].title}</span><div class="pop-up" id="tool-tip-${arrayQuestions[i].ID}"></div></td> 
                <td><button  id="edit" class="btn btn-primary" onclick="editQuestion(${arrayQuestions[i].ID});">Sửa</button></td><td> <button class="btn btn-danger" onclick="deleteQuestion(${arrayQuestions[i].ID});">Xóa</button></td>
                </tr>`;
        }
    }else{
        for ( i = (indexPage * 10) - 10 ; i < arrayQuestions.length ;i++){
            list += `<tr>
            <td>${i+1}</td>
            <td class="title" ><span  onmousemove="tooltipShow(${arrayQuestions[i].ID});" onmouseout="tooltipOff(${arrayQuestions[i].ID});" >${arrayQuestions[i].title}</span><div class="pop-up" id="tool-tip-${arrayQuestions[i].ID}"></div></td> 
            <td><button  id="edit" class="btn btn-primary" onclick="editQuestion(${arrayQuestions[i].ID});">Sửa</button></td><td> <button class="btn btn-danger" onclick="deleteQuestion(${arrayQuestions[i].ID});">Xóa</button></td>
            </tr>`;

        }
    }
    document.getElementById("questions").innerHTML = list;
}

// Sửa câu hỏi
var indexQuestion = null;
var indexRight = null;
function editQuestion(idReturn) {
    indexQuestion = questions.findIndex(x => x.ID === idReturn);
    console.log(indexQuestion);
    $("#exampleModal-edit").modal('show');
    
    
    document.getElementById("title-question-edit").value = questions[indexQuestion].title;
    document.getElementById("level-edit").value = questions[indexQuestion].level;
    document.getElementById("major-edit").value = questions[indexQuestion].major;
    // document.getElementById("right-answer-edit").value = questions[indexQuestion].rightAnswer;
    for (i = 0 ; i < 4 ; i++){
        document.getElementById(`answer-edit-${i}`).value = questions[indexQuestion].answers[i].content;
        if (questions[indexQuestion].answers[i].isRight === true){
            document.getElementById("right-answer-edit").value = i;

        }
    }
}

// Thêm câu hỏi
function submitEdit(e) {
    // let question = {};
    e.preventDefault();
    
    questions[indexQuestion].title = document.getElementById("title-question-edit").value;
    questions[indexQuestion].level = Number(document.getElementById("level-edit").value) ;
    questions[indexQuestion].major = document.getElementById("major-edit").value;
    // questions[indexQuestion].rightAnswer = document.getElementById("right-answer-edit").value;
    indexRight = Number(document.getElementById("right-answer-edit").value)
    for (i = 0 ; i < 4 ; i++){
        questions[indexQuestion].answers[i].content = document.getElementById(`answer-edit-${i}`).value ;
        if (indexRight === i ){
            questions[indexQuestion].answers[i].isRight = true;
        }else {
            questions[indexQuestion].answers[i].isRight = false;
        }
    }

    $("#exampleModal-edit").modal('hide');

    filter();
       
}
// Xóa câu hỏi

function deleteQuestion(idReturn) {
    console.log(copyQuestions);
    let index = questions.findIndex(question => question.ID === idReturn);
    console.log(index);
    
    questions.splice(index,1);
    filter();
    // searchQuestion();


  
}
//Show popUP add câu hỏi
function addQuestion() {
    $("#exampleModal-add").modal('show');
    document.getElementById("title-question-add").value = '';
    document.getElementById("level-add").value = '';
    document.getElementById("major-add").value = '';
    // document.getElementById("right-answer-edit").value = questions[indexQuestion].rightAnswer;
    document.getElementById("right-answer-add").value = '';
    for (i = 0 ; i < 4 ; i++){
        document.getElementById(`answer-add-${i}`).value = '';

    }
    
    
}
// Submit adđ câu hỏi
function submitAdd(e) {
    e.preventDefault();
    console.log(e);


    findMaxID();
    let addQuestion = {
        title : "",
        major: '', 
        level: 0,
        ID: 0,
        rightAnswer: "",
        answers : [
            {
                content:'',
                isRight: true
            },
            {
                content:'',
                isRight: false
            },
            {
                content:'',
                isRight: false
            },
            {
                content:'',
                isRight: false
            }
        ]
    };
    addQuestion.title = document.getElementById("title-question-add").value;
    addQuestion.level = Number(document.getElementById("level-add").value);
    addQuestion.major = document.getElementById("major-add").value;
    addQuestion.ID = maxID + 1;
    indexRight = Number(document.getElementById("right-answer-add").value);
    
    for (i = 0 ; i < 4 ; i++){
        addQuestion.answers[i].content = document.getElementById(`answer-add-${i}`).value ;
        if (indexRight === i ){
            addQuestion.answers[i].isRight = true;
        }else {
            addQuestion.answers[i].isRight = false;
        }
    }
    questions.unshift(addQuestion);
    
    $("#exampleModal-add").modal('hide');

    filter();

}
// Hiển thị toolTIP

var answerAlphabet =["A","B","C","D"];
function tooltipShow(idReturn) {
    let index = questions.findIndex(x => x.ID === idReturn);

        for(j = 0; j < 4; j++){
            if( questions[index].answers[j].isRight === true ){
                indexRight = j;
            }
        }
        document.getElementById(`tool-tip-${idReturn}`).style.visibility = "visible";
        document.getElementById(`tool-tip-${idReturn}`).innerHTML = `
            <span style="color:#007BFF;">Right Answer : &#160 ${answerAlphabet[indexRight]}. ${questions[index].answers[indexRight].content}</span> <br>
            <span>Major :  ${questions[index].major}</span> <br>
            <span style="color:#DC3545;" >Level :  ${questions[index].level}</span>
        `;
        
    
}
function tooltipOff(idReturn) {
    document.getElementById(`tool-tip-${idReturn}`).style.visibility = "hidden";
    document.getElementById(`tool-tip-${idReturn}`).innerHTML = "";
}
// Filter câu hỏi
// var isLevelChecked = false;

var indexLevelChecked = 0;
var indexMajorChecked ='none'
function filter() {
    indexMajorChecked = document.getElementById("select-major").value;
    indexLevelChecked = Number(document.getElementById("select-level").value);

    let pushList = [];
    let copy = copyQuestions;
    if ( indexMajorChecked === 'none'){
        pageNumber(1);
        copyQuestions = questions;
        // displayListQuestion(copyQuestions);
        if ( indexLevelChecked === 0){
            pageNumber(1);
            // copyQuestions = questions;
            displayListQuestion(copyQuestions);
    
        }else {
            pageNumber(1);
            // console.log(questions);
            copyQuestions = copyQuestions.filter(question => question.level === indexLevelChecked);
            displayListQuestion(copyQuestions);
            
        }

    }else {
        pageNumber(1);
        copyQuestions = questions.filter(question => question.major === indexMajorChecked);
        // displayListQuestion(copyQuestions);
        if ( indexLevelChecked === 0){
            pageNumber(1);
            // copyQuestions = questions;
            displayListQuestion(copyQuestions);
    
        }else {
            pageNumber(1);
            // console.log(questions);
            copyQuestions = copyQuestions.filter(question => question.level === indexLevelChecked);
            displayListQuestion(copyQuestions);
            
        }
    }
    searchQuestion();
    
}
function searchQuestion(){
    let inputString = document.getElementById('search-bar').value;
    // let inputString = 'Vua'
    searchResult = [];
    for(let i = 0; i < copyQuestions.length; i++){
        if (copyQuestions[i].title.toLowerCase().includes(inputString.toLowerCase())){
            searchResult.push(copyQuestions[i]);
        }
    }
    displayListQuestion(searchResult);
    console.log(inputString)
    if(inputString = ''){
        displayListQuestion(copyQuestions);
    }
    
}

function sortByOldest(){
    for(let i = 0; i < copyQuestions.length; i++){
        for (let j = i+1 ; j < copyQuestions.length; j++){
            if (copyQuestions[i].ID > copyQuestions[j].ID){
                let temp = copyQuestions[i];
                copyQuestions[i] = copyQuestions[j];
                copyQuestions[j] = temp;
            }
        }
    }
    displayListQuestion(copyQuestions);
}

function sortByNewest(){
    for(let i = 0; i < copyQuestions.length; i++){
        for (let j = i+1 ; j < copyQuestions.length; j++){
            if (copyQuestions[i].ID < copyQuestions[j].ID){
                let temp = copyQuestions[i];
                copyQuestions[i] = copyQuestions[j];
                copyQuestions[j] = temp;
            }
        }
    }
    displayListQuestion(copyQuestions);
}

function sortByAtoZ(){
    for(let i = 0; i < copyQuestions.length; i++){
        for (let j = i+1 ; j < copyQuestions.length; j++){
            if (copyQuestions[i].title > copyQuestions[j].title){
                let temp = copyQuestions[i];
                copyQuestions[i] = copyQuestions[j];
                copyQuestions[j] = temp;
            }
        }
    }
    console.log(copyQuestions);
    displayListQuestion(copyQuestions);
}

function sortByZtoA(){
    for(let i = 0; i < copyQuestions.length; i++){
        for (let j = i+1 ; j < copyQuestions.length; j++){
            if (copyQuestions[i].title < copyQuestions[j].title){
                let temp = copyQuestions[i];
                copyQuestions[i] = copyQuestions[j];
                copyQuestions[j] = temp;
            }
        }
    }
    console.log(copyQuestions);
    displayListQuestion(copyQuestions);
}

function sortQuestion(){
    let sortType = document.getElementById('sort').value;
    switch(sortType){
        case 'oldest':
            sortByOldest();
            break;
        case 'newest':
            sortByNewest();
            break;
        case 'a-z':
            sortByAtoZ();
            break;
        case 'z-a':
            sortByZtoA();
            break;
    }
}
// tìm max ID
var maxID = 0;
function findMaxID() {
    for ( let i = 0; i < questions.length ; i++){
        if (maxID < questions[i].ID){
            maxID = questions[i].ID;
        }
    }
    console.log(maxID);
}
function closeAddBoard() {
    document.getElementById("pop-up-add-question").style.display = "none"
}
function closeEditBoard() {
    document.getElementById("pop-up-edit-question").style.display = "none"
}