import { useEffect, useRef } from "react";

const INK = "23, 27, 55";
const ink = (a: number) => `rgba(${INK}, ${a.toFixed(3)})`;

// Timing (ms from animation start)
const NODE_INTERVAL  = 250;   // Gen 1: ms between node reveals
const GEN2_DELAY     = 800;   // pause after last node before first edge
const GEN2_INTERVAL  = 375;   // ms between Gen 2 edge reveals
const GEN3_PAUSE     = 700;   // pause between Gen 2 and Gen 3
const GEN3_INTERVAL  = 900;   // ms between Gen 3 edge reveals
const GEN4_PAUSE     = 1100;  // pause between Gen 3 and Gen 4
const GEN4_INTERVAL  = 1500;  // ms between Gen 4 edge reveals
const PULSE_DELAY    = 3600;  // ms after last edge reveal → coherence pulse

// Ripple
const HOP_MS         = 158;
const RIPPLE_FADE_MIN = 1400;
const RIPPLE_FADE_PER = 230;  // +ms per connection at source

// Interaction
const HOVER_R        = 30;

interface VNode {
  id: number;
  x: number; y: number;
  r: number;
  breath: number;
  revealTime: number;
}

interface VEdge {
  a: number; b: number;
  gen: 2 | 3 | 4;
  revealTime: number;
  drawDuration: number;
}

interface Ripple {
  nodeHit: Map<number, number>;
  edgeHit: Map<string, number>;
  fade: number;
  peak: number; // 0.35–1.0 — scales with source degree
}

function ekey(a: number, b: number) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

function buildNetwork(W: number, H: number, t0: number) {
  const nodes: VNode[] = [];
  const edges: VEdge[] = [];
  const seen  = new Set<string>();
  let   nid   = 0;

  // Four cluster centres in NW/NE/SW/SE arrangement
  const centres = [
    [0.26, 0.27],
    [0.74, 0.23],
    [0.27, 0.74],
    [0.73, 0.75],
  ].map(([px, py]) => ({
    x: px * W + (Math.random() - 0.5) * W * 0.04,
    y: py * H + (Math.random() - 0.5) * H * 0.04,
  }));

  const clusterIds: number[][] = [[], [], [], []];

  // Place 4 nodes per cluster
  for (let c = 0; c < 4; c++) {
    const { x: cx, y: cy } = centres[c];
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.random() * 0.9;
      const rad   = 28 + Math.random() * 20;
      nodes.push({
        id: nid,
        x: cx + Math.cos(angle) * rad,
        y: cy + Math.sin(angle) * rad,
        r: 3.5 + Math.random() * 1.5,
        breath: Math.random() * Math.PI * 2,
        revealTime: 0,
      });
      clusterIds[c].push(nid);
      nid++;
    }
  }

  // Gen 1 reveal: interleave across clusters so the whole canvas populates
  const order = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3];
  const ci    = [0, 0, 0, 0];
  order.forEach((c, i) => {
    const ni = clusterIds[c][ci[c]++];
    nodes[ni].revealTime = t0 + i * NODE_INTERVAL;
  });

  const lastNodeReveal = t0 + 15 * NODE_INTERVAL; // node 15 at 3750 ms

  const push = (a: number, b: number, gen: 2 | 3 | 4, rt: number, dur: number) => {
    const k = ekey(a, b);
    if (seen.has(k)) return;
    seen.add(k);
    edges.push({ a, b, gen, revealTime: rt, drawDuration: dur });
  };

  // Gen 2: within-cluster ring + one diagonal — cluster by cluster
  let et = lastNodeReveal + GEN2_DELAY;
  for (let c = 0; c < 4; c++) {
    const [n0, n1, n2, n3] = clusterIds[c];
    const ring: [number, number][] = [[n0,n1],[n1,n2],[n2,n3],[n3,n0]];
    const diag: [number, number]   = Math.random() < 0.5 ? [n0,n2] : [n1,n3];
    for (const [a, b] of [...ring, diag]) { push(a, b, 2, et, 420); et += GEN2_INTERVAL; }
  }

  // Gen 3: adjacent cross-cluster pairs (NW–NE, NW–SW, NE–SE, SW–SE)
  et += GEN3_PAUSE;
  const adjPairs: [number, number][] = [[0,1],[0,2],[1,3],[2,3]];
  for (const [ca, cb] of adjPairs) {
    const pairs = clusterIds[ca].flatMap(an =>
      clusterIds[cb].map(bn => ({
        d: Math.hypot(nodes[an].x - nodes[bn].x, nodes[an].y - nodes[bn].y),
        a: an, b: bn,
      }))
    ).sort((x, y) => x.d - y.d);

    push(pairs[0].a, pairs[0].b, 3, et, 650); et += GEN3_INTERVAL;
    if (pairs[1] && pairs[1].d < pairs[0].d * 1.85) {
      push(pairs[1].a, pairs[1].b, 3, et + 200, 650); et += GEN3_INTERVAL;
    }
  }

  // Gen 4: diagonal integration — the long cross-canvas connections
  et += GEN4_PAUSE;
  for (const [ca, cb] of [[0,3],[1,2]] as [number,number][]) {
    let best = { d: Infinity, a: -1, b: -1 };
    for (const an of clusterIds[ca]) {
      for (const bn of clusterIds[cb]) {
        const d = Math.hypot(nodes[an].x - nodes[bn].x, nodes[an].y - nodes[bn].y);
        if (d < best.d) best = { d, a: an, b: bn };
      }
    }
    if (best.a >= 0) { push(best.a, best.b, 4, et, 950); et += GEN4_INTERVAL; }
  }

  return { nodes, edges, autoPulseTime: et + PULSE_DELAY };
}

export function HeroAnimation() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const sizeRef   = useRef({ W: 0, H: 0 });

  const nodesRef    = useRef<VNode[]>([]);
  const edgesRef    = useRef<VEdge[]>([]);
  const adjRef      = useRef<Map<number, Set<number>>>(new Map());
  const degreeRef   = useRef<Map<number, number>>(new Map());
  const revealedRef = useRef<Set<string>>(new Set());
  const pulseAtRef  = useRef(Infinity);
  const pulsedRef   = useRef(false);

  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const hoveredRef = useRef<number | null>(null);
  const rippleRef  = useRef<Ripple | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap   = wrapRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const dpr    = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      sizeRef.current = { W: rect.width, H: rect.height };
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width  = `${Math.round(rect.width)}px`;
      canvas.style.height = `${Math.round(rect.height)}px`;
      if (rect.width > 0 && nodesRef.current.length === 0) {
        const result = buildNetwork(rect.width, rect.height, performance.now());
        nodesRef.current = result.nodes;
        edgesRef.current = result.edges;
        pulseAtRef.current = result.autoPulseTime;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const computeRipple = (sourceId: number, now: number, overrideFade?: number): Ripple => {
      const deg  = adjRef.current.get(sourceId)?.size ?? 0;
      const fade = overrideFade ?? (RIPPLE_FADE_MIN + deg * RIPPLE_FADE_PER);
      const peak = 0.35 + Math.min(deg, 6) / 6 * 0.65;
      const nodeHit = new Map<number, number>();
      const edgeHit = new Map<string, number>();
      const queue   = [{ id: sourceId, t: now }];
      nodeHit.set(sourceId, now);
      while (queue.length) {
        const { id, t } = queue.shift()!;
        for (const nb of (adjRef.current.get(id) ?? new Set())) {
          if (nodeHit.has(nb)) continue;
          const nt = t + HOP_MS;
          nodeHit.set(nb, nt);
          edgeHit.set(ekey(id, nb), t + HOP_MS * 0.55);
          queue.push({ id: nb, t: nt });
        }
      }
      return { nodeHit, edgeHit, fade, peak };
    };

    const tick = (now: number) => {
      const { W, H } = sizeRef.current;
      const nodes    = nodesRef.current;
      const edges    = edgesRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (!nodes.length) { rafRef.current = requestAnimationFrame(tick); return; }

      // Reveal edges → update adjacency + degree
      for (const edge of edges) {
        const k = ekey(edge.a, edge.b);
        if (now >= edge.revealTime && !revealedRef.current.has(k)) {
          revealedRef.current.add(k);
          [edge.a, edge.b].forEach(id => {
            if (!adjRef.current.has(id)) adjRef.current.set(id, new Set());
          });
          adjRef.current.get(edge.a)!.add(edge.b);
          adjRef.current.get(edge.b)!.add(edge.a);
          degreeRef.current.set(edge.a, (degreeRef.current.get(edge.a) ?? 0) + 1);
          degreeRef.current.set(edge.b, (degreeRef.current.get(edge.b) ?? 0) + 1);
        }
      }

      // Coherence pulse — fires once after all Gen 4 edges are drawn
      if (!pulsedRef.current && now >= pulseAtRef.current) {
        pulsedRef.current = true;
        let bestId = 0, bestD = Infinity;
        for (const n of nodes) {
          const d = Math.hypot(n.x - W / 2, n.y - H / 2);
          if (d < bestD) { bestD = d; bestId = n.id; }
        }
        rippleRef.current = computeRipple(bestId, now, 4800);
        hoveredRef.current = null;
      }

      // Hover
      const { x: mx, y: my } = mouseRef.current;
      let hoverTarget: number | null = null, hoverDist = HOVER_R;
      for (const n of nodes) {
        if (now < n.revealTime + 280) continue;
        const d = Math.hypot(mx - n.x, my - n.y);
        if (d < hoverDist) { hoverDist = d; hoverTarget = n.id; }
      }
      if (hoverTarget !== hoveredRef.current) {
        hoveredRef.current = hoverTarget;
        if (hoverTarget !== null) rippleRef.current = computeRipple(hoverTarget, now);
      }

      const ripple = rippleRef.current;
      const nodeBright = (id: number): number => {
        if (!ripple) return 0;
        const hit = ripple.nodeHit.get(id);
        if (hit === undefined || now < hit) return 0;
        return Math.max(0, 1 - (now - hit) / ripple.fade) * ripple.peak;
      };
      const edgeBright = (k: string): number => {
        if (!ripple) return 0;
        const hit = ripple.edgeHit.get(k);
        if (hit === undefined || now < hit) return 0;
        return Math.max(0, 1 - (now - hit) / ripple.fade) * ripple.peak;
      };

      // ── Draw edges ─────────────────────────────────────────────────────
      for (const edge of edges) {
        if (now < edge.revealTime) continue;
        const na = nodes[edge.a], nb = nodes[edge.b];
        if (!na || !nb) continue;

        const dp  = Math.min(1, (now - edge.revealTime) / edge.drawDuration);
        if (dp < 0.01) continue;

        const tx  = na.x + (nb.x - na.x) * dp;
        const ty  = na.y + (nb.y - na.y) * dp;
        const k   = ekey(edge.a, edge.b);
        const eb  = edgeBright(k);

        // Gen 4 edges get a wide soft halo — they carry more trust
        if (edge.gen === 4 && dp > 0.05) {
          ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(tx, ty);
          ctx.strokeStyle = ink(0.035 + eb * 0.065);
          ctx.lineWidth   = 5;
          ctx.stroke();
        }

        const baseOp = edge.gen === 4 ? 0.16 : edge.gen === 3 ? 0.13 : 0.095;
        const baseLW = edge.gen === 4 ? 1.0  : edge.gen === 3 ? 0.88 : 0.75;
        ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(tx, ty);
        ctx.strokeStyle = ink(baseOp + eb * 0.30);
        ctx.lineWidth   = baseLW + eb * 0.75;
        ctx.stroke();
      }

      // ── Draw nodes ──────────────────────────────────────────────────────
      for (const n of nodes) {
        if (now < n.revealTime) continue;
        const age    = now - n.revealTime;
        const birthP = Math.min(1, age / 360);
        if (birthP < 0.01) continue;

        const breath = Math.sin(now * 0.00148 + n.breath);
        const r      = (n.r + breath * 0.42) * birthP;
        const deg    = degreeRef.current.get(n.id) ?? 0;
        const nb     = nodeBright(n.id);

        // Nodes with more connections are more visible — trust earns presence
        const baseOp = (0.34 + Math.min(deg, 5) * 0.072) * birthP;
        const coreOp = Math.min(1, baseOp + nb * 0.38);
        const glowOp = (0.038 + (breath * 0.5 + 0.5) * 0.022 + nb * 0.13) * birthP;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * (2.7 + nb * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = ink(glowOp);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = ink(coreOp);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove  = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full" style={{ aspectRatio: "1" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", cursor: "crosshair" }}
      />
    </div>
  );
}
