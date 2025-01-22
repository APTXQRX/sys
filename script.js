// Firebase SDK'larını içe aktarıyoruz
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyA7vWQJoIBc820SLJiCLfN6e3hAY790K9o",
  authDomain: "fatih-muhsin.firebaseapp.com",
  databaseURL: "https://fatih-muhsin-default-rtdb.firebaseio.com",
  projectId: "fatih-muhsin",
  storageBucket: "fatih-muhsin.appspot.com",
  messagingSenderId: "615241951675",
  appId: "1:615241951675:web:d1e15c25d741d0b691bc9e",
  measurementId: "G-ZBLZL7PL1E",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Kullanıcı bilgilerini kaydetme fonksiyonu
function saveUserData() {
  const isim = document.querySelector(".isim").value.trim();
  const soyisim = document.querySelector(".soyisim").value.trim();

  // Boş alan kontrolü
  if (isim === "" || soyisim === "") {
    showMessage("يجب إدخال جميع الحقول!", "error");
    return;
  }

  // Harf kontrolü
  const nameRegex = /^[\u0621-\u064A\u0660-\u0669a-zA-Z\s]+$/;
  if (!nameRegex.test(isim) || !nameRegex.test(soyisim)) {
    showMessage("الاسم والكنية يجب أن يحتويان على أحرف فقط!", "error");
    return;
  }

 

  // Firebase'e veriyi kaydetme
  const userId = Date.now(); // Benzersiz bir ID oluştur
  set(ref(database, "users/" + userId), {
    isim: isim,
    soyisim: soyisim,
  })
    .then(() => {
      showMessage("تم التسجيل بنجاح!", "success");
      setTimeout(() => {
        // URL'yi şifreleyip page2.html'e geçiş yapma
        const encodedData = encodeURIComponent(
          JSON.stringify({ isim, soyisim })
        );
        window.location.href = `page2.html?data=${encodedData}`;
      }, 3000);
    })
    .catch((error) => {
      showMessage("حدث خطأ أثناء الحفظ: " + error.message, "error");
    });
}

// Mesaj gösterme fonksiyonu
function showMessage(message, type) {
  const div = document.createElement("div");
  div.textContent = message;
  div.classList.add(type === "error" ? "error-message" : "success-message");
  document.body.appendChild(div);

  // Mesajın görünürlüğünü arttırmak için CSS animasyonu ekleyebiliriz.
  div.style.animation = "showMessage 0.5s ease-out forwards";

  setTimeout(() => {
    div.style.opacity = 1;
  }, 100);

  setTimeout(() => {
    div.style.opacity = 0;
    setTimeout(() => {
      div.remove();
    }, 300);
  }, 3000);
}


// Olay dinleyici ekle
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".sinav_button");
  if (button) {
    button.addEventListener("click", saveUserData);
  }
});


