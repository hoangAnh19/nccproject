$(document).ready(function() {
    // $('.btn-bar-menu').click(function(){
    //     $('.nav-menu-mm, .overflow-menu').addClass('active');
    // })

    $('.block-evaluate .head-item-eval').click(function(){
        $(this).siblings('.desc-eval').slideToggle();
    });

    $('.item-tab').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('.item-tab').removeClass('active');
        $('.tab-content').removeClass('active');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active');
    })
});

