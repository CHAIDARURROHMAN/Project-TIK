document.addEventListener('DOMContentLoaded', () => {
    // Jalankan fungsi inisialisasi
    initApp();
});

// =================================================================
// INISIALISASI APLIKASI
// =================================================================
function initApp() {
    // 1. Inisialisasi Tema (Dark Mode)
    setupDarkMode();
    
    // 2. Setup Fitur To-Do
    setupTodo();

    // 3. Setup Fitur Minum Air (Harus di-setup sebelum dashboard di-update)
    setupWaterTracker();

    // 4. Inisialisasi Navigasi dan Dashboard (Ini dipanggil terakhir agar semua data siap)
    setupNavigation();
    updateDashboardInfo();
    
    // 5. Setup Fitur Cuaca
    setupWeather();
}

// =================================================================
// FUNGSI UMUM: NAVIGASI & DASHBOARD
// =================================================================
// [FUNGSI setupNavigation tetap sama]
function setupNavigation() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(c => c.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            // PERBAIKAN: Pastikan ringkasan di-update setiap kali kembali ke dashboard
            if (targetId === 'dashboard') {
                updateDashboardSummary();
            }
        });
    });
}

// [FUNGSI updateDashboardInfo tetap sama]
function updateDashboardInfo() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('id-ID', options);
    
    document.getElementById('date').textContent = dateString;

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
    document.getElementById('greeting').textContent = `${greeting} di LifeSync!`;

    updateDashboardSummary();
}

// PERBAIKAN: Fungsi ringkasan dashboard agar selalu memuat data terbaru
function updateDashboardSummary() {
    const summaryDiv = document.getElementById('summary');
    
    // Ambil data To-Do (diambil dari localStorage lagi untuk memastikan terbaru)
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Ambil data Air (diambil dari localStorage lagi untuk memastikan terbaru)
    const waterCount = parseInt(localStorage.getItem('waterCount') || '0');
    const waterTarget = parseInt(document.getElementById('waterTarget').textContent);

    // KETERANGAN AIR
    let waterStatus = waterCount >= waterTarget ? 
        '<span style="color: green; font-weight: bold;">Target Tercapai!</span>' : 
        'Segera penuhi target harian Anda.';

    summaryDiv.innerHTML = `
        <h3>Ringkasan Harian</h3>
        <p>Tugas Selesai: <strong>${completedTasks} / ${totalTasks}</strong></p>
        <p>Air Minum: <strong>${waterCount} / ${waterTarget}</strong> Gelas (${waterStatus})</p>
    `;
}

// =================================================================
// FUNGSI 1: DARK MODE [TIDAK ADA PERUBAHAN]
// =================================================================
function setupDarkMode() {
    const darkToggle = document.getElementById('darkToggle');
    const body = document.body;

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
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateDashboardSummary(); // Panggil update dashboard setiap kali tugas berubah
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? 'Batal' : 'Selesai'}</button>
                <button onclick="deleteTask(${index})" style="margin-left: 5px; background-color: #e74c3c;">Hapus</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// PERBAIKAN: Menghubungkan fungsi addTask ke tombol
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
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
    // PERBAIKAN: Menambahkan event listener ke tombol "Tambah"
    addTaskBtn.addEventListener('click', addTask);
    
    // Tambahkan event listener untuk menekan Enter pada input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    renderTasks(); // Muat tugas yang tersimpan saat inisialisasi
}


// =================================================================
// FUNGSI 3: WATER TRACKER
// =================================================================
let waterCount = parseInt(localStorage.getItem('waterCount') || '0');
const waterCountEl = document.getElementById('waterCount');
const waterTarget = parseInt(document.getElementById('waterTarget').textContent);
const waterProgress = document.getElementById('waterProgress');
const addWaterBtn = document.getElementById('addWaterBtn');
const resetWaterBtn = document.getElementById('resetWaterBtn');

// PERBAIKAN: Logika Water Display dan Progress Bar
function updateWaterDisplay() {
    waterCountEl.textContent = waterCount;
    
    // Pastikan progress bar mencapai 100% jika target sudah terpenuhi atau dilewati
    const percentage = Math.min(100, (waterCount / waterTarget) * 100);
    waterProgress.style.width = percentage + '%';

    // Perubahan warna progress bar jika target tercapai
    if (waterCount >= waterTarget) {
        waterProgress.style.backgroundColor = '#2ecc71'; // Hijau
    } else {
        waterProgress.style.backgroundColor = '#4a90e2'; // Biru atau warna default Anda
    }

    updateDashboardSummary();
}

function addWater() {
    waterCount++;
    localStorage.setItem('waterCount', waterCount);
    updateWaterDisplay();
}

function resetWater() {
    if (confirm("Apakah Anda yakin ingin mereset penghitung air minum hari ini?")) {
        waterCount = 0;
        localStorage.setItem('waterCount', '0');
        updateWaterDisplay();
    }
}

function setupWaterTracker() {
    addWaterBtn.addEventListener('click', addWater);
    resetWaterBtn.addEventListener('click', resetWater);
    updateWaterDisplay(); // Muat data saat inisialisasi
}


// =================================================================
// FUNGSI 4: CUACA
// =================================================================
const API_KEY = 'YOUR_API_KEY'; 
const weatherDisplay = document.getElementById('weatherDisplay');
const cityInput = document.getElementById('cityInput');
const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (API_KEY === 'YOUR_API_KEY') {
        // PERBAIKAN: Pesan error jika API Key belum diatur
        weatherDisplay.innerHTML = `<p style="color: red; font-weight: bold;">
            ⚠️ ERROR: API Key Cuaca belum diatur! Ganti 'YOUR_API_
