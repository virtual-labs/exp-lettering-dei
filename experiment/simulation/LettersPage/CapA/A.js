const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dot3 = document.getElementById('dot3');
const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const dot4 = document.getElementById('dot4');
const dot5 = document.getElementById('dot5');
const arrow1 = document.getElementById('arrow1');
const arrow2 = document.getElementById('arrow2');
const arrow3 = document.getElementById('arrow3');

let isDrawing = false;
let startX = 0;
let startY = 0;
let tolerance = 30; // Tolerance radius for dot connection
let nextConnection = 'dot3-dot1'; // Start with connecting dot3 to dot1

arrow1.style.display = 'block'; // Initially, arrow1 is visible
arrow2.style.display = 'none';
arrow3.style.display = 'none';



function checkDotTolerance(dot, x, y) {
    return Math.hypot(x - (dot.offsetLeft + 5), y - (dot.offsetTop + 5)) <= tolerance;
}

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
    let targetDot;

    switch (nextConnection) {
        case 'dot3-dot1':
        case 'dot3-dot2':
            targetDot = dot3;
            break;
        case 'dot4-dot5':
            targetDot = dot4;
            break;
    }

    if (!checkDotTolerance(targetDot, x, y)) {
        alert('Please follow rules and draw accordingly, Try again!');
        return; // Do not start drawing if not within tolerance of target dot
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawToleranceCircle(targetDot, ctx);
    drawToleranceCircle(nextConnection.includes('dot1') ? dot1 : nextConnection.includes('dot2') ? dot2 : dot5, ctx);

    isDrawing = true;
    startX = targetDot.offsetLeft + 5;
    startY = targetDot.offsetTop + 5;
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
    let targetDot;

    switch (nextConnection) {
        case 'dot3-dot1':
            targetDot = dot1;
            break;
        case 'dot3-dot2':
            targetDot = dot2;
            break;
        case 'dot4-dot5':
            targetDot = dot5;
            break;
    }

    if (checkDotTolerance(targetDot, x, y)) {
        console.log('Stopped drawing near', targetDot.id);
        let strokeId;
        switch (nextConnection) {
            case 'dot3-dot1':
                strokeId = '1';
                nextConnection = 'dot3-dot2'; // Set next connection to dot3-dot2
                arrow1.style.display = 'none';
                arrow2.style.display = 'block';
                dot1.style.display = 'none';
                break;
            case 'dot3-dot2':
                strokeId = '2';
                nextConnection = 'dot4-dot5'; // Set next connection to dot4-dot5
                arrow2.style.display = 'none';
                arrow3.style.display = 'block';
                dot2.style.display = 'none';
                dot3.style.display = 'none';
                break;
            case 'dot4-dot5':
                strokeId = '3';
                nextConnection = 'dot3-dot1'; // Optionally loop back or end the sequence
                arrow3.style.display = 'none';
                button.style.display = 'block';
                congrats.style.display = 'block';
                dot4.style.display = 'none';
                dot5.style.display = 'none';
                break;
        }

        if (strokeId) {
            document.getElementById('stroke' + strokeId).style.display = 'block';

        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        alert('Complete the line near the correct dot. Try Again!');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    }
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);