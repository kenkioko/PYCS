$(function () {

    //switch tabs on click
    $("ul.tab li").click(function () {
        $("ul.tab li").removeClass("active");
        $(this).addClass("active");
        $(".tabcontent").hide();
        var tab = $(this).find("a").attr("href");
        $(tab).fadeIn();
    });

    //open default tab when page loads
    $("ul.tab li:first-child").click();

});