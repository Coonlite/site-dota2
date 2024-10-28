$(document).ready(function() {
    // Логика для слайдера
    let slider = $(".slider");
    let slides = $(".slide");
    let prev = $(".prev");
    let next = $(".next");
    let currentSlide = 0;

    const slidesToShow = 5; // Количество слайдов, которые должны отображаться одновременно
    const slideWidth = 100 / slidesToShow; // Ширина одного слайда в процентах

    prev.on("click", function() {
        currentSlide -= slidesToShow; // Уменьшаем на количество отображаемых слайдов
        if (currentSlide < 0) {
            currentSlide = 0; // Если меньше 0, то показываем первый слайд
        }
        slider.css("transform", `translateX(-${currentSlide * slideWidth}%)`); // Сдвиг на ширину всех слайдов
    });

    next.on("click", function() {
        currentSlide += slidesToShow; // Увеличиваем на количество отображаемых слайдов
        if (currentSlide >= slides.length - slidesToShow + 1) {
            currentSlide = slides.length - slidesToShow; // Если больше количества слайдов, то показываем последние доступные
        }
        slider.css("transform", `translateX(-${currentSlide * slideWidth}%)`); // Сдвиг на ширину всех слайдов
    });

    // Добавляем обработку для предотвращения частичного отображения последнего слайда
    function adjustSlider() {
        const totalSlides = slides.length;
        if (currentSlide >= totalSlides - slidesToShow) {
            currentSlide = totalSlides - slidesToShow; // Убедитесь, что не прокручиваем за пределы
        }
        slider.css("transform", `translateX(-${currentSlide * slideWidth}%)`); // Обновляем сдвиг
    }

    // Вызываем adjustSlider при загрузке
    adjustSlider();

    // Обработчик для карточек
    $(".slide").on("click", function() {
        const characterName = $(this).find(".slide-title").text();
        const characterDescription = getCharacterDescription(characterName); // Функция для получения описания персонажа

        $("#characterName").text(characterName);
        $("#characterDescription").text(characterDescription);
        $("#characterInfo").show(); // Показываем информацию о персонаже
    });

    // Пример функции для получения описания персонажа
    function getCharacterDescription(name) {
        const descriptions = {
            "Phantom Assassin": "Phantom Assassin is a melee agility hero known for her ability to deal massive damage.",
            "Juggernaut": "Juggernaut is a melee agility hero who excels in both dealing and avoiding damage.",
            "Muerta": "Muerta is a ranged agility hero with powerful abilities to control the battlefield.",
            "Lina": "Lina is a ranged intelligence hero known for her high burst damage and crowd control.",
            "Tiny": "Tiny is a melee strength hero that can deal significant damage and initiate fights."
        };
        return descriptions[name] || "No description available.";
    }
});