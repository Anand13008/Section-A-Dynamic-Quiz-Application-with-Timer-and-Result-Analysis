const questions = {
    Easy: [
      { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
      { q: "5 - 3 = ?", options: ["120", "2", "12"], answer: "2" },
      { q: "10 / 2 = ?", options: ["3", "5", "4"], answer: "5" }
    ],
    Medium: [
      { q: "17 + 31 =?", options: ["48", "49", "50"], answer: "48" },
      { q: "Square root of 144?", options: ["1111", "12", "122"], answer: "12" },
      { q: "What is 15% of 200?", options: ["26", "30", "78"], answer: "30" }
    ]
  };
  
  let current = 0;
  let score = 0;
  let qList = [];
  let timer = null;
  let timeLeft = 15;
  
  const questionEl = document.getElementById("Question");
  const optionsEl = document.getElementById("Options");
  const nextBtn = document.getElementById("nextBUTTON");
  const submitBtn = document.getElementById("SubmitBUTTON");
  const setup = document.getElementById("setup");
  const quizContainer = document.getElementById("Quiz_Container");
  const result = document.getElementById("Result");
  const scoreEl = document.getElementById("Score");
  const detailsEl = document.getElementById("Details");
  const timerDiv = document.getElementById("timerDiv");
  
  document.getElementById("startBUTTON").onclick = function () {
    let difficulty = document.getElementById("Difficulty").value;
    qList = questions[difficulty];
    current = 0;
    score = 0;
    setup.style.display = "none";
    quizContainer.style.display = "block";
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    showQuestion();
  };
  
  function showQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    timerDiv.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      timerDiv.textContent = `Time Left: ${timeLeft}s`;
      if (timeLeft === 0) {
        clearInterval(timer);
        autoNextOrSubmit();
      }
    }, 1000);
  
    clearOptions();
    let q = qList[current];
    questionEl.innerText = q.q;
  
    q.options.forEach((option) => {
      let btn = document.createElement("button");
      btn.innerText = option;
      btn.onclick = function () {
        selectAnswer(option);
      };
      optionsEl.appendChild(btn);
    });
  
    nextBtn.style.display = current < qList.length - 1 ? "inline" : "none";
    submitBtn.style.display = current === qList.length - 1 ? "inline" : "none";
    nextBtn.disabled = true;
    submitBtn.disabled = true;
  }
  
  function clearOptions() {
    optionsEl.innerHTML = "";
  }
  
  function selectAnswer(selected) {
    let correct = qList[current].answer;
    if (selected === correct) {
      score++;
    }
    Array.from(optionsEl.children).forEach((btn) => {
      btn.disabled = true;
      if (btn.innerText === correct) {
        btn.style.backgroundColor = "lightgreen";
      }
    });
  
    nextBtn.disabled = current < qList.length - 1 ? false : true;
    submitBtn.disabled = current === qList.length - 1 ? false : true;
    clearInterval(timer);
  }
  
  nextBtn.onclick = function () {
    current++;
    nextBtn.disabled = true;
    showQuestion();
  };
  
  submitBtn.onclick = function () {
    clearInterval(timer);
    quizContainer.style.display = "none";
    result.style.display = "block";
    scoreEl.innerText = `You got ${score} out of ${qList.length} correct.`;
    let detailText = qList
      .map((q, i) => `Q${i + 1}: ${q.q} | Answer: ${q.answer}`)
      .join("<br>");
    detailsEl.innerHTML = detailText;
  };
  
  function autoNextOrSubmit() {
    Array.from(optionsEl.children).forEach((btn) => (btn.disabled = true));
    if (current < qList.length - 1) {
      current++;
      nextBtn.disabled = true;
      showQuestion();
    } else {
      submitBtn.disabled = true;
      submitBtn.click();
    }
  }
  