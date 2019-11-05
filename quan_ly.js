
// Hiển thị danh sách câu hỏi
var pageLength = Math.ceil(questions.length / 10) ; // lấy  số trang nếu mỗi trang có 10 câu
var indexPage = 1; 
// Hiển thị index page và LIst Question  
displayListIndexPage();
displayListQuestion();

// gắn số trang đc chọn 
function pageNumber(index) {
    indexPage = index;
    displayListQuestion();
    displayListIndexPage();
    
}
/// hiển thị số trang
function displayListIndexPage() {
    let list ="";
    for ( i = 0; i < pageLength; i++) {
        list += `<div class="index-page" id="page-${i+1}"  onclick="pageNumber(${i+1})">${i+1}</div>`;
    }
    document.getElementById("list-index-page").innerHTML = list;
    document.getElementById(`page-${indexPage}`).style.backgroundColor = "#666";
    
}

// Cách hiển thị list question
function displayListQuestion() {
    let list =`<tr> <td style="text-align: center;">STT</td><td style="text-align: center;">Title câu hỏi</td><td colspan="2" style="text-align: center;">Chức năng</td></tr>`;
    
    if (questions.length > indexPage * 10){
        for ( i = (indexPage * 10) - 10 ; i < (indexPage * 10) ;i++){
            if ( i% 2 === 0){
                list += `<tr class="hang-chan">
                    <td>${i+1}</td>
                    <td class="title" ><span  onmousemove="tooltipShow(${i});" onmouseout="tooltipOff(${i});" >${questions[i].title}</span><div class="pop-up" id="tool-tip-${i}"></div></td> 
                    <td><button  id="edit" class="btn btn-primary" onclick="editQuestion(${i});">Sửa</button></td><td> <button class="btn btn-danger" onclick="deleteQuestion(${i});">Xóa</button></td>
                </tr>`;
    
            }else {
                list += `<tr class="hang-le">
                <td>${i+1}</td>
                <td class="title"><span onmousemove="tooltipShow(${i});" onmouseout="tooltipOff(${i});" >${questions[i].title}</span><div class="pop-up" id="tool-tip-${i}"></div></td> 
                <td><button id="edit" class="btn btn-primary" onclick="editQuestion(${i});">Sửa</button></td><td> <button class="btn btn-danger" onclick="deleteQuestion(${i});">Xóa</button></td>
            </tr>`;
            }
        }
    }else{
        for ( i = (indexPage * 10) - 10 ; i < questions.length ;i++){
            if ( i% 2 === 0){
                list += `<tr class="hang-chan">
                    <td>${i+1}</td>
                    <td class="title" ><span  onmousemove="tooltipShow(${i});" onmouseout="tooltipOff(${i});" >${questions[i].title}</span><div class="pop-up" id="tool-tip-${i}"></div></td> 
                    <td><button id="edit" class="btn btn-primary" onclick="editQuestion(${i});">Sửa</button></td><td> <button class="btn btn-danger" onclick="deleteQuestion(${i});">Xóa</button></td>
                </tr>`;
    
            }else {
                list += `<tr class="hang-le">
                <td>${i+1}</td>
                <td class="title"><span onmousemove="tooltipShow(${i});" onmouseout="tooltipOff(${i});" >${questions[i].title}</span><div class="pop-up" id="tool-tip-${i}"></div></td> 
                <td><button id="edit" class="btn btn-primary" onclick="editQuestion(${i});">Sửa</button></td><td> <button class="btn btn-danger" onclick="deleteQuestion(${i});">Xóa</button></td>
            </tr>`;
            }
        }
    }
    document.getElementById("questions").innerHTML = list;
}

// Sửa câu hỏi
var indexQuestion = null;
function editQuestion(index) {
    document.getElementById("pop-up-edit-question").style.display = "block";
    indexQuestion = index;
    document.getElementById("title-question-edit").value = questions[indexQuestion].title;
    document.getElementById("level-edit").value = questions[indexQuestion].level;
    document.getElementById("major-edit").value = questions[indexQuestion].major;
    for (i = 0 ; i < 4 ; i++){
        document.getElementById(`answer-edit-${i}`).value = questions[indexQuestion].answers[i].content;
    }
}
// Xóa câu hỏi
function deleteQuestion(index) {
    questions.splice(index,1);
    displayListQuestion();
    
}
// Thêm câu hỏi
function submitEdit() {
    // let question = {};
    questions[indexQuestion].title = document.getElementById("title-question-edit").value;
    questions[indexQuestion].level = document.getElementById("level-edit").value ;
    questions[indexQuestion].major = document.getElementById("major-edit").value;
    for (i = 0 ; i < 4 ; i++){
        questions[indexQuestion].answers[i].content = document.getElementById(`answer-edit-${i}`).value ;
    }
    document.getElementById("pop-up-edit-question").style.display = "none";

    displayListQuestion();
}
//Show popUP add câu hỏi
function addQuestion() {
    document.getElementById("pop-up-add-question").style.display = "block";
    
}
// Submit adđ câu hỏi
function submitAdd() {
    let addQuestion = {
        title : "",
        major: '', 
        level: 0,
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
    addQuestion.level = document.getElementById("level-add").value;
    addQuestion.major = document.getElementById("major-add").value;
    for (i = 0 ; i < 4 ; i++){
        addQuestion.answers[i].content = document.getElementById(`answer-add-${i}`).value ;
    }
    questions.push(addQuestion);

    document.getElementById("pop-up-add-question").style.display = "none";

    displayListQuestion();
}
// Hiển thị toolTIP
var indexRight = null;
var answerAlphabet =["A","B","C","D"];
function tooltipShow(index) {
    for ( i = 0; i <questions.length;i++){
        if( i === index){
            for(j = 0; j < 4; j++){
                if( questions[index].answers[j].isRight === true ){
                    indexRight = j;
                }
            }
            document.getElementById(`tool-tip-${i}`).style.visibility = "visible";
            document.getElementById(`tool-tip-${i}`).innerHTML = `
                <span>Right Answer :${answerAlphabet[indexRight]}: ${questions[index].answers[indexRight].content}</span> <br>
                <span>Major :  ${questions[index].major}</span> <br>
                <span>Level :  ${questions[index].level}</span>
            `;
        }
    }
}
function tooltipOff(index) {
    for ( i = 0; i <questions.length;i++){
        if( i === index){
            document.getElementById(`tool-tip-${i}`).style.visibility = "hidden";
            document.getElementById(`tool-tip-${i}`).innerHTML = "";
        }
    }
}
