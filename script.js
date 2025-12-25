// filepath: script.js
// ตัวแปรเก็บตัวเลขลับ
let secretNumber = 0;
// ตัวแปรนับจํานวนครั้งที่ทาย
let attemptCount = 0;

// ================== High Score ==================
function loadHighScore() {
  let highScore = localStorage.getItem("highScore");
  const highScoreElement = document.getElementById("highScore");

  if (!highScoreElement) return;

  if (highScore === null) {
    highScoreElement.textContent = "High Score: -";
  } else {
    highScoreElement.textContent = "High Score: " + highScore + " ครั้ง";
  }
}

// ฟังก์ชันเริ่มเกมใหม่
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;
  updateDisplay();
  loadHighScore();
}
// ฟังก์ชันตรวจสอบการทาย
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");

  // Validation: ตรวจสอบว่าใส่ตัวเลขหรือไม่
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลข!
 </div>
 `;
    return;
  }

  // Validation: ตรวจสอบว่าอยู่ในช่วง 1-100 หรือไม่
  if (guessValue < 1 || guessValue > 100) {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100!
 </div>
 `;
    return;
  }

  attemptCount++; // เพิ่มตรงนี้

  if (guessValue === secretNumber) {
    resultContainer.innerHTML = `
 <div class="alert alert-success" role="alert">
 <h5>✓ ถูกต้อง!</h5>
 <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
 </div>
 `;
    // ===== เพิ่ม High Score ตรงนี้ =====
    let bestScore = localStorage.getItem("highScore");

    if (bestScore === null || attemptCount < parseInt(bestScore)) {
      localStorage.setItem("highScore", attemptCount);
      document.getElementById("highScore").textContent =
        "High Score: " + attemptCount + " ครั้ง";
    }
    // =====  รีเซ็ตเกมอัตโนมัติเมื่อทายถูก =====
    initializeGame(); // ← ตรงนี้สำคัญ
    return; // ออกจากฟังก์ชันทันที

    // ===== เพิ่ม High Score ตรงนี้ =====
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = `
 <div class="alert alert-warning" role="alert">
 ↓ ตัวเลขสูงไป
 </div>
 `;
  } else {
    resultContainer.innerHTML = `
 <div class="alert alert-info" role="alert">
 ↑ ตัวเลขตํ่าไป
 </div>
 `;
  }
  updateDisplay();
  guessInput.value = "";
  guessInput.focus();
}
// ฟังก์ชันอัปเดตจํานวนครั้ง
function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}
// ฟังก์ชันเริ่มเกมใหม่
function resetGame() {
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();

  // รีเซ็ต High Score
  localStorage.removeItem("highScore");
  document.getElementById("highScore").textContent = "High Score: -";
}
// เริ่มเกมเมื่อโหลดหน้า
window.addEventListener("load", initializeGame);

// เพิ่มการ select text เมื่อคลิก input
document.addEventListener("DOMContentLoaded", function () {
  const guessInput = document.getElementById("guessInput");
  guessInput.addEventListener("focus", function () {
    this.select();
  });
});

// เพิ่มการรองรับ Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    });
});
