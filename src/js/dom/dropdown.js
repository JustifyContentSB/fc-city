import $ from 'jquery';



export default () => {
    $('.js-faq-btn').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('is-active');
        const thisId = $(this).attr('data-id');
        $('.js-faq-answer[data-id='+thisId+']').slideToggle(300);
    });
}
