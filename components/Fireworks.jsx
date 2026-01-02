import { useEffect, useRef } from "react";

export default function FireworksCanvas({ enabled = false }) {
  const canvasRef = useRef(null);
  const fireworks = useRef([]);
  const particles = useRef([]);
  const clickCount = useRef(0);
  const rafRef = useRef(null);
  const autoIntervalRef = useRef(null);

  // ===== AUDIO: create new Audio instance on each play (allows overlap & randomness)
  const soundsBase = "/sounds";
  const launchUrl = encodeURI(`${soundsBase}/meluncur.mp3`);
  const explodeUrl = encodeURI(`${soundsBase}/meledug.mp3`);
  // keep both original (with spaces) and safer filenames as options
  const secretUrls = [
    encodeURI(`${soundsBase}/HIDUP BLONDE!.mp3`),
    encodeURI(`${soundsBase}/HIDUP JOKOWI!.mp3`),
    encodeURI(`${soundsBase}/HIDUP_BLONDE.mp3`),
    encodeURI(`${soundsBase}/HIDUP_JOKOWI.mp3`),
  ];

  function playSound(url, { volume = 0.6, playbackRate = 1 } = {}) {
    try {
      const a = new Audio(url);
      a.volume = volume;
      a.playbackRate = playbackRate;
      a.preload = "auto";
      a.play().catch(() => {});
    } catch {}
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "lighter";

    let dpr = window.devicePixelRatio || 1;
    function resize() {
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);

    const MAX_ROCKETS = 10;

    function loop() {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // update rockets
      for (let i = fireworks.current.length - 1; i >= 0; i--) {
        const f = fireworks.current[i];
        f.update();
        f.draw(ctx);
        if (f.done) fireworks.current.splice(i, 1);
      }

      // update particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.update();
        p.draw(ctx);
        if (
          p.life <= 0 ||
          p.x < -100 ||
          p.x > canvas.width + 100 ||
          p.y > canvas.height + 200
        ) {
          particles.current.splice(i, 1);
        }
      }
    }
    loop();

    // click to launch
    const handleClick = (e) => {
      if (!enabled) return;
      if (fireworks.current.length >= MAX_ROCKETS) return;

      clickCount.current++;

      // every 5th click: play a secret random sound
      if (clickCount.current % 5 === 0) {
        const chosen =
          secretUrls[Math.floor(Math.random() * secretUrls.length)];
        playSound(chosen, {
          volume: 0.75,
          playbackRate: 0.95 + Math.random() * 0.15,
        });
      }

      const tx = e.clientX * dpr;
      const ty = e.clientY * dpr;
      fireworks.current.push(
        new Firework(tx, ty, { fromX: tx + (Math.random() - 0.5) * 300 * dpr })
      );
    };

    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
      fireworks.current.length = 0;
      particles.current.length = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once

  // auto spawn when enabled changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function spawnCluster(n = 1) {
      const dpr = window.devicePixelRatio || 1;
      for (let i = 0; i < n; i++) {
        const tx = (0.08 + Math.random() * 0.84) * canvas.width;
        const ty = (0.08 + Math.random() * 0.45) * canvas.height;
        fireworks.current.push(
          new Firework(tx, ty, {
            fromX: tx + (Math.random() - 0.5) * 500 * dpr,
          })
        );
      }
    }

    if (enabled) {
      // immediate celebration
      spawnCluster(5);
      // periodic clusters to make it meriah
      autoIntervalRef.current = setInterval(() => {
        const cluster =
          Math.random() < 0.35 ? Math.floor(Math.random() * 4) + 1 : 1;
        spawnCluster(cluster);
      }, 600);
    } else {
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    }

    return () => {
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    };
  }, [enabled]);

  // ===== ROCKET / PARTICLE CLASSES =====
  class Firework {
    constructor(tx, ty, opts = {}) {
      this.tx = tx;
      this.ty = ty;
      this.x = opts.fromX ?? tx;
      this.y = canvasRef.current.height;
      this.speed = 10 + Math.random() * 6;
      this.done = false;
      this.lastX = this.x;
      this.lastY = this.y;
      this.sparkle = Math.random() < 0.28;

      // play launch sound when rocket is created (works for manual & auto launches)
      // (new Audio instance created inside playSound)
      try {
        playSound(launchUrl, {
          volume: 0.36,
          playbackRate: 0.9 + Math.random() * 0.3,
        });
      } catch {}
    }

    update() {
      this.lastX = this.x;
      this.lastY = this.y;

      // move toward target with a bit of randomness
      const dx = this.tx - this.x;
      const dy = this.ty - this.y;
      this.x += dx * 0.06 + (Math.random() - 0.5) * 0.8;
      this.y += dy * 0.06 - this.speed * 0.02;

      if (
        Math.hypot(this.x - this.tx, this.y - this.ty) < 8 ||
        this.y <= this.ty
      ) {
        this.done = true;
        explode(this.x, this.y, this.sparkle);
        // explosion sound (always plays, new instance)
        playSound(explodeUrl, {
          volume: 0.6,
          playbackRate: 0.9 + Math.random() * 0.4,
        });
        // small chance to play a secret sound too
        if (Math.random() < 0.12) {
          const s = secretUrls[Math.floor(Math.random() * secretUrls.length)];
          playSound(s, {
            volume: 0.6,
            playbackRate: 0.95 + Math.random() * 0.2,
          });
        }
      }
    }

    draw(ctx) {
      const dx = this.x - this.lastX;
      const dy = this.y - this.lastY;

      ctx.strokeStyle = "rgba(255,220,150,0.95)";
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(255,200,110,0.95)";

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - dx * 2.5, this.y - dy * 2.5);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - dx, this.y - dy);
      ctx.stroke();
    }
  }

  function explode(x, y, sparkle = false) {
    const baseCount = Math.floor(Math.random() * 70) + 30;
    const hue = Math.random() * 360;
    const shape = Math.random();

    // main burst
    for (let i = 0; i < baseCount; i++) {
      const angle =
        (Math.PI * 2 * i) / baseCount + (Math.random() - 0.5) * 0.15;
      const speed = 2 + Math.random() * 6;
      particles.current.push(new Particle(x, y, angle, speed, hue, 0));
    }

    // variation: ring or glitter or mini bursts
    if (shape < 0.35) {
      const ringCount = Math.floor(12 + Math.random() * 30);
      for (let i = 0; i < ringCount; i++) {
        const angle = (Math.PI * 2 * i) / ringCount;
        particles.current.push(
          new Particle(
            x,
            y,
            angle,
            6 + Math.random() * 4,
            (hue + 40) % 360,
            1,
            true
          )
        );
      }
    } else if (shape < 0.6) {
      for (let i = 0; i < 30; i++) {
        const angle = Math.PI * 2 * Math.random();
        particles.current.push(
          new Particle(x, y, angle, 1 + Math.random() * 3, hue, 0, false, true)
        );
      }
    }

    // delayed mini bursts sometimes
    if (Math.random() < 0.5) {
      setTimeout(() => {
        for (let j = 0; j < 3; j++) {
          const mx = x + (Math.random() - 0.5) * 60;
          const my = y + (Math.random() - 0.5) * 60;
          const cnt = 12 + Math.floor(Math.random() * 24);
          const addHue = Math.random() * 80 - 40;
          for (let i = 0; i < cnt; i++) {
            const angle = (Math.PI * 2 * i) / cnt + (Math.random() - 0.5) * 0.2;
            particles.current.push(
              new Particle(
                mx,
                my,
                angle,
                2 + Math.random() * 4,
                (hue + addHue) % 360,
                0
              )
            );
          }
        }
      }, 120 + Math.random() * 260);
    }

    // sparkle extras
    if (sparkle) {
      for (let i = 0; i < 20; i++) {
        const angle = Math.PI * 2 * Math.random();
        particles.current.push(
          new Particle(
            x,
            y,
            angle,
            1 + Math.random() * 5,
            (hue + Math.random() * 120) % 360,
            0,
            false,
            true
          )
        );
      }
    }
  }

  class Particle {
    constructor(x, y, angle, speed, hue, type = 0, ring = false, tiny = false) {
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = tiny ? 30 + Math.random() * 30 : 70 + Math.random() * 60;
      this.hue = hue;
      this.type = type;
      this.ring = ring;
      this.tiny = tiny;
      this.size = tiny ? 0.6 + Math.random() * 1.6 : 1 + Math.random() * 2.4;
      this.decay = 0.985 - Math.random() * 0.01;
    }

    update() {
      this.vy += 0.03 + (this.tiny ? 0.01 : 0);
      this.vx *= this.decay;
      this.vy *= this.decay;
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
    }

    draw(ctx) {
      const alpha = Math.max(0, Math.min(1, this.life / 100));
      ctx.lineWidth = this.tiny ? 1 : 2;
      ctx.shadowBlur = this.tiny ? 8 : 20;
      ctx.shadowColor = `hsl(${this.hue},100%,60%)`;
      ctx.strokeStyle = `hsla(${this.hue},100%,65%,${alpha})`;

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - this.vx * (this.tiny ? 2 : 3.5),
        this.y - this.vy * (this.tiny ? 2 : 3.5)
      );
      ctx.stroke();

      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = this.tiny ? 0.6 : 1;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - this.vx * (this.tiny ? 1 : 2),
        this.y - this.vy * (this.tiny ? 1 : 2)
      );
      ctx.stroke();
    }
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
