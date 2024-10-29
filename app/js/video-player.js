const video = document.getElementById('video');
const playPauseCenterButton = document.getElementById('playPauseCenter');
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

// Обновление центральной кнопки Play/Pause
function updatePlayPauseButton() {
    playPauseCenterButton.classList.toggle('play', video.paused);
    playPauseCenterButton.classList.toggle('pause', !video.paused);
}

// Обновление прогресса видео
function updateProgress() {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress || 0;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
}

// Запуск или пауза видео при нажатии на центральную кнопку
playPauseCenterButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    updatePlayPauseButton();
});

// Обновление при загрузке метаданных видео
video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
    updatePlayPauseButton();
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

// Обновление центральной кнопки при завершении видео
video.addEventListener('ended', updatePlayPauseButton);

// Скрытие и показ центральной кнопки Play/Pause при воспроизведении/постановке на паузу
video.addEventListener('play', updatePlayPauseButton);
video.addEventListener('pause', updatePlayPauseButton);
