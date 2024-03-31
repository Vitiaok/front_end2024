document.addEventListener("DOMContentLoaded", function() {
    var menuToggle = document.querySelector('.mobile-menu-toggle');
    var menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('open');
    });
});
