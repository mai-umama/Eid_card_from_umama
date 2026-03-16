/**
 * generateCardCanvas.ts
 *
 * Renders the Eid card directly onto an HTML5 Canvas using the 2D API.
 * This completely bypasses html2canvas, fixing all font / layout issues.
 */

type CardOptions = {
  senderName: string;
  receiverName: string;
  gender: "Male" | "Female";
  width?: number;
  height?: number;
};

/** Load & cache the Cinzel font so canvas can use it. */
async function ensureFonts() {
  if (typeof window === "undefined") return;
  await document.fonts.load("900 48px 'Cinzel'");
  await document.fonts.load("700 24px 'Cinzel'");
  await document.fonts.load("800 28px 'Poppins'");
  await document.fonts.load("700 14px 'Poppins'");
}

/** Draw a rounded rectangle path */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Draw the mosque silhouette at the bottom of the card */
function drawMosque(ctx: CanvasRenderingContext2D, color: string, cardX: number, cardY: number, cardW: number, cardH: number) {
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = color;

  const scaleX = cardW / 400;
  const scaleY = (cardH * 0.5) / 200;

  ctx.translate(cardX, cardY + cardH * 0.5);
  ctx.scale(scaleX, scaleY);

  // Main silhouette path
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(0, 120);
  ctx.lineTo(40, 140);
  ctx.lineTo(60, 100);
  ctx.lineTo(60, 60);
  ctx.lineTo(100, 60);
  ctx.lineTo(100, 100);
  ctx.lineTo(120, 120);
  ctx.lineTo(120, 80);
  ctx.lineTo(160, 80);
  ctx.lineTo(160, 120);
  ctx.lineTo(180, 90);
  ctx.lineTo(220, 90);
  ctx.lineTo(240, 120);
  ctx.lineTo(240, 80);
  ctx.lineTo(280, 80);
  ctx.lineTo(280, 120);
  ctx.lineTo(300, 100);
  ctx.lineTo(300, 60);
  ctx.lineTo(340, 60);
  ctx.lineTo(340, 100);
  ctx.lineTo(360, 140);
  ctx.lineTo(400, 120);
  ctx.lineTo(400, 200);
  ctx.closePath();
  ctx.fill();

  // Minarets
  ctx.beginPath();
  ctx.moveTo(85, 40); ctx.lineTo(100, 20); ctx.lineTo(115, 40); ctx.lineTo(115, 120); ctx.lineTo(85, 120); ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(325, 40); ctx.lineTo(340, 20); ctx.lineTo(355, 40); ctx.lineTo(355, 120); ctx.lineTo(325, 120); ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/** Draw the boy character (SVG paths redrawn on canvas) */
function drawBoy(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  ctx.save();
  ctx.translate(cx - 200 * scale, cy - 300 * scale);
  ctx.scale(scale, scale);

  // Head
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.arc(200, 225, 105, 0, Math.PI * 2); ctx.fill();
  // Hair
  ctx.fillStyle = "#4B2C20"; ctx.beginPath(); ctx.moveTo(110,200); ctx.bezierCurveTo(110,150,290,150,290,200); ctx.lineTo(290,240); ctx.lineTo(110,240); ctx.closePath(); ctx.fill();
  // Kufi
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.moveTo(120,190); ctx.bezierCurveTo(120,140,150,100,200,100); ctx.bezierCurveTo(250,100,280,140,280,190); ctx.lineTo(280,230); ctx.lineTo(120,230); ctx.closePath(); ctx.fill();
  // Eyes white
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(165,250,30,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(235,250,30,0,Math.PI*2); ctx.fill();
  // Pupils
  ctx.fillStyle = "#1A1A1A"; ctx.beginPath(); ctx.arc(165,255,22,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(235,255,22,0,Math.PI*2); ctx.fill();
  // Eye shine
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(158,245,8,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(228,245,8,0,Math.PI*2); ctx.fill();
  // Smile
  ctx.strokeStyle = "#4B2C20"; ctx.lineWidth = 3; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(185,310); ctx.quadraticCurveTo(200,320,215,310); ctx.stroke();
  // Blush
  ctx.fillStyle = "#FDA4AF"; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(135,295,12,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(265,295,12,0,Math.PI*2); ctx.fill(); ctx.globalAlpha = 1;
  // Thobe
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.moveTo(130,390); ctx.quadraticCurveTo(200,375,270,390); ctx.lineTo(280,600); ctx.lineTo(120,600); ctx.closePath(); ctx.fill();
  // Prayer hands
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.moveTo(180,500); ctx.lineTo(200,440); ctx.lineTo(220,500); ctx.quadraticCurveTo(200,525,180,500); ctx.fill();

  ctx.restore();
}

/** Draw the girl character */
function drawGirl(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  ctx.save();
  ctx.translate(cx - 200 * scale, cy - 300 * scale);
  ctx.scale(scale, scale);

  // Hijab outer
  ctx.fillStyle = "#D8B4FE"; ctx.beginPath(); ctx.moveTo(70,240); ctx.bezierCurveTo(70,100,330,100,330,240); ctx.lineTo(330,440); ctx.lineTo(70,440); ctx.closePath(); ctx.fill();
  // Face
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.arc(200,270,100,0,Math.PI*2); ctx.fill();
  // Hijab inner highlight
  ctx.fillStyle = "#C084FC"; ctx.globalAlpha = 0.3;
  ctx.beginPath(); ctx.moveTo(75,250); ctx.bezierCurveTo(75,140,325,140,325,250); ctx.quadraticCurveTo(200,220,75,250); ctx.fill(); ctx.globalAlpha = 1;
  // Eyes white
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(168,295,32,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(232,295,32,0,Math.PI*2); ctx.fill();
  // Pupils
  ctx.fillStyle = "#1A1A1A"; ctx.beginPath(); ctx.arc(168,300,24,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(232,300,24,0,Math.PI*2); ctx.fill();
  // Eye shine
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(160,290,9,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(224,290,9,0,Math.PI*2); ctx.fill();
  // Lashes
  ctx.strokeStyle = "#1A1A1A"; ctx.lineWidth = 2.5; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(140,275); ctx.lineTo(150,285); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(260,275); ctx.lineTo(250,285); ctx.stroke();
  // Smile
  ctx.strokeStyle = "#4B2C20"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(185,350); ctx.quadraticCurveTo(200,360,215,350); ctx.stroke();
  // Blush
  ctx.fillStyle = "#FDA4AF"; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(130,340,16,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(270,340,16,0,Math.PI*2); ctx.fill(); ctx.globalAlpha = 1;
  // Dress / abaya
  ctx.fillStyle = "#8B5CF6"; ctx.beginPath(); ctx.moveTo(110,440); ctx.quadraticCurveTo(200,430,290,440); ctx.lineTo(310,600); ctx.lineTo(90,600); ctx.closePath(); ctx.fill();
  // Prayer hands
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.moveTo(180,540); ctx.lineTo(200,480); ctx.lineTo(220,540); ctx.quadraticCurveTo(200,565,180,540); ctx.fill();

  ctx.restore();
}

/** Draw scattered stars */
function drawStars(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const positions = [
    [0.1,0.04],[0.85,0.06],[0.5,0.02],[0.3,0.1],[0.7,0.09],
    [0.15,0.15],[0.6,0.18],[0.4,0.22],[0.8,0.13],[0.05,0.2],
    [0.9,0.2],[0.25,0.28],[0.55,0.3],[0.75,0.25],[0.45,0.35],
    [0.2,0.38],[0.65,0.38],[0.35,0.42],[0.88,0.32],[0.12,0.33],
  ];
  ctx.fillStyle = "white";
  positions.forEach(([rx, ry], i) => {
    const radius = i % 5 === 0 ? 3 : 1.5;
    ctx.globalAlpha = 0.4 + (i % 3) * 0.15;
    ctx.beginPath();
    ctx.arc(x + rx * w, y + ry * h, radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

export async function generateCardCanvas(opts: CardOptions): Promise<HTMLCanvasElement> {
  await ensureFonts();

  const W = opts.width ?? 800;
  const H = opts.height ?? 1000;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const isMale = opts.gender === "Male";
  const outerBg = isMale ? "#93C5FD" : "#C4B5FD";
  const innerBg = isMale ? "#60A5FA" : "#A78BFA";
  const silhouette = isMale ? "#1E40AF" : "#6D28D9";

  // ── Outer border ────────────────────────────────────────────────────────────
  const border = 24;
  ctx.fillStyle = outerBg;
  roundRect(ctx, 0, 0, W, H, 20);
  ctx.fill();

  // ── Inner card ──────────────────────────────────────────────────────────────
  const cx = border, cy = border;
  const cw = W - border * 2, ch = H - border * 2;
  ctx.fillStyle = innerBg;
  roundRect(ctx, cx, cy, cw, ch, 12);
  ctx.fill();

  // ── Stars ───────────────────────────────────────────────────────────────────
  drawStars(ctx, cx, cy, cw, ch * 0.5);

  // ── Mosque silhouette ───────────────────────────────────────────────────────
  drawMosque(ctx, silhouette, cx, cy, cw, ch);

  // ── Text: HAPPY EID AL-FITR ─────────────────────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.textAlign = "center";
  ctx.font = `700 ${Math.round(W * 0.032)}px 'Cinzel', serif`;
  ctx.letterSpacing = `${Math.round(W * 0.01)}px`;
  ctx.fillText("HAPPY EID AL-FITR", W / 2, cy + ch * 0.08);

  // ── Text: MUBARAK ───────────────────────────────────────────────────────────
  ctx.fillStyle = "white";
  ctx.font = `900 ${Math.round(W * 0.09)}px 'Cinzel', serif`;
  ctx.letterSpacing = `${Math.round(W * 0.012)}px`;
  ctx.fillText("MUBARAK", W / 2, cy + ch * 0.08 + Math.round(W * 0.105));

  // ── Text: TO label ──────────────────────────────────────────────────────────
  const toY = cy + ch * 0.08 + Math.round(W * 0.105) + Math.round(W * 0.04);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `700 ${Math.round(W * 0.018)}px 'Poppins', sans-serif`;
  ctx.letterSpacing = `${Math.round(W * 0.005)}px`;
  ctx.fillText("TO", W / 2, toY);

  // ── Text: Receiver Name ──────────────────────────────────────────────────────
  ctx.fillStyle = "white";
  ctx.font = `800 ${Math.round(W * 0.065)}px 'Poppins', sans-serif`;
  ctx.letterSpacing = "0px";
  const receiverDisplay = opts.receiverName || "DEAREST ONE";
  ctx.fillText(receiverDisplay, W / 2, toY + Math.round(W * 0.075));

  // ── Character ───────────────────────────────────────────────────────────────
  const charScale = W / 780;
  const charCX = W / 2;
  const charCY = H * 0.595;
  if (isMale) {
    drawBoy(ctx, charCX, charCY, charScale);
  } else {
    drawGirl(ctx, charCX, charCY, charScale);
  }

  // ── FROM pill ───────────────────────────────────────────────────────────────
  const fromLabelY = cy + ch - Math.round(ch * 0.1);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `700 ${Math.round(W * 0.018)}px 'Poppins', sans-serif`;
  ctx.letterSpacing = `${Math.round(W * 0.005)}px`;
  ctx.fillText("FROM", W / 2, fromLabelY);

  // Pill background
  const senderDisplay = opts.senderName || "UMAMA";
  ctx.font = `700 ${Math.round(W * 0.048)}px 'Poppins', sans-serif`;
  ctx.letterSpacing = "1px";
  const nameW = ctx.measureText(senderDisplay).width;
  const pillPadX = Math.round(W * 0.05);
  const pillPadY = Math.round(W * 0.018);
  const pillW = nameW + pillPadX * 2;
  const pillH = Math.round(W * 0.075);
  const pillX = W / 2 - pillW / 2;
  const pillY = fromLabelY + Math.round(W * 0.015);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
  ctx.fill();
  ctx.stroke();

  // Sender name text
  ctx.fillStyle = "white";
  ctx.fillText(senderDisplay, W / 2, pillY + pillH / 2 + pillPadY);

  return canvas;
}
