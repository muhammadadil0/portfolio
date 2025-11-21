"use client";

import { useEffect, useRef } from "react";

export default function FallingText() {
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

        // Tech-related words and symbols
        const words = [
            'CODE', 'DEV', 'AI', 'ML', 'API', 'UI', 'UX',
            'REACT', 'NODE', 'PYTHON', 'FLUTTER', 'DJANGO',
            'DATA', 'CLOUD', 'WEB', 'APP', 'TECH',
            '{', '}', '<', '>', '(', ')', '[', ']',
            '0', '1', '01', '10', '101', '010',
            '///', '/**/', '===', '=>', '!=', '++',
        ];

        // Falling text class
        class FallingText {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -50;
                this.text = words[Math.floor(Math.random() * words.length)];
                this.speed = Math.random() * 1 + 0.5; // 0.5-1.5 speed
                this.fontSize = Math.random() * 10 + 12; // 12-22px
                this.opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4 opacity
                
                // Random colors
                const colors = [
                    `rgba(255, 255, 255, ${this.opacity})`,
                    `rgba(147, 197, 253, ${this.opacity})`, // light blue
                    `rgba(196, 181, 253, ${this.opacity})`, // light purple
                    `rgba(134, 239, 172, ${this.opacity})`, // light green
                    `rgba(253, 224, 71, ${this.opacity})`,  // light yellow
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                
                // Random rotation
                this.rotation = Math.random() * 0.2 - 0.1; // -0.1 to 0.1 radians
            }

            update() {
                this.y += this.speed;
                
                // Reset when off screen
                if (this.y > canvas.height + 50) {
                    this.y = -50;
                    this.x = Math.random() * canvas.width;
                    this.text = words[Math.floor(Math.random() * words.length)];
                }
            }

            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.font = `${this.fontSize}px 'Courier New', monospace`;
                ctx.fillStyle = this.color;
                ctx.textAlign = 'center';
                ctx.fillText(this.text, 0, 0);
                ctx.restore();
            }
        }

        // Create falling texts
        const texts = [];
        const numberOfTexts = Math.floor(canvas.width / 100); // Responsive number
        
        for (let i = 0; i < Math.min(numberOfTexts, 30); i++) {
            const text = new FallingText();
            text.y = Math.random() * canvas.height; // Spread them out initially
            texts.push(text);
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            texts.forEach(text => {
                text.update();
                text.draw(ctx);
            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.5 }}
        />
    );
}
