// Menjalankan initApp setelah semua HTML dimuat
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// =================================================================
// INISIALISASI APLIKASI
// =================================================================
function initApp() {
    // 1. Inisialisasi Tema
    setupDarkMode();
    
    // 2. Inisialisasi Navigasi dan Dashboard
    setupNavigation();
    updateDashboardInfo();
    
    // 3. Setup Fitur To-Do
    setupTodo();

    // 4. Setup Fitur Minum Air
    setupWaterTracker();

    // 5. Setup Fitur Cuaca
    setupWeather();
}

// =================================================================
// FUNGSI UMUM: NAVIGASI & DASHBOARD
// =================================================================
function setupNavigation() {
    // PERBAIKAN: Pindahkan selector elemen ke DALAM fungsi
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(c => c.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            if (targetId === 'dashboard') {
                updateDashboardSummary();
            }
        });
    });
}

function updateDashboardInfo() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('id-ID', options);
    
    // PERBAIKAN: Ambil elemen langsung di sini
    document.getElementById('date').textContent = dateString;

    // Greeting berdasarkan waktu
    const hour = today.getHours();
    let greeting;
    if (hour < 10) {
        greeting = "Selamat Pagi";
    } else if (hour < 15) {
        greeting = "Selamat Siang";
    } else if (hour < 18) {
        greeting = "Selamat Sore";
    } else {
        greeting = "Selamat Malam";
    }
    // PERBAIKAN: Ambil elemen langsung di sini
    document.getElementById('greeting').textContent = `${greeting} di LifeSync!`;

    updateDashboardSummary();
}

function updateDashboardSummary() {
    // PERBAIKAN: Ambil elemen langsung di sini
    const summaryDiv = document.getElementById('summary');
    if (!summaryDiv) return; // Pengaman jika elemen tidak ada
    
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const waterCount = parseInt(localStorage.getItem('waterCount') || '0');
    // PERBAIKAN: Ambil elemen target di sini agar lebih aman
    const waterTargetEl = document.getElementById('waterTarget');
    const waterTarget = waterTargetEl ? parseInt(waterTargetEl.textContent) : 8;

    summaryDiv.innerHTML = `
        <h3>Ringkasan Harian</h3>
        <p>Tugas Selesai: <strong>${completedTasks} / ${totalTasks}</strong></p>
        <p>Air Minum: <strong>${waterCount} / ${waterTarget}</strong> Gelas</p>
    `;
}

// =================================================================
// FUNGSI 1: DARK MODE
// =================================================================
function setupDarkMode() {
    // PERBAIKAN: Pindahkan selector elemen ke DALAM fungsi
    const darkToggle = document.getElementById('darkToggle');
    const body = document.body;
    if (!darkToggle) return;

    // Cek status tersimpan
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// =================================================================
// FUNGSI 2: TO-DO LIST
// =================================================================
// Variabel data (tasks) boleh tetap global karena tidak bergantung pada DOM
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateDashboardSummary();
}

// --- PERBAIKAN BESAR PADA RENDER & ONCLICK ---
function renderTasks() {
    // PERBAIKAN: Ambil elemen di sini
    const taskList = document.getElementById('taskList');
    if (!taskList) return;

    taskList.innerHTML = ''; // Kosongkan list
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        // Buat elemen span untuk teks
        const span = document.createElement('span');
        span.textContent = task.text;

        // Buat div untuk tombol
        const div = document.createElement('div');
        
        // Buat tombol Toggle
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Batal' : 'Selesai';
        // PERBAIKAN: Gunakan addEventListener, bukan onclick=""
        toggleBtn.addEventListener('click', () => toggleTask(index));
        
        // Buat tombol Hapus
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus';
        // PERBAIKAN: Gunakan addEventListener, bukan onclick=""
        deleteBtn.addEventListener('click', () => deleteTask(index));

        // Masukkan tombol ke div, lalu masukkan span dan div ke li
        div.appendChild(toggleBtn);
        div.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(div);
        
        taskList.appendChild(li);
    });
}
// --- AKHIR PERBAIKAN RENDER ---

function addTask() {
    // PERBAIKAN: Ambil elemen di sini
    const taskInput = document.getElementById('taskInput');
    if (!taskInput) return;

    const text = taskInput.value.trim();
    if (text === '') return; // Jangan tambahkan jika kosong

    tasks.push({ text: text, completed: false });
    taskInput.value = ''; // Kosongkan input setelah ditambah
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function setupTodo() {
    // PERBAIKAN: Pindahkan selector elemen ke DALAM fungsi
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
    }
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }
    renderTasks(); // Muat tugas yang tersimpan
}


// =================================================================
// FUNGSI 3: WATER TRACKER
// =================================================================
// Variabel data (waterCount) boleh tetap global
let waterCount = parseInt(localStorage.getItem('waterCount') || '0');

function updateWaterDisplay() {
    // PERBAIKAN: Ambil elemen di sini
    const waterCountEl = document.getElementById('waterCount');
    const waterTargetEl = document.getElementById('waterTarget');
    const waterProgress = document.getElementById('waterProgress');

    if (!waterCountEl || !waterTargetEl || !waterProgress) return;

    const waterTarget = parseInt(waterTargetEl.textContent);
    waterCountEl.textContent = waterCount;
    
    const percentage = (waterCount / waterTarget) * 100;

    // --- PERBAIKAN FEEDBACK BUG 3 ---
    if (percentage >= 100) {
        waterProgress.style.width = '100%';
        waterProgress.style.backgroundColor = '#FFD700'; // Warna emas saat target tercapai
    } else {
        waterProgress.style.width = percentage + '%';
        waterProgress.style.backgroundColor = '#2ECC71'; // Warna hijau normal
    }
    // --- AKHIR PERBAIKAN ---

    updateDashboardSummary();
}

function addWater() {
    waterCount++;
    localStorage.setItem('waterCount', waterCount);
    
    // --- PERBAIKAN FEEDBACK BUG 3 ---
    // Cek target SETELAH menambah air
    const waterTarget = parseInt(document.getElementById('waterTarget').textContent);
    if (waterCount === waterTarget) {
        alert('Selamat! Anda telah mencapai target minum air harian.');
    }
    // --- AKHIR PERBAIKAN ---

    updateWaterDisplay(); // Update tampilan
}

function resetWater() {
    if (confirm("Apakah Anda yakin ingin mereset penghitung air minum hari ini?")) {
        waterCount = 0;
        localStorage.setItem('waterCount', '0');
        updateWaterDisplay();
    }
}

function setupWaterTracker() {
    // PERBAIKAN: Pindahkan selector elemen ke DALAM fungsi
    const addWaterBtn = document.getElementById('addWaterBtn');
    const resetWaterBtn = document.getElementById('resetWaterBtn');

    if (addWaterBtn) addWaterBtn.addEventListener('click', addWater);
    if (resetWaterBtn) resetWaterBtn.addEventListener('click', resetWater);
    
    updateWaterDisplay(); // Muat data saat inisialisasi
}


// =================================================================
// FUNGSI 4: CUACA (Membutuhkan API Key)
// =================================================================
// PERINGATAN PENTING: GANTI 'YOUR_API_KEY' DENGAN KUNCI API ASLI
// Dapatkan di: https://openweathermap.org/
const API_KEY = 'YOUR_API_KEY'; 

async function fetchWeather() {
    // PERBAIKAN: Pindahkan selector elemen ke DALAM fungsi
    const cityInput = document.getElementById('cityInput');
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (!cityInput || !weatherDisplay) return;

    const city = cityInput.value.trim();
    if (!city) {
        weatherDisplay.innerHTML = `<p>Mohon masukkan nama kota.</p>`;
        return;
    }

    // Peringatan jika API Key belum diganti
    if (API_KEY === 'YOUR_API_KEY') {
        weatherDisplay.innerHTML = `<p>PERINGATAN: Harap ganti 'YOUR_API_KEY' di dalam file script.js dengan API Key asli dari OpenWeatherMap.</p>`;
        return;
    }

    weatherDisplay.innerHTML = `<p>Memuat cuaca untuk ${city}...</p>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
                weatherDisplay.innerHTML = `<p>Gagal mengambil data: API Key tidak valid. Silakan periksa kunci Anda.</p>`;
            } else {
                weatherDisplay.innerHTML = `<p>Kota "${city}" tidak ditemukan. (${errorData.message})</p>`;
            }
            return;
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Gagal mengambil data cuaca. Periksa koneksi internet Anda.</p>`;
        console.error("Weather fetch error:", error);
    }
}

function displayWeather(data) {
    // PERBAIKAN: Ambil elemen di sini
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (!weatherDisplay) return;

    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    weatherDisplay.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
            <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" style="width: 80px;">
            <div>
                <h3>Cuaca di ${data.name}</h3>
                <p style="font-size: 2em; font-weight: bold;">${temp}°C</p>
                <p style="text-transform: capitalize;">Kondisi: ${description}</p>
                <p>Terasa seperti: ${feelsLike}°C</p>
                <p>Kelembaban: ${data.main.humidity}%</p>
            </div>
        </div>
    `;
}

function setupWeather() {
    // PERBAIKAN: Pindahkan selector elemen ke DALAM fungsi
    const cityInput = document.getElementById('cityInput');
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    
    if (fetchWeatherBtn) fetchWeatherBtn.addEventListener('click', fetchWeather);
    if (cityInput) cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchWeather();
    });
}
