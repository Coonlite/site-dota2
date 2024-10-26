$(document).ready(function() {
    // Изначально показываем только секцию 1
    $('#section1').show();
    $('.section').not('#section1').hide(); // Скрываем все остальные секции

    var tabsVerticalInner = $('#accordian');
    var selectorVerticalInner = tabsVerticalInner.find('li').length;
    var activeItemVerticalInner = tabsVerticalInner.find('.active');
    var activeWidthVerticalHeight = activeItemVerticalInner.innerHeight();
    var activeWidthVerticalWidth = activeItemVerticalInner.innerWidth();
    var itemPosVerticalTop = activeItemVerticalInner.position();
    var itemPosVerticalLeft = activeItemVerticalInner.position();
    
    $(".selector-active").css({
        "top": itemPosVerticalTop.top + "px", 
        "left": itemPosVerticalLeft.left + "px",
        "height": activeWidthVerticalHeight + "px",
        "width": activeWidthVerticalWidth + "px"
    });

    $("#accordian").on("click", "li", function(e) {
        $('#accordian ul li').removeClass("active");
        $(this).addClass('active');

        var activeWidthVerticalHeight = $(this).innerHeight();
        var activeWidthVerticalWidth = $(this).innerWidth();
        var itemPosVerticalTop = $(this).position();
        var itemPosVerticalLeft = $(this).position();

        $(".selector-active").css({
            "top": itemPosVerticalTop.top + "px", 
            "left": itemPosVerticalLeft.left + "px",
            "height": activeWidthVerticalHeight + "px",
            "width": activeWidthVerticalWidth + "px"
        });

        // Получаем индекс элемента меню
        var index = $(this).index();

        // Скрываем все секции
        $('.section').hide();

        // Показываем только соответствующую секцию
        $('#section' + (index)).show(); // Индекс + 1, так как секции начинаются с 1
    });

    // --------------add active class-on another-page move----------
    // Get current path and find target link
    var path = window.location.pathname.split("/").pop();

    // Account for home page with empty path
    if (path == '') {
        path = 'index.html';
    }

    var target = $('#accordian ul li a[href="' + path + '"]');
    // Add active class to target link
    target.parent().addClass('active');
});