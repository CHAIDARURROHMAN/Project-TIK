// Tabs navigation
const tabs = document.querySelectorAll(".tab-button");
const sections = document.querySelectorAll(".tab-content");
tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach((s) =>
      s.classList.remove("active")
    );
    document
      .getElementById(btn.dataset.target)
      .classList.add("active");
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
if (localStorage.getItem("darkMode") === "true") document.body.classList.add("dark");

// To-Do List
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    if (t.completed) li.classList.add("completed");
    li.addEventListener("click", () => {
      tasks[i].completed = !tasks[i].completed;
      saveTasks();
    });
    const del = document.createElement("button");
    del.textContent = "❌";
    del.addEventListener("click", () => {
      tasks.splice(i, 1);
      saveTasks();
    });
    li.appendChild(del);
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

// Water Reminder
let waterData = JSON.parse(localStorage.getItem("waterData")) || { count: 0 };
const waterCount = document.getElementById("waterCount");
const progress = document.getElementById("waterProgress");
function updateWater() {
  waterCount.textContent = waterData.count;
  document.getElementById("waterSummary").textContent = waterData.count;
  progress.style.width = `${(waterData.count / 8) * 100}%`;
  localStorage.setItem("waterData", JSON.stringify(waterData));
}
document.getElementById("addWaterBtn").addEventListener("click", () => {
  if (waterData.count < 8) waterData.count++;
  updateWater();
});
document.getElementById("resetWaterBtn").addEventListener("click", () => {
  waterData.count = 0;
  updateWater();
});
updateWater();

// Weather Info
const cityInput = document.getElementById("cityInput");
const fetchWeatherBtn = document.getElementById("fetchWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;
  weatherDisplay.innerHTML = "<p>Mengambil data cuaca...</p>";
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&current_weather=true`
    );
    const data = await res.json();
    const temp = data.current_weather.temperature;
    const desc = data.current_weather.weathercode;
    weatherDisplay.innerHTML = `
      <p><b>Kota:</b> ${city}</p>
      <p><b>Suhu:</b> ${temp}°C</p>
      <p><b>Kode Cuaca:</b> ${desc}</p>`;
    localStorage.setItem("lastWeather", `${temp}°C`);
    document.getElementById("weatherSummary").textContent = `${temp}°C`;
  } catch {
    weatherDisplay.innerHTML = "<p style='color:red;'>Gagal mengambil data.</p>";
  }
}
fetchWeatherBtn.addEventListener("click", fetchWeather);
