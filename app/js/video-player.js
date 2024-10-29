const video = document.getElementById('video');
const playPauseButton = document.getElementById('playPause');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const fullscreenButton = document.getElementById('fullscreen');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

// Форматирование времени в "мм:сс"
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Обновление кнопки Play/Pause
function updatePlayPauseButton() {
    playPauseButton.textContent = video.paused ? 'Play' : 'Pause';
}

// Обновление прогресса видео
function updateProgress() {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress || 0;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
}

// Запуск или пауза видео
playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    updatePlayPauseButton();
});

// Обновление при загрузке метаданных видео (например, его продолжительность)
video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
});

// Обновление прогресс-бара и времени
video.addEventListener('timeupdate', updateProgress);

// Перемотка при изменении положения ползунка
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * video.duration;
    video.currentTime = newTime;
});

// Управление громкостью
volumeControl.addEventListener('input', () => {
    video.volume = volumeControl.value;
});

// Переход в полноэкранный режим
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Обновление кнопки при завершении видео
video.addEventListener('ended', updatePlayPauseButton);
