$(document).ready(function() {
    $('.select-value').click(function(event) {
        $('.select').toggleClass('open');
        $('.select ul').slideToggle();
        event.stopPropagation();
    });
    //--------------------------------------------------------------------------------------
    $('.select ul').on('click', 'li', function() {
        var newValue = $(this).text(),
            currentValue = $('.select-value').val(),
            str = '<li>' + currentValue + '</li>';
        $('.select-value').val(newValue);
        $('.select ul').slideUp();
        $('.select').toggleClass('open');
        $(this).remove();
        $(str).appendTo('.select .mCSB_container');
        (function sort () {
            var mylist = $('.select .mCSB_container'),
                listitems = mylist.children('li');
            listitems.sort(function(a, b) {
                var A = $(a).text().toUpperCase(),
                    B = $(b).text().toUpperCase();
                return (A < B) ? -1 : (A > B) ? 1 : 0;
            })
            $('.select li').remove();
            $.each(listitems, function(idx, itm) { mylist.append(itm); });
        })();
    });
});
