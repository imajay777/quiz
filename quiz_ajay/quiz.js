document.addEventListener("DOMContentLoaded", function(event) {
    const question = document.getElementById("question");
    const answers = document.getElementById("answers");
    const options = document.getElementsByClassName("answer");
    const nextQuestion = document.getElementById("next");
    const scoreDisplay = document.querySelector(".results-score");
    let score = document.getElementById("score");
    let timerDisplay = document.getElementById("time");
    let matches = [];
    let choices = [];
    let answer, currentTimer, playing, points, timer, total;
    let closeButton = document.getElementById("close-popup");
    let popup = document.getElementById("popup");

    let questionNum = -1;
  
    function openPopup() {
      popup.style.opacity = "1";
      overlay.style.opacity = "1";
      popup.style.display = "block";
      overlay.style.display = "block";
      closeButton.addEventListener("click", start);
    }
  
    function closePopup() {
      popup.style.opacity = "0";
      overlay.style.opacity = "0";
      popup.style.display = "none";
      overlay.style.display = "none";
    }
  

    let questions = [];
    

    questions = [{
      "question" : "q1",
      "options"  : ["ans1", "ans2", "ans3", "ans4"],
      "answer"   : "ans1"
  },
  {
      "question" : "q2",
      "options"  : ["ans1", "ans2", "ans3", "ans4"],
      "answer"   : "ans1"
  },
  {
      "question" : "q3",
      "options"  : ["ans1", "ans2", "ans3", "ans4"],
      "answer"   : "ans1"
  },
  {
      "question" : "q4",
      "options"  : ["ans1", "ans2", "ans3", "ans4"],
      "answer"   : "ans1"
  },
  {
      "question" : "q5",
      "options"  : ["ans1", "ans2", "ans3", "ans4"],
      "answer"   : "ans1"
  }];



  if (!location.pathname.match(/fullcpgrid/i)) {
        openPopup();
      } else {
        start();
      }


      // fetch('questions.json', {mode: 'no-cors'})
      // .then(resp => resp.json())
      // .then(data => {
       
      //   questions = data;
        
       
      //   if (!location.pathname.match(/fullcpgrid/i)) {
      //     openPopup();
      //   } else {
      //     start();
      //   }
      // });
    // At this point all the potential questions have been found.
    // console.log(matches);
  
    function start() {
      questionNum = -1;
      points = 0;
      score.innerHTML = points;
      currentTimer = 60;
      playing = true;
      getNewQuestion();
      timerDisplay.innerHTML = currentTimer;
      closePopup();
      timer = setInterval(function() {
        updateTimer();
      }, 1000);
    }
  
    function updateTimer() {
      currentTimer--;
      timerDisplay.innerHTML = currentTimer;
      if (currentTimer === 0) {
        playing = false;
        endGame();
      }
    }
  
    function endGame() {
      clearInterval(timer);
      playing = false;
      endRound();
      scoreDisplay.innerHTML = points;
      popup = document.getElementById("results");
      closeButton = document.getElementById("close-results");
      openPopup();
    }
  
    function getNewQuestion() {


      questionNum++;

      if(questionNum == questions.length)
      {
        endGame();
        return;
      }
        
      

      nextQuestion.style.opacity = 0;
      // Create a new array using the total of characters
      //const randomOrder = [...Array(total).keys()].map(num => num + 1);
      //randomOrder.sort(() => Math.random() - 0.5);

      let que = questions[questionNum];
      question.innerHTML = que.question;
       
      for (let i = 0; i < 4; i++) {
        options[i].innerHTML = que.options[i];
      }

      

    }
  
    function checkAnswer(choice, id) {
      if (choice == questions[questionNum].answer) {
        points += 10;
        options[id].classList.add("correct");
        answers.classList.add("disabled");
      } else {
        points -= 10;
        options[id].classList.add("wrong");
      }
      score.innerHTML = points;
      nextQuestion.style.opacity = 1;
    }
  
    function endRound() {
      for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("correct");
        options[i].classList.remove("wrong");
      }
      if (playing) {
        getNewQuestion();
      }
      answers.classList.remove("disabled");
    }
  
    answers.addEventListener("click", event => {
      const isButton = event.target.nodeName === "BUTTON";
      if (!isButton) {
        return;
      }
      let chosen = event.target.innerHTML;
      let id = event.target.id.slice(-1);
      checkAnswer(chosen, id);
    });
  
    closeButton.addEventListener("click", start);
    nextQuestion.addEventListener("click", endRound);
  });