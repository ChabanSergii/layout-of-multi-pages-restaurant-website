const button = document.getElementById("show-more-btn");
button.addEventListener("click", function () {
    const moreContents = document.querySelectorAll(".more-content");
    let isExpanded = false;

    // Проверим, открыт ли хотя бы один блок
    moreContents.forEach(content => {
        if (content.style.maxHeight) {
            isExpanded = true;
        }
    });

    // Переключаем отображение всех блоков
    moreContents.forEach(content => {
        if (isExpanded) {
            content.style.maxHeight = null; // Закрываем
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // Открываем
        }
    });

    // Изменяем текст кнопки в зависимости от состояния
    this.textContent = isExpanded ? "View More" : "Hidden";
});
