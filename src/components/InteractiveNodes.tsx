import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  createdAt: number;
  opacity: number;
}

const InteractiveNodes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();
  const lastNodeTimeRef = useRef(0);

  const NODE_LIFETIME = 2500;
  const MAX_NODES = 25;
  const NODE_SIZE = 5;
  const CONNECTION_DISTANCE = 200;
  const NODE_SPAWN_INTERVAL = 80;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const addNode = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastNodeTimeRef.current < NODE_SPAWN_INTERVAL) return;
    
    lastNodeTimeRef.current = now;
    
    // Add more spread to position
    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = (Math.random() - 0.5) * 100;
    
    nodesRef.current.push({
      x: x + offsetX,
      y: y + offsetY,
      createdAt: now,
      opacity: 1,
    });

    // Limit nodes
    if (nodesRef.current.length > MAX_NODES) {
      nodesRef.current.shift();
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const now = Date.now();

    // Fill dark background, then clear for transparent overlay
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Filter expired nodes and update opacity
    nodesRef.current = nodesRef.current.filter((node) => {
      const age = now - node.createdAt;
      if (age >= NODE_LIFETIME) return false;
      node.opacity = 1 - age / NODE_LIFETIME;
      return true;
    });

    const nodes = nodesRef.current;
    const mouse = mouseRef.current;

    // Draw connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE) {
          const opacity = (1 - distance / CONNECTION_DISTANCE) * 
                         Math.min(nodes[i].opacity, nodes[j].opacity) * 0.6;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.25})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw connection to mouse if active
      if (mouse.active) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE * 1.5) {
          const opacity = (1 - distance / (CONNECTION_DISTANCE * 1.5)) * 
                         nodes[i].opacity * 0.7;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 170, ${opacity * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes with glow effect
    nodes.forEach((node) => {
      // Outer glow
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, NODE_SIZE * 2);
      gradient.addColorStop(0, `rgba(0, 240, 255, ${node.opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(0, 240, 255, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(node.x, node.y, NODE_SIZE * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Core node
      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 240, 255, ${node.opacity * 0.5})`;
      ctx.arc(node.x, node.y, NODE_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Cursor node removed - only connections to cursor remain

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      addNode(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY, active: true };
        addNode(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY, active: true };
        addNode(touch.clientX, touch.clientY);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas, addNode, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default InteractiveNodes;
