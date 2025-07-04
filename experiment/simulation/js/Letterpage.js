document.addEventListener('DOMContentLoaded', function () {
    // Selecting images by their IDs
    var upperCaseImage = document.getElementById('upperCase');
    var lowerCaseImage = document.getElementById('lowerCase');
    var numbersImage = document.getElementById('numbers');

    // Adding event listeners
    upperCaseImage.addEventListener('click', function() {
        window.location.href = 'Uppercase.html'; // Change URL to your specific page for upper case
    });

    lowerCaseImage.addEventListener('click', function() {
        window.location.href = 'Lowercase.html'; // Change URL to your specific page for lower case
    });

    numbersImage.addEventListener('click', function() {
        window.location.href = 'Numbers.html'; // Change URL to your specific page for numbers
    });
});