document.addEventListener('DOMContentLoaded', function () {
    // Selecting images by their IDs
    var upperCaseImage = document.getElementById('upperCase');
    var lowerCaseImage = document.getElementById('lowerCase');

    // Adding event listeners
    upperCaseImage.addEventListener('click', function() {
        window.location.href = 'Uppercase.html'; // Change URL to your specific page for upper case
    });

    lowerCaseImage.addEventListener('click', function() {
        window.location.href = 'Lowercase.html'; // Change URL to your specific page for lower case
    });
});