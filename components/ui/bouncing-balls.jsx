"use client";

import { useEffect, useRef } from "react";

export default function BouncingBalls() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Ball class
        class Ball {
            constructor(x, y, radius, vx, vy) {
                this.x = x !== undefined ? x : Math.random() * canvas.width;
                this.y = y !== undefined ? y : Math.random() * canvas.height;
                this.radius = radius !== undefined ? radius : Math.random() * 30 + 15; // 15-45px radius
                this.vx = vx !== undefined ? vx : (Math.random() - 0.5) * 3; // velocity x
                this.vy = vy !== undefined ? vy : (Math.random() - 0.5) * 3; // velocity y
                
                // White color only
                this.color = 'rgba(255, 255, 255, 0.2)';
                this.glowColor = 'rgba(255, 255, 255, 0.5)';
            }

            update() {
                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.vx = -this.vx;
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.vy = -this.vy;
                }

                // Keep within bounds
                this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
                this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
            }

            draw(ctx) {
                // Draw glow
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius * 2
                );
                gradient.addColorStop(0, this.glowColor);
                gradient.addColorStop(0.5, this.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
                ctx.fill();

                // Draw ball
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();

                // Draw border
                ctx.strokeStyle = this.glowColor;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            isClicked(mouseX, mouseY) {
                const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
                return distance <= this.radius;
            }

            split() {
                // Only split if ball is large enough
                if (this.radius < 10) return [];

                const newRadius = this.radius / 2;
                const newBalls = [];
                
                // Create 3-5 smaller balls
                const numNewBalls = Math.floor(Math.random() * 3) + 3; // 3-5 balls
                
                for (let i = 0; i < numNewBalls; i++) {
                    const angle = (Math.PI * 2 * i) / numNewBalls;
                    const speed = Math.random() * 2 + 2; // 2-4 speed
                    const vx = Math.cos(angle) * speed;
                    const vy = Math.sin(angle) * speed;
                    
                    newBalls.push(new Ball(
                        this.x,
                        this.y,
                        newRadius,
                        vx,
                        vy
                    ));
                }
                
                return newBalls;
            }
        }

        // Snake class
        class Snake {
            constructor() {
                this.segments = [];
                this.length = 15;
                this.segmentSize = 10;
                this.segmentSpacing = 8;
                this.speed = 0.15;
                this.score = 0;
                
                // Initialize snake segments
                const startX = canvas.width / 2;
                const startY = canvas.height / 2;
                for (let i = 0; i < this.length; i++) {
                    this.segments.push({
                        x: startX - i * this.segmentSpacing,
                        y: startY
                    });
                }
            }

            update(targetX, targetY) {
                // Move head towards target with smooth interpolation
                const head = this.segments[0];
                const dx = targetX - head.x;
                const dy = targetY - head.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 1) {
                    const moveX = (dx / distance) * Math.min(distance, 5);
                    const moveY = (dy / distance) * Math.min(distance, 5);
                    
                    // Add new head position
                    this.segments.unshift({
                        x: head.x + moveX,
                        y: head.y + moveY
                    });

                    // Keep only the required length
                    while (this.segments.length > this.length) {
                        this.segments.pop();
                    }
                }

                // Smooth out the segments to follow each other
                for (let i = 1; i < this.segments.length; i++) {
                    const prev = this.segments[i - 1];
                    const current = this.segments[i];
                    
                    const dx = prev.x - current.x;
                    const dy = prev.y - current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist > this.segmentSpacing) {
                        const ratio = (dist - this.segmentSpacing) / dist;
                        current.x += dx * ratio * this.speed;
                        current.y += dy * ratio * this.speed;
                    }
                }
            }

            draw(ctx) {
                // Draw connections between segments
                ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
                ctx.lineWidth = this.segmentSize * 1.5;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                ctx.beginPath();
                if (this.segments.length > 0) {
                    ctx.moveTo(this.segments[0].x, this.segments[0].y);
                    for (let i = 1; i < this.segments.length; i++) {
                        ctx.lineTo(this.segments[i].x, this.segments[i].y);
                    }
                    ctx.stroke();
                }

                // Draw snake body segments
                for (let i = this.segments.length - 1; i >= 0; i--) {
                    const segment = this.segments[i];
                    const ratio = i / this.segments.length;
                    const size = this.segmentSize * (0.5 + ratio * 0.5);
                    const alpha = 0.4 + ratio * 0.5;

                    // Glow effect
                    const gradient = ctx.createRadialGradient(
                        segment.x, segment.y, 0,
                        segment.x, segment.y, size * 2.5
                    );
                    gradient.addColorStop(0, `rgba(34, 197, 94, ${alpha * 0.6})`);
                    gradient.addColorStop(0.5, `rgba(34, 197, 94, ${alpha * 0.3})`);
                    gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(segment.x, segment.y, size * 2.5, 0, Math.PI * 2);
                    ctx.fill();

                    // Snake segment body
                    ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(segment.x, segment.y, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Segment border
                    ctx.strokeStyle = `rgba(134, 239, 172, ${alpha + 0.2})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                // Draw snake head (special styling)
                if (this.segments.length > 0) {
                    const head = this.segments[0];
                    const headSize = this.segmentSize * 1.3;
                    
                    // Head outer glow
                    const headGradient = ctx.createRadialGradient(
                        head.x, head.y, 0,
                        head.x, head.y, headSize * 3
                    );
                    headGradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');
                    headGradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.4)');
                    headGradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                    
                    ctx.fillStyle = headGradient;
                    ctx.beginPath();
                    ctx.arc(head.x, head.y, headSize * 3, 0, Math.PI * 2);
                    ctx.fill();

                    // Head body
                    ctx.fillStyle = 'rgba(34, 197, 94, 0.95)';
                    ctx.beginPath();
                    ctx.arc(head.x, head.y, headSize, 0, Math.PI * 2);
                    ctx.fill();

                    // Head border
                    ctx.strokeStyle = 'rgba(134, 239, 172, 1)';
                    ctx.lineWidth = 2.5;
                    ctx.stroke();

                    // Draw eyes
                    if (this.segments.length > 1) {
                        const neck = this.segments[1];
                        const angle = Math.atan2(head.y - neck.y, head.x - neck.x);
                        
                        const eyeOffset = headSize * 0.4;
                        const eyeSize = headSize * 0.2;
                        
                        // Left eye
                        const leftEyeX = head.x + Math.cos(angle + Math.PI / 4) * eyeOffset;
                        const leftEyeY = head.y + Math.sin(angle + Math.PI / 4) * eyeOffset;
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                        ctx.beginPath();
                        ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
                        ctx.fill();
                        
                        // Right eye
                        const rightEyeX = head.x + Math.cos(angle - Math.PI / 4) * eyeOffset;
                        const rightEyeY = head.y + Math.sin(angle - Math.PI / 4) * eyeOffset;
                        ctx.beginPath();
                        ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
                        ctx.fill();

                        // Pupils
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                        ctx.beginPath();
                        ctx.arc(leftEyeX, leftEyeY, eyeSize * 0.5, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(rightEyeX, rightEyeY, eyeSize * 0.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // Draw score
                ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
                ctx.font = 'bold 16px monospace';
                ctx.fillText(`Score: ${this.score}`, 20, 30);
            }

            checkCollision(ball) {
                if (this.segments.length === 0) return false;
                
                const head = this.segments[0];
                const distance = Math.sqrt((head.x - ball.x) ** 2 + (head.y - ball.y) ** 2);
                return distance <= (this.segmentSize * 1.3 + ball.radius);
            }

            grow() {
                this.length += 3;
                this.score++;
                
                // Add segments at the tail
                if (this.segments.length > 0) {
                    const tail = this.segments[this.segments.length - 1];
                    for (let i = 0; i < 3; i++) {
                        this.segments.push({ x: tail.x, y: tail.y });
                    }
                }
            }
        }

        // Create balls
        const balls = [];
        const numberOfBalls = Math.floor((canvas.width * canvas.height) / 50000); // Responsive number of balls
        
        for (let i = 0; i < Math.min(numberOfBalls, 10); i++) {
            balls.push(new Ball());
        }

        // Create snake
        const snake = new Snake();
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        // Handle mouse move
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        };

        // Handle click
        const handleClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;

            let ballClicked = false;

            // Check if any ball was clicked
            for (let i = balls.length - 1; i >= 0; i--) {
                if (balls[i].isClicked(clickX, clickY)) {
                    const newBalls = balls[i].split();
                    
                    // Remove clicked ball and add new ones
                    balls.splice(i, 1);
                    balls.push(...newBalls);
                    
                    // Limit total number of balls
                    if (balls.length > 50) {
                        balls.splice(0, balls.length - 50);
                    }
                    
                    ballClicked = true;
                    event.stopPropagation();
                    break; // Only split one ball per click
                }
            }

            // If no ball was clicked, let the click pass through
            if (!ballClicked) {
                canvas.style.pointerEvents = 'none';
                const elementBelow = document.elementFromPoint(event.clientX, event.clientY);
                canvas.style.pointerEvents = 'auto';
                if (elementBelow) {
                    elementBelow.click();
                }
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw balls
            for (let i = balls.length - 1; i >= 0; i--) {
                balls[i].update();
                balls[i].draw(ctx);

                // Check if snake ate the ball
                if (snake.checkCollision(balls[i])) {
                    balls.splice(i, 1);
                    snake.grow();
                    
                    // Add new ball to keep the game going
                    if (balls.length < 5) {
                        balls.push(new Ball());
                    }
                }
            }

            // Update and draw snake
            snake.update(mouseX, mouseY);
            snake.draw(ctx);

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 cursor-pointer"
            style={{ opacity: 0.6, zIndex: 60, pointerEvents: 'auto' }}
        />
    );
}
