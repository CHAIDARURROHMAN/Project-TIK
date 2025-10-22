// =================================================================
// FUNGSI 1: NAVIGASI TAB
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;

            // Hapus 'active' dari semua tombol dan konten
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Tambahkan 'active' ke tombol yang diklik
            tab.classList.add('active');

            // Tampilkan konten yang sesuai
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Tampilkan tanggal hari ini
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});


// =================================================================
// FUNGSI 2: DARK MODE TOGGLE
// =================================================================
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

// Cek status dark mode tersimpan di localStorage saat memuat
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ganti ke ikon matahari
}

darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Simpan preferensi ke localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});


// =================================================================
// FUNGSI 3: TO-DO LIST
// =================================================================
const todoList = document.getElementById('todo-list');
const todoText = document.getElementById('todo-text');

function addTodo() {
    const text = todoText.value.trim();
    if (text === '') return;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${text}</span>
        <button onclick="toggleDone(this)">Selesai</button>
    `;

    // Tambahkan event listener untuk menandai selesai
    listItem.querySelector('span').addEventListener('click', () => {
        listItem.classList.toggle('done');
    });

    todoList.appendChild(listItem);
    todoText.value = ''; // Kosongkan input

    updateDashboardStats();
}

function toggleDone(button) {
    const li = button.parentElement;
    li.classList.toggle('done');
    
    // Hapus tombol "Selesai" dan ganti dengan tombol "Hapus"
    if (li.classList.contains('done')) {
        button.textContent = 'Hapus';
        button.onclick = () => li.remove();
    } else {
        button.textContent = 'Selesai';
        button.onclick = () => toggleDone(button);
    }
    
    updateDashboardStats();
}


// =================================================================
// FUNGSI 4: PENGINGAT MINUM AIR
// =================================================================
const waterCountEl = document.getElementById('waterCount');
const addWaterBtn = document.getElementById('addWaterBtn');
let waterCount = 0;

addWaterBtn.addEventListener('click', () => {
    waterCount++;
    waterCountEl.textContent = waterCount;
    updateDashboardStats();
});

// =================================================================
// FUNGSI 5: CUACA (Memerlukan API Key)
// =================================================================

// GANTI 'YOUR_API_KEY' dengan kunci API OpenWeatherMap Anda yang sebenarnya
const API_KEY = 'YOUR_API_KEY'; 
const weatherDisplay = document.getElementById('weather-display');

async function fetchWeather() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        weatherDisplay.innerHTML = `<p>Mohon masukkan nama kota.</p>`;
        return;
    }

    // URL API (Contoh menggunakan OpenWeatherMap - Ganti jika menggunakan layanan lain)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // Tangani error seperti kota tidak ditemukan
            weatherDisplay.innerHTML = `<p>Kota "${city}" tidak ditemukan atau terjadi kesalahan.</p>`;
            return;
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Gagal mengambil data cuaca. Periksa koneksi internet atau kunci API Anda.</p>`;
    }
}

function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const city = data.name;

    weatherDisplay.innerHTML = `
        <h3>Cuaca di ${city}</h3>
        <p>Suhu: ${temp}°C</p>
        <p>Kondisi: ${description}</p>
        <p>Kelembaban: ${data.main.humidity}%</p>
    `;
}

// =================================================================
// FUNGSI 6: UPDATE STATISTIK DASHBOARD
// =================================================================
function updateDashboardStats() {
    const totalTodos = todoList.querySelectorAll('li').length;
    const completedTodos = todoList.querySelectorAll('li.done').length;
    const waterGoal = parseInt(document.getElementById('waterTarget').textContent);

    document.getElementById('quick-stats').innerHTML = `
        <div style="margin-top: 15px;">
            <h4>Statistik Singkat</h4>
            <p>Tugas Selesai: ${completedTodos} / ${totalTodos}</p>
            <p>Air Minum: ${waterCount} / ${waterGoal} Gelas</p>
        </div>
    `;
}

// Panggil saat halaman dimuat
updateDashboardStats();
