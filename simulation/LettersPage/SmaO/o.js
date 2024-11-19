const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const dot2 = document.getElementById('dot2');
        const dot4 = document.getElementById('dot4'); // Now focus on dot4-dot2

        const arrow2 = document.getElementById('arrow2');

        let isDrawing = false;
        let startX = 0;
        let startY = 0;
        let tolerance = 30;
        let nextConnection = 'dot4-dot2'; // Start with connecting dot4 to dot2

        arrow2.style.display = 'block'; // Initially, arrow2 is visible

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
            let targetDot = dot4; // Always target dot4

            if (!checkDotTolerance(targetDot, x, y)) {
                alert('Please follow rules and draw accordingly. Try again!');
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawToleranceCircle(targetDot, ctx);
            drawToleranceCircle(dot4, ctx);

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
            let targetDot = dot2; // Now only checking for dot2

            if (checkDotTolerance(targetDot, x, y)) {
                console.log('Stopped drawing near', targetDot.id);
                let strokeId = '2'; // We are now only handling stroke 2
                arrow2.style.display = 'none';
                dot4.style.display = 'none';
                dot2.style.display = 'none';
                button.style.display = 'block';
                congrats.style.display = 'block';

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