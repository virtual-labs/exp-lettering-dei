const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const dot3 = document.getElementById('dot3');
        const dot4 = document.getElementById('dot4');
        const dot1 = document.getElementById('dot1');
        const dot5 = document.getElementById('dot5'); // New dot
        const arrow1 = document.getElementById('arrow1');
        const arrow2 = document.getElementById('arrow2');
        const arrow3 = document.getElementById('arrow3'); // New arrow

        let isDrawing = false;
        let startX = 0;
        let startY = 0;
        let tolerance = 30; // Tolerance radius for dot connection
        let nextConnection = 'dot3-dot4'; // Start with connecting dot3 to dot4

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

            if (nextConnection === 'dot3-dot4') {
                expectedDot = dot3;
            } else if (nextConnection === 'dot4-dot1') {
                expectedDot = dot4;
            } else if (nextConnection === 'dot1-dot5') {
                expectedDot = dot1;
            } else {
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

            if (nextConnection === 'dot3-dot4' && Math.hypot(x - (dot4.offsetLeft + 5), y - (dot4.offsetTop + 5)) <= tolerance) {
                document.getElementById('stroke1').style.display = 'block';
                console.log('Stopped drawing near', dot4.id);
                nextConnection = 'dot4-dot1';
                arrow1.style.display = 'none'; // Hide the first arrow
                arrow2.style.display = 'block'; // Show the second arrow
                dot3.style.display = 'none'; // Hide the first dot

                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else if (nextConnection === 'dot4-dot1' && Math.hypot(x - (dot1.offsetLeft + 5), y - (dot1.offsetTop + 5)) <= tolerance) {
                document.getElementById('stroke2').style.display = 'block';
                console.log('Stopped drawing near', dot1.id);
                nextConnection = 'dot1-dot5';
                arrow2.style.display = 'none'; // Hide the second arrow
                arrow3.style.display = 'block'; // Show the third arrow
                dot4.style.display = 'none'; // Hide the second dot

                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else if (nextConnection === 'dot1-dot5' && Math.hypot(x - (dot5.offsetLeft + 5), y - (dot5.offsetTop + 5)) <= tolerance) {
                document.getElementById('stroke3').style.display = 'block';
                console.log('Stopped drawing near', dot5.id);
                arrow3.style.display = 'none'; // Hide the third arrow
                dot5.style.display = 'none'; // Hide the last dot
                button.style.display = 'block'; // Show the button 
                congrats.style.display = 'block'; // Show the congratulation message   
                nextConnection = ''; // All connections done

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
