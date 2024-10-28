$(document).ready(function() {
    // Изначально показываем только секцию 1
    $('#section1').show();
    $('.section').not('#section1').hide(); // Скрываем все остальные секции

    // Обработчик клика по элементам меню
    $("#accordian").on("click", "li", function(e) {
        $('#accordian ul li').removeClass("active");
        $(this).addClass('active');

        var index = $(this).index();
        $('.section').hide();
        $('#section' + (index)).show(); // Индекс + 1, так как секции начинаются с 1
    });

    // Обработчик клика по кнопке поиска
    $('#searchButton').on('click', function() {
        var query = $('#searchInput').val().toLowerCase(); // Получаем текст из поля ввода
        searchHeaders(query); // Вызываем функцию поиска
    });

    // Функция для поиска заголовков h3
    function searchHeaders(query) {
        var matchedSections = [];
    
        // Ищем все заголовки h3 в секции 1
        $('#section7 h3').each(function() {
            var headerText = $(this).text().toLowerCase();
            if (headerText.includes(query)) {
                matchedSections.push(headerText); // Добавляем совпадающий заголовок в массив
            }
        });
    
        // Если есть совпадения, выводим их
        if (matchedSections.length > 0) {
            alert('Найденные заголовки: \n' + matchedSections.join('\n'));
        } else {
            alert('Совпадений не найдено.');
        }
    }

    // Функция для автозаполнения
    $('#searchInput').on('input', function() {
        var query = $(this).val().toLowerCase(); // Получаем текст из поля ввода
        var suggestions = [];

        // Ищем все заголовки h3 в секции 1
        $('#section7 h3').each(function() {
            var headerText = $(this).text().toLowerCase();
            if (headerText.includes(query) && query) {
                suggestions.push(headerText); // Добавляем совпадающий заголовок в массив
            }
        });

        // Отображаем подсказки
        displaySuggestions(suggestions);
    });

    // Функция для отображения подсказок
    function displaySuggestions(suggestions) {
        // Очищаем предыдущие подсказки
        $('#suggestions').remove();
        
        if (suggestions.length > 0) {
            var suggestionBox = $('<ul id="suggestions"></ul>').css({
                position: 'absolute',
                background: '#fff',
                color: "#000000",
                border: '1px solid #ccc',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto',
                width: $('#searchInput').outerWidth()
            });

            suggestions.forEach(function(suggestion) {
                var listItem = $('<li></li>').text(suggestion).css({
                    padding: '10px',
                    cursor: 'pointer'
                }).hover(function() {
                    $(this).css('background', '#f0f0f0');
                }, function() {
                    $(this).css('background', '#fff');
                }).click(function() {
                    $('#searchInput').val(suggestion); // Устанавливаем значение в поле ввода
                    $('#suggestions').remove(); // Убираем подсказки

                    // Переход к секции с заголовком
                    scrollToHeader(suggestion);
                });

                suggestionBox.append(listItem);
            });

            $('#searchInput').after(suggestionBox); // Добавляем подсказки после поля ввода
        }
    }

    // Функция для прокрутки к заголовку
    function scrollToHeader(headerText) {
        var targetHeader = $('#section7 h3').filter(function() {
            return $(this).text().toLowerCase() === headerText.toLowerCase();
        });

        if (targetHeader.length) {
            // Плавная прокрутка к заголовку
            $('html, body').animate({
                scrollTop: targetHeader.offset().top
            }, 500);
        }
    }

    // Закрытие подсказок при клике вне поля ввода и списка подсказок
    $( document).on('click', function(event) {
        if ($(event.target).closest('#searchInput, #suggestions').length === 0) {
            $('#suggestions').remove(); // Убираем подсказки
        }
    });
});