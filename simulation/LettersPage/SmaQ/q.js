
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const dot1 = document.getElementById('dot1');
        const dot2 = document.getElementById('dot2');
        const dot3 = document.getElementById('dot3');
        const dot4 = document.getElementById('dot4'); // Added reference to dot4
        const stroke1 = document.getElementById('stroke1');
        const stroke2 = document.getElementById('stroke2');

        const arrow1 = document.getElementById('arrow1');
        const arrow2 = document.getElementById('arrow2');

        let isDrawing = false;
        let startX = 0;
        let startY = 0;
        let tolerance = 30;
        let nextConnection = 'dot4-dot2'; // Start with connecting dot4 to dot2 (reversed)

        arrow1.style.display = 'none'; // Initially, arrow1 is hidden, arrow2 is shown
        arrow2.style.display = 'block';

        function checkDotTolerance(dot, x, y) {
            return Math.hypot(x - (dot.offsetLeft + 5), y - (dot.offsetTop + 5)) <= tolerance;
        }

        function drawToleranceCircle(dot, ctx) {
            ctx.beginPath();
            ctx.arc(dot.offsetLeft + 5, dot.offsetTop + 5, tolerance, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255, 200, 0, 0.5)';
            ctx.stroke();
        }

        function startDrawing(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            let targetDot;

            switch (nextConnection) {
                case 'dot4-dot2': // Now starts with dot4 to dot2
                    targetDot = dot4;
                    break;
                case 'dot3-dot1': // The second connection is now dot3 to dot1
                    targetDot = dot3;
                    break;
            }

            if (!checkDotTolerance(targetDot, x, y)) {
                alert('Please follow rules and draw accordingly. Try again!');
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawToleranceCircle(targetDot, ctx);
            drawToleranceCircle(nextConnection.includes('dot4') ? dot4 : targetDot, ctx);

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
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 6;
        }

        function stopDrawing(e) {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            let targetDot;

            switch (nextConnection) {
                case 'dot4-dot2': // Now handles dot4 to dot2 first
                    targetDot = dot2;
                    break;
                case 'dot3-dot1': // Then handles dot3 to dot1
                    targetDot = dot1;
                    break;
            }

            if (checkDotTolerance(targetDot, x, y)) {
                console.log('Stopped drawing near', targetDot.id);
                let strokeId;
                switch (nextConnection) {
                    case 'dot4-dot2':
                        strokeId = '2';
                        nextConnection = 'dot3-dot1'; // Change the next connection to dot3-dot1
                        arrow2.style.display = 'none';
                        arrow1.style.display = 'block';
                        dot4.style.display = 'none'; // Hide dot4
                        dot2.style.display = 'none'; // Hide dot2
                        dot3.style.display = 'block'; // Show dot3
                        dot3.style.zIndex = '10';
                        stroke2.style.zIndex = '-1';

                        dot1.style.display = 'block'; // Show dot1
                        dot1.style.zIndex = '10';
                        break;
                    case 'dot3-dot1': // Handle the second connection case
                        strokeId = '1';
                        arrow1.style.display = 'none';
                        dot3.style.display = 'none';
                        dot1.style.display = 'none';
                        button.style.display = 'block';
                        congrats.style.display = 'block';
                        break;
                }

                if (strokeId) {
                    document.getElementById('stroke' + strokeId).style.display = 'block';
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                alert('Complete the line near the correct dot. Try Again!');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            isDrawing = false;
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
