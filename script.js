// ========== Inisialisasi & Variabel Global ==========
const tabs = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");
const body = document.body;
const darkToggle = document.getElementById("darkToggle");
const greeting = document.getElementById("greeting");
const dateEl = document.getElementById("date");

// To-do
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Water reminder
const waterTarget = 8;
const waterCountEl = document.getElementById("waterCount");
const waterProgress = document.getElementById("waterProgress");
const addWaterBtn = document.getElementById("addWaterBtn");
const resetWaterBtn = document.getElementById("resetWaterBtn");

// Weather
const cityInput = document.getElementById("cityInput");
const fetchWeatherBtn = document.getElementById("fetchWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");

// API key cuaca (ganti dengan key kamu)
const OWM_API_KEY = "YOUR_API_KEY_HERE"; // contoh: "4f7a2f1a6e8e9abc123456789"

// ========== Mode Gelap (Dark Mode) ==========
function loadTheme() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        body.classList.add("dark-mode");
    }
}

function toggleDarkMode() {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

darkToggle.addEventListener("click", toggleDarkMode);
loadTheme();

// ========== Navigasi Tab ==========
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-target");

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});

// ========== Greeting & Tanggal ==========
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const dateStr = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    let greet = "Selamat datang";
    if (hour >= 5 && hour < 12) greet = "Selamat pagi";
    else if (hour >= 12 && hour < 15) greet = "Selamat siang";
    else if (hour >= 15 && hour < 18) greet = "Selamat sore";
    else greet = "Selamat malam";

    greeting.textContent = `${greet}, di LifeSync!`;
    dateEl.textContent = dateStr;
}
updateGreeting();

// ========== To-Do List ==========
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        span.addEventListener("click", () => toggleTask(index));
        const delBtn = document.createElement("button");
        delBtn.textContent = "Hapus";
        delBtn.style.background = "#ff4d4d";
        delBtn.style.border = "none";
        delBtn.style.color = "white";
        delBtn.style.padding = "5px 10px";
        delBtn.style.borderRadius = "5px";
        delBtn.style.cursor = "pointer";
        delBtn.addEventListener("click", () => deleteTask(index));

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed: false });
    saveTasks(tasks);
    taskInput.value = "";
    loadTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});
loadTasks();

// ========== Pengingat Minum Air ==========
function loadWaterData() {
    const saved = JSON.parse(localStorage.getItem("waterData")) || { count: 0, date: new Date().toDateString() };
    const today = new Date().toDateString();
    if (saved.date !== today) {
        saved.count = 0;
        saved.date = today;
        saveWaterData(saved);
    }
    return saved;
}

function saveWaterData(data) {
    localStorage.setItem("waterData", JSON.stringify(data));
}

function updateWaterUI() {
    const data = loadWaterData();
    const percent = (data.count / waterTarget) * 100;
    waterCountEl.textContent = data.count;
    waterProgress.style.width = `${Math.min(percent, 100)}%`;

    if (percent >= 100) {
        waterProgress.style.backgroundColor = "#00c853"; // hijau terang
    } else {
        waterProgress.style.backgroundColor = "#2ECC71";
    }
}

function addWater() {
    const data = loadWaterData();
    if (data.count < waterTarget) {
        data.count += 1;
        saveWaterData(data);
        updateWaterUI();
    } else {
        alert("Target harian sudah tercapai! 🥳");
    }
}

function resetWater() {
    const data = { count: 0, date: new Date().toDateString() };
    saveWaterData(data);
    updateWaterUI();
}

addWaterBtn.addEventListener("click", addWater);
resetWaterBtn.addEventListener("click", resetWater);
updateWaterUI();

// ========== Cuaca ==========
async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    weatherDisplay.innerHTML = "<p>Mengambil data cuaca...</p>";
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric&lang=id`
        );

        if (!response.ok) throw new Error("Kota tidak ditemukan");

        const data = await response.json();
        weatherDisplay.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p><b>${data.weather[0].description.toUpperCase()}</b></p>
            <p>Suhu: ${data.main.temp}°C</p>
            <p>Kelembapan: ${data.main.humidity}%</p>
            <p>Kecepatan Angin: ${data.wind.speed} m/s</p>
        `;
    } catch (err) {
        weatherDisplay.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

fetchWeatherBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keypress", e => {
    if (e.key === "Enter") fetchWeather();
});
