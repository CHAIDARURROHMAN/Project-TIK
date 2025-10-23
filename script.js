const darkToggle = document.getElementById("darkToggle");
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️";
}
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  darkToggle.textContent = dark ? "☀️" : "";
  localStorage.setItem("darkMode", dark);
};

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("active");
  });
});

const greeting = document.getElementById("greeting");
const dateDisplay = document.getElementById("date");
const now = new Date();
const hour = now.getHours();
let greet = hour < 12 ? "Selamat pagi!" : hour < 18 ? "Selamat siang!" : "Selamat malam!";
greeting.textContent = greet;
dateDisplay.textContent = now.toLocaleDateString("id-ID", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
});

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
document.getElementById("addTask").onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Tulis tugas dulu!");
  addTask(text, false);
  saveTasks();
  taskInput.value = "";
};
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(t => addTask(t.text, t.done));
};
function addTask(text, done) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("completed");
  li.onclick = () => { li.classList.toggle("completed"); saveTasks(); };
  taskList.appendChild(li);
}
function saveTasks() {
  const tasks = [...taskList.children].map(li => ({
    text: li.textContent,
    done: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const startReminder = document.getElementById("startReminder");
startReminder.onclick = () => {
  const interval = parseInt(document.getElementById("interval").value);
  if (!interval || interval <= 0) return alert("Masukkan interval menit yang valid!");
  alert(`Pengingat akan muncul setiap ${interval} menit.`);
  setInterval(() => {
    alert("💧 Saatnya minum air!");
  }, interval * 60000);
};

document.getElementById("checkWeather").onclick = async () => {
  const city = document.getElementById("city").value;
  const result = document.getElementById("weatherResult");
  const apiKey = "MASUKKAN_API_KEY_ANDA"; // Ganti dengan API key OpenWeatherMap kamu
  if (!city) return alert("Masukkan nama kota!");
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`
    );
    const data = await res.json();
    if (data.cod !== 200) return result.innerHTML = `<p>Kota tidak ditemukan!</p>`;
    result.innerHTML = `
      <h3>${data.name}</h3>
      <p>${data.weather[0].description}</p>
      <p>🌡️ Suhu: ${data.main.temp}°C</p>
    `;
  } catch (e) {
    result.innerHTML = `<p>Terjadi kesalahan mengambil data.</p>`;
  }
};

