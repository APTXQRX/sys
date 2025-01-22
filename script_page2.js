
// Sınav türünü seçme
function selectExam(exam) {
  document.getElementById("exam-selection").style.display = "none";
  document.getElementById("start-button-container").style.display = "block";
}
function startExam() {
  // Başla butonuna tıklayınca sınav alanlarını gösteriyoruz
  document.getElementById("start-button-container").style.display = "none";
  document.getElementById("timer").style.display = "block";
  document.querySelector(".question").style.display = "block";
  document.querySelector(".navigation").style.display = "block";
  document.getElementById("finish-button-container").style.display = "block";
}
// Sorular arasında geçiş
function changeQuestion(direction) {
  // Soruları değiştirmek için gerekli kod burada olacak
}
// Sonuçları Göster
function goToResults() {
  // Sonuçları gösterme kodu
}
// Testi bitir
function finishTest() {
  // Test bitirme kodu
}
// Sınav soruları ve seçenekleri
const exams = {
  ex1: [
    {
      question: "الؤال هنا سيكون1",
      options: ["الجواب 1", "الجواب 2", "الجواب 3", "الجواب 4"],
      correctAnswer: 0, // Doğru cevap: 1. seçenek (index: 0)
    },
    {
      question: "الؤال هنا سيكون2",
      options: ["الجواب 1", "الجواب 2", "الجواب 3", "الجواب 4"],
      correctAnswer: 1, // Doğru cevap: 2. seçenek (index: 1)
    },
  ],
  ex2: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Rome", "Berlin"],
      correctAnswer: 0, // Doğru cevap: Paris (index: 0)
    },
    {
      question: "What color is the sky?",
      options: ["Blue", "Red", "Yellow", "Green"],
      correctAnswer: 0, // Doğru cevap: Blue (index: 0)
    },
  ],
  ex3: [
    {
      question: "ما هو عاصمة مصر؟",
      options: ["القاهرة", "الرياض", "أبوظبي", "بيروت"],
      correctAnswer: 0, // Doğru cevap: القاهرة (index: 0)
    },
    {
      question: "ما هي أكبر قارة؟",
      options: ["آسيا", "أفريقيا", "أوروبا", "أمريكا"],
      correctAnswer: 0, // Doğru cevap: آسيا (index: 0)
    },
  ],
};

// Seçilen sınav ve soru takibi
let selectedExam = null;
let currentQuestion = 0;
let selectedOptions = []; // Seçilen cevaplar
let timeRemaining = 10 * 60; // 10 dakika, saniye cinsinden
let timerInterval = null;
// Sınav seçme fonksiyonu
function selectExam(examType) {
  selectedExam = examType;
  currentQuestion = 0; // Soru sırasını sıfırla
  selectedOptions = []; // Seçilen cevapları sıfırla
  document.getElementById("exam-selection").style.display = "none"; // Sınav seçimini gizle
  document.getElementById("start-button-container").style.display = "block"; // Başla butonunu göster
  updateQuestion(); // İlk soruyu yükle
}
// Başla butonuna tıklayınca sınavı başlatan fonksiyon
function startExam() {
  // Başla butonunu gizle
  document.getElementById("start-button").style.display = "none";
  document.getElementById("start-button-container").style.display = "none"; // Başla butonunun bulunduğu container'ı da gizle
  document.getElementById("timer").style.display = "block"; // Timer'ı göster
  startTimer(); // Zamanlayıcıyı başlat
  document.querySelector(".question").style.display = "block";
  document.querySelector(".navigation").style.display = "flex";
  document.getElementById("finish-button-container").style.display = "block";
  updateQuestion(); // İlk soruyu güncelle
}
// Zamanlayıcıyı başlatma fonksiyonu
function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeString = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    document.getElementById("timer").textContent = timeString;
    // Zaman bitince testi bitir
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      showTimeUpModal(); // Zaman bitti modalı
    }
  }, 1000);
}
// Zaman bitince gösterilecek modal
function showTimeUpModal() {
  document.getElementById("time-up-modal").style.display = "flex";
}
// Soruyu güncelleyen fonksiyon
function updateQuestion() {
  const exam = exams[selectedExam];
  const questionElement = document.querySelector(".question");
  const questionNumberElement = document.querySelector(".question-number");
  const questionTextElement = document.querySelector(".sr2");
  if (!exam || currentQuestion >= exam.length) {
    clearInterval(timerInterval);
    showTimeUpModal(); // Zaman bitince modal
    return;
  }
  const current = exam[currentQuestion];
  questionNumberElement.textContent = currentQuestion + 1;
  questionTextElement.textContent = current.question;

  const buttons = document.querySelectorAll(".option");
  buttons.forEach((button, index) => {
    button.textContent = current.options[index];
    button.classList.remove("selected"); // Önceki seçimi kaldır
  });
  // Seçilen cevabı işaretle
  if (selectedOptions[currentQuestion] !== undefined) {
    buttons[selectedOptions[currentQuestion]].classList.add("selected");
  }
  document.getElementById("prev-button").disabled = currentQuestion === 0;
  document.getElementById("next-button").disabled =
    currentQuestion === exam.length - 1;

  // Finish butonunun görünürlüğünü kontrol et
  const finishButtonContainer = document.getElementById(
    "finish-button-container"
  );
  if (finishButtonContainer) {
    finishButtonContainer.style.display =
      currentQuestion === exam.length - 1 ? "block" : "none"; // Son soruda görünsün
  }

  const finishButton = document.getElementById("finish-button");
  if (finishButton) {
    finishButton.style.margin = "10px auto"; // Otomatik hizalama
    finishButton.style.display = "block"; // Blok yapısı
  }
}

finishButtonContainer.style.display =
  currentQuestion === exam.length - 1 ? "block" : "none";

// Seçilen cevabı kaydetme fonksiyonu
function selectOption(index) {
  selectedOptions[currentQuestion] = index;
  updateQuestion(); // Seçimi güncelle
}
// Soruyu değiştirme fonksiyonu
function changeQuestion(direction) {
  currentQuestion += direction;
  updateQuestion(); // Soruyu güncelle
}
// Testi bitirme fonksiyonu
function finishTest() {
  alert("Testi bitirdiniz! Sonuçlara yönlendiriliyorsunuz.");
  window.location.href = "results.html"; // Sonuç sayfasına yönlendirme
}
// Modal ve sayfa düzeni başlatma
document.getElementById("start-button").addEventListener("click", function () {
  selectExam("ex1"); // Varsayılan olarak 'ex1' seçiyoruz
});
