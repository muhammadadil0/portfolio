"use client";

import { useEffect, useRef } from "react";

const codeSnippets = [
  "const fetchData = async () => {",
  "  const response = await fetch('/api/data');",
  "  return response.json();",
  "};",
  "",
  "function calculateHash(data) {",
  "  let hash = 0;",
  "  for (let i = 0; i < data.length; i++) {",
  "    hash = ((hash << 5) - hash) + data.charCodeAt(i);",
  "  }",
  "  return hash;",
  "}",
  "",
  "class NetworkScanner {",
  "  constructor(target) {",
  "    this.target = target;",
  "    this.ports = [];",
  "  }",
  "  scan() {",
  "    console.log('Scanning...');",
  "  }",
  "}",
  "",
  "const encrypt = (text, key) => {",
  "  return text.split('').map((char, i) => {",
  "    return String.fromCharCode(",
  "      char.charCodeAt(0) ^ key.charCodeAt(i % key.length)",
  "    );",
  "  }).join('');",
  "};",
  "",
  "async function* dataStream() {",
  "  for (let i = 0; i < 100; i++) {",
  "    yield await processChunk(i);",
  "  }",
  "}",
];

export default function HackerBackground() {
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

    const lines = [];
    const maxLines = 8;
    const lineHeight = 20;
    const charWidth = 9;
    const typingSpeed = 50;

    class CodeLine {
      constructor(y) {
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.displayText = "";
        this.x = Math.random() * (canvas.width - 600);
        this.y = y;
        this.charIndex = 0;
        this.lastUpdate = Date.now();
        this.opacity = 0.15;
        this.complete = false;
      }

      update() {
        if (this.complete) return;

        const now = Date.now();
        if (now - this.lastUpdate > typingSpeed) {
          if (this.charIndex < this.text.length) {
            this.displayText += this.text[this.charIndex];
            this.charIndex++;
            this.lastUpdate = now;
          } else {
            this.complete = true;
          }
        }
      }

      draw(ctx) {
        ctx.font = "14px 'Courier New', monospace";
        ctx.fillStyle = `rgba(34, 197, 94, ${this.opacity})`;
        ctx.fillText(this.displayText, this.x, this.y);

        if (this.charIndex < this.text.length) {
          ctx.fillStyle = `rgba(34, 197, 94, ${this.opacity * 2})`;
          ctx.fillRect(
            this.x + this.displayText.length * charWidth,
            this.y - 12,
            8,
            14
          );
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (lines.length < maxLines) {
        const newY = lines.length > 0
          ? lines[lines.length - 1].y + lineHeight * 2
          : 50;
        if (newY < canvas.height - 50) {
          lines.push(new CodeLine(newY));
        }
      }

      const allComplete = lines.every(line => line.complete);
      if (allComplete && lines.length > 0) {
        lines.length = 0;
      }

      lines.forEach(line => {
        line.update();
        line.draw(ctx);
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
      style={{ opacity: 0.6 }}
    />
  );
}
