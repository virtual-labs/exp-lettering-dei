const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dot3 = document.getElementById('dot3');
const dot2 = document.getElementById('dot2');
const dot1 = document.getElementById('dot1');
const dot4 = document.getElementById('dot4');
const arrow1 = document.getElementById('arrow1');
const arrow2 = document.getElementById('arrow2');
const arrow3 = document.getElementById('arrow3');

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

    switch (nextConnection) {
        case 'dot3-dot1':
            expectedDot = dot3;
            break;
        case 'dot1-dot2':
            expectedDot = dot1;
            break;
        case 'dot2-dot4':
            expectedDot = dot2;
            break;
        default:
            return;
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

    switch (nextConnection) {
        case 'dot3-dot1':
            if (Math.hypot(x - (dot1.offsetLeft + 5), y - (dot1.offsetTop + 5)) <= tolerance) {
                document.getElementById('stroke1').style.display = 'block';
                console.log('Stopped drawing near', dot1.id);
                arrow1.style.display = 'none'; // Hide the arrow
                arrow2.style.display = 'block'; // Show the next arrow
                nextConnection = 'dot1-dot2';
            } else {
                alert('Complete the line. Try Again!');
            }
            break;
        case 'dot1-dot2':
            if (Math.hypot(x - (dot2.offsetLeft + 5), y - (dot2.offsetTop + 5)) <= tolerance) {
                document.getElementById('stroke2').style.display = 'block';
                console.log('Stopped drawing near', dot2.id);
                arrow2.style.display = 'none'; // Hide the arrow
                arrow3.style.display = 'block'; // Show the next arrow
                nextConnection = 'dot2-dot4';
            } else {
                alert('Complete the line. Try Again!');
            }
            break;
        case 'dot2-dot4':
            if (Math.hypot(x - (dot4.offsetLeft + 5), y - (dot4.offsetTop + 5)) <= tolerance) {
                document.getElementById('stroke3').style.display = 'block';
                console.log('Stopped drawing near', dot4.id);
                button.style.display = 'block';
                congrats.style.display = 'block';
                arrow3.style.display = 'none'; // Hide the arrow
                nextConnection = ''; // All connections done
            } else {
                alert('Complete the line. Try Again!');
            }
            break;
        default:
            break;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
