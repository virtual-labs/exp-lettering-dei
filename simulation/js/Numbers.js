document.addEventListener('DOMContentLoaded', function () {
    // Selecting images by their IDs
    var zero = document.getElementById('zero');
    var one = document.getElementById('one');
    var two = document.getElementById('two');
    var three = document.getElementById('three');
    var four = document.getElementById('four');
    var five = document.getElementById('five');
    var six = document.getElementById('six');
    var seven = document.getElementById('seven');
    var eight = document.getElementById('eight');
    var nine = document.getElementById('nine');


    // Adding event listeners
    zero.addEventListener('click', function() {
        window.location.href = 'NumbersPage/0/zero.html'; // Change URL to your specific page for upper case
    });

    one.addEventListener('click', function() {
        window.location.href = 'NumbersPage/1/one.html'; // Change URL to your specific page for lower case
    });

    two.addEventListener('click', function() {
        window.location.href = 'NumbersPage/2/two.html'; // Change URL to your specific page for upper case'; // Change URL to your specific page for upper case
    });

    three.addEventListener('click', function() {
        window.location.href = 'NumbersPage/3/three.html'; // Change URL to your specific page for lower case
    });

    four.addEventListener('click', function() {
        window.location.href = 'NumbersPage/4/four.html'; // Change URL to your specific page for upper case
    });

    five.addEventListener('click', function() {
        window.location.href = 'NumbersPage/5/five.html'; // Change URL to your specific page for lower case
    });

    six.addEventListener('click', function() {
        window.location.href = 'NumbersPage/6/six.html'; // Change URL to your specific page for upper case
    });

    seven.addEventListener('click', function() {
        window.location.href = 'NumbersPage/7/seven.html'; // Change URL to your specific page for lower case
    });

    eight.addEventListener('click', function() {
        window.location.href = 'NumbersPage/8/eight.html'; // Change URL to your specific page for upper case
    });

    nine.addEventListener('click', function() {
        window.location.href = 'NumbersPage/9/eight.html'; // Change URL to your specific page for upper case
    });
    
});