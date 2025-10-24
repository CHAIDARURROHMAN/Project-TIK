// Tabs navigation
const tabs = document.querySelectorAll(".tab-button");
const sections = document.querySelectorAll(".tab-content");

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach((s) => s.classList.remove("active"));
    document.getElementById(btn.dataset.target).classList.add("active");
  });
});

// Greeting & Date
const greeting = document.getElementById("greeting");
const dateEl = document.getElementById("date");
const hour = new Date().getHours();
if (hour < 12) greeting.textContent = "Selamat Pagi 🌅";
else if (hour < 18) greeting.textContent = "Selamat Siang ☀️";
else greeting.textContent = "Selamat Malam 🌙";
dateEl.textContent = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Dark Mode Toggle
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// === TO-DO LIST ===
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${t.completed ? "✔️ " : ""}${t.text}</span>
      <div class="actions">
        <button class="check-btn">${t.completed ? "↩️" : "✅"}</button>
        <button class="del-btn">❌</button>
      </div>
    `;
    if (t.completed) li.classList.add("completed");

    li.querySelector(".check-btn").addEventListener("click", () => {
      tasks[i].completed = !tasks[i].completed;
      saveTasks();
    });
    li.querySelector(".del-btn").addEventListener("click", () => {
      tasks.splice(i, 1);
      saveTasks();
    });
    taskList.appendChild(li);
  });
  document.getElementById("todoCount").textContent = tasks.filter(t => !t.completed).length;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addTask.addEventListener("click", () => {
  if (taskInput.value.trim() !== "") {
    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    saveTasks();
  }
});

renderTasks();

// === WATER REMINDER ===
let waterData = JSON.parse(localStorage.getItem("waterData")) || { count: 0, lastDrink: null };
const waterCount = document.getElementById("waterCount");
const progress = document.getElementById("waterProgress");

// Siapkan file audio Anda (pastikan file 'alert.mp3' ada)
const waterAlertSound = new Audio('alert.mp3');

function updateWater() {
  waterCount.textContent = waterData.count;
  document.getElementById("waterSummary").textContent = waterData.count;
  progress.style.width = `${(waterData.count / 8) * 100}%`;
  localStorage.setItem("waterData", JSON.stringify(waterData));
}

document.getElementById("addWaterBtn").addEventListener("click", () => {
  if (waterData.count < 8) {
    waterData.count++;
    waterData.lastDrink = Date.now();
    updateWater();
  } else {
    alert("Kamu sudah mencapai target 8 gelas hari ini 💧");
    waterAlertSound.play(); // Mainkan suara saat target terlampaui
  }
});

document.getElementById("resetWaterBtn").addEventListener("click", () => {
  waterData.count = 0;
  waterData.lastDrink = null;
  updateWater();
});

// Notifikasi peringatan minum air
function checkWaterReminder() {
  const now = Date.now();
  if (!waterData.lastDrink) return;
  const diff = now - waterData.lastDrink;
  const hours = diff / (1000 * 60 * 60);
  if (hours >= 2) {
    alert("⚠️ Sudah lebih dari 2 jam kamu belum minum air! Yuk minum dulu 💦");
    waterData.lastDrink = Date.now();
    updateWater();
  }
}
setInterval(checkWaterReminder, 60000 * 5); // cek tiap 5 menit

updateWater();

// === WEATHER INFO ===
const cityInput = document.getElementById("cityInput");
const fetchWeatherBtn = document.getElementById("fetchWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  weatherDisplay.innerHTML = "<p>Mengambil data cuaca...</p>";
  try {
    // Step 1: Modifikasi query untuk fokus mencari di Indonesia
    const searchQuery = `${city}, Indonesia`;
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=id&format=json`);

    const geoData = await geoRes.json();

    // Validasi 1: Kota tidak ditemukan sama sekali
    if (!geoData.results || geoData.results.length === 0) {
      weatherDisplay.innerHTML = `<p style='color:red;'>Kota tidak ditemukan.</p>`;
      return;
    }

    const result = geoData.results[0];

    // Validasi 2: Cek apakah kode negara adalah "ID" (Indonesia)
    if (result.country_code !== "ID") {
      weatherDisplay.innerHTML = `<p style='color:red;'>Kota '${city}' tidak ditemukan di Indonesia.</p>`;
      return;
    }

    const { latitude, longitude, name, country } = result;

    // Step 2: ambil data cuaca berdasarkan koordinat
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await res.json();
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const weatherCode = data.current_weather.weathercode;

    weatherDisplay.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p><b>Suhu:</b> ${temp}°C</p>
      <p><b>Kecepatan Angin:</b> ${wind} km/jam</p>
      <p><b>Kode Cuaca:</b> ${weatherCode}</p>
    `;
    localStorage.setItem("lastWeather", `${temp}°C`);
    document.getElementById("weatherSummary").textContent = `${temp}°C`;
  } catch (err) {
    console.error(err);
    weatherDisplay.innerHTML = "<p style='color:red;'>Gagal mengambil data cuaca.</p>";
  }
}
fetchWeatherBtn.addEventListener("click", fetchWeather);
