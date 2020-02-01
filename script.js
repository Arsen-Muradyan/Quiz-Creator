var question = document.getElementById("question");
var answer = document.getElementById("answer");
var addBtn = document.getElementById("submit");
var container = document.getElementsByClassName("container");
var buttons = document.getElementsByClassName("buttons");
var showbtn = document.getElementById("show");
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var questions = [];
var error = "";
var success = "";
addBtn.onclick = function() {
  var obj = {
    question: question.value,
    answer: answer.value
  };
  var isExists = questions.filter(
    q => q.question.toLowerCase() == obj.question.toLowerCase()
  );
  if (isExists.length > 0) {
    error = "You Already Have This Question";
  } else if (question.value == "" || answer.value == "") {
    error = "All Fields Required";
    success = "";
  } else {
    questions.push(obj);
    success = "Question successfuly added";
  }
  if (error != "" && !container[0].contains(document.getElementById("error"))) {
    if (container[0].contains(document.querySelector(".alert"))) {
      document.querySelector(".alert").innerHTML = `<b>${error}!</b>`;
      document.querySelector(".alert").id = "error";
      document.querySelector(".alert").className = "red lighten-1 alert";
    } else {
      var alert = document.createElement("div");
      alert.id = "error";
      alert.className = "red lighten-1 alert";
      alert.innerHTML = `<b>${error}!</b>`;
      error = "";
    }
    container[0].insertBefore(alert, container[0].childNodes[2]);
  }
  // Success Message
  if (
    success != "" &&
    !container[0].contains(document.getElementById("success"))
  ) {
    // Check if already created alert box
    if (container[0].contains(document.querySelector(".alert"))) {
      document.querySelector(".alert").innerHTML = `<b>${success}!</b>`;
      document.querySelector(".alert").id = "success";
      document.querySelector(".alert").className = "green lighten-1 alert";
    } else {
      var alert = document.createElement("div");
      alert.id = "success";
      alert.className = "green lighten-1 alert";
      alert.innerHTML = `<b>${success}!</b>`;
      success = "";
    }
    // Insert Alert box
    container[0].insertBefore(alert, container[0].childNodes[2]);
  }
  // Clear inputs
  (question.value = ""), (answer.value = "");
  // Change "Add Question" button text and add "Show Quiz" button
  var btntxt = questions.length > 0 ? "Add one more Question" : "Add Question";
  addBtn.innerHTML = btntxt;
  if (
    questions.length > 0 &&
    !container[0].contains(document.getElementById("show"))
  ) {
    var btn = document.createElement("button");
    btn.className = "btn";
    btn.innerHTML = "Show Quiz";
    btn.id = "show";
    btn.onclick = showQuiz;
    buttons[0].insertBefore(btn, buttons[0].lastChild);
  }
};
// Show Quiz
function showQuiz() {
  section1.style.display = "none";
  section2.style.display = "block";
  questions.forEach(function(question, index) {
    var txt = `<div class="slide">
    <button class="btn" onclick="showAnswer(event, ${index})">Show Answer</button>
    <div class="card" style="height: 300px;">
      <div class="card-stacked">
        <div class="card-content center-align" style="padding: 13% 0;">
          <b style="font-size: 25px;">
            ${question.question}?
          </b>
        </div>
      </div>
    </div><i class="material-icons" style="cursor: pointer;" onclick="next()"
    >navigate_next</i></div>`;
    section2.getElementsByClassName("container")[0].innerHTML += txt;
  });
}
// Change Questions
function showAnswer(e, index) {
  e.target.nextElementSibling.getElementsByTagName("b")[0].innerText = "";
  e.target.nextElementSibling.className += " rotated";
  setTimeout(
    () =>
      (e.target.nextElementSibling.getElementsByTagName("b")[0].innerText =
        questions[index].answer),
    300
  );
}
var i = 0;
function next() {
  i++;
  var cards = document.getElementsByClassName("slide");
  for (let index = 0; index < cards.length; index++) {
    cards[index].style.display = "none";
    cards[index].getElementsByTagName("b")[0].innerHTML =
      questions[index].question;
    cards[index].getElementsByClassName("card")[0].classList.remove("rotated");
  }
  if (i >= cards.length) {
    i = 0;
  }
  cards[i].style.display = "block";
}
