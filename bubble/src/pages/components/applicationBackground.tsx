import React, { useEffect, useRef, useState } from 'react';

interface Circle {
    x: number;
    y: number;
    size: number;
    color: string;
    dx: number; // Change in x
    dy: number; // Change in y
}

const ApplicationBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const circles: Circle[] = [];
    const [isClient, setIsClient] = useState(false);

    // Function to create a circle object
    const createCircle = (): Circle => {
        const minSize = 100;
        const maxSize = 150;

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * (maxSize - minSize) + minSize;
        const colors = ['#C8E3F6', '#C8CCF6', '#FFFBCB', '#F5C400'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = (Math.random() - 0.5) * 1.5;
        const dy = (Math.random() - 0.5) * 1.5;
        return { x, y, size, color, dx, dy };
    };

    // Function to draw a circle
    const drawCircle = (ctx: CanvasRenderingContext2D, circle: Circle) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;

        // Set shadow properties
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
        ctx.shadowBlur = 20; // Adjust the blur level as needed
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fill();

        // Reset shadow properties to avoid affecting other drawings
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    };

    // Function to update and draw circles
    const updateCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Update and draw each circle
                circles.forEach(circle => {
                    circle.x += circle.dx;
                    circle.y += circle.dy;

                    if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
                        circle.dx *= -1;
                    }
                    if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
                        circle.dy *= -1;
                    }

                    drawCircle(ctx, circle);
                });
            }
        }
        requestAnimationFrame(updateCanvas);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsClient(true);

            for (let i = 0; i < 10; i++) {
                circles.push(createCircle());
            }

            const handleResize = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            };
            window.addEventListener('resize', handleResize);
            handleResize();

            requestAnimationFrame(updateCanvas);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {isClient && <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />}
        </div>
    );
};

export default ApplicationBackground;
