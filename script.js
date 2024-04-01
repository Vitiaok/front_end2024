document.addEventListener("DOMContentLoaded", function() {
    var menuToggle = document.querySelector('.mobile-menu-toggle');
    var menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('open');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('survey');

    surveyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(surveyForm);
        const surveyData = {};

        for (const [key, value] of formData.entries()) {
            surveyData[key] = value;
        }

        // Convert to JSON and store in localStorage
        const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
        surveys.push(surveyData);
        localStorage.setItem('surveys', JSON.stringify(surveys));

        // Optionally, you can clear the form after submission
        surveyForm.reset();

        // Optionally, you can display a success message or perform any other actions
        alert('Survey submitted successfully!');
    });
});

