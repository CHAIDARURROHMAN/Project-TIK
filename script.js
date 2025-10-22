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
    updateDashboardInfo(); // Panggil ini saat awal memuat
    
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

            // PERBAIKAN: Panggil updateDashboardInfo() lengkap
            // agar Sapaan dan Tanggal juga muncul kembali.
            if (targetId === 'dashboard') {
                updateDashboardInfo();
            }
        });
    });
}

function updateDashboardInfo() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('id-ID', options);
    
    // PERBAIKAN: Ambil elemen langsung di sini
    const dateEl = document.getElementById('date');
    if (dateEl) dateEl.textContent = dateString;

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
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) greetingEl.textContent = `${greeting} di LifeSync!`;

    // Panggil summary setelah info utama di-set
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
// Variabel data (tasks) boleh tetap global
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
    
    if (tasks.length === 0) {
        taskList.innerHTML = "<li><em>Belum ada tugas.</em></li>";
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const span = document.createElement('span');
        span.textContent = task.text;

        const div = document.createElement('div');
        
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Batal' : 'Selesai';
        // PERBAIKAN: Gunakan addEventListener
        toggleBtn.addEventListener('click', () => toggleTask(index));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus';
        // PERBAIKAN: Gunakan addEventListener
        deleteBtn.addEventListener('click', () => deleteTask(index));

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
