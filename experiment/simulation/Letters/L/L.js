const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dot3 = document.getElementById('dot3');
const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const arrow1 = document.getElementById('arrow1');
const arrow2 = document.getElementById('arrow2');

let isDrawing = false;
let startX = 0;
let startY = 0;
let tolerance = 30; // Tolerance radius for dot connection
let nextConnection = 'dot3-dot1'; // Start with connecting dot3 to dot1

function drawToleranceCircle(dot, ctx) {
    ctx.beginPath();
    ctx.arc(dot.offsetLeft + 5, dot.offsetTop + 5, tolerance, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 200, 0, 0.5)'; // Visual guide for connection
    ctx.stroke();
}

function startDrawing(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let expectedDot;
    if (nextConnection === 'dot3-dot1') {
        expectedDot = dot3;
    } else if (nextConnection === 'dot1-dot2') {
        expectedDot = dot1;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawToleranceCircle(expectedDot, ctx);

    if (Math.hypot(x - (expectedDot.offsetLeft + 5), y - (expectedDot.offsetTop + 5)) > tolerance) {
        alert('Please follow rules and draw accordingly');
        return;
    }

    isDrawing = true;
    startX = expectedDot.offsetLeft + 5;
    startY = expectedDot.offsetTop + 5;
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
    ctx.strokeStyle = 'black'; // Change line color to black
    ctx.lineWidth = 6;  
}

function stopDrawing(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.hypot(x - (dot1.offsetLeft + 5), y - (dot1.offsetTop + 5)) <= tolerance && nextConnection === 'dot3-dot1') {
        document.getElementById('stroke1').style.display = 'block';
        console.log('Stopped drawing near', dot1.id);
        arrow1.style.display = 'none'; // Hide the arrow
        dot3.style.display = 'none'; // Hide the dot
        nextConnection = 'dot1-dot2'; // Move to the next connection
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else if (Math.hypot(x - (dot2.offsetLeft + 5), y - (dot2.offsetTop + 5)) <= tolerance && nextConnection === 'dot1-dot2') {
        document.getElementById('stroke2').style.display = 'block'; // Show the stroke2
        console.log('Stopped drawing near', dot2.id);
        arrow2.style.display = 'none'; // Hide the arrow
        nextConnection = ''; // All connections done
        dot1.style.display = 'none'; // Hide the dot
        dot2.style.display = 'none'; // Hide the dot
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        alert('Complete the line. Try Again!');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    }
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

// Event listeners for dot1-dot2 connection
dot1.addEventListener('mousedown', () => nextConnection = 'dot1-dot2');
dot2.addEventListener('mouseup', stopDrawing);
