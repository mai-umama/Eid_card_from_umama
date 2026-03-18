/**
 * generateCardCanvas.ts
 *
 * Renders the Eid card directly onto an HTML5 Canvas using the 2D API.
 * This completely bypasses html2canvas, fixing all font / layout issues.
 */

type CardOptions = {
  senderName: string;
  receiverName: string;
  gender: "Male" | "Female" | "Other";
  templateId?: "royal-teal" | "majestic-midnight" | "eternal-ivory";
  width?: number;
  height?: number;
};

/** Load & cache fonts so canvas can use them. */
async function ensureFonts() {
  if (typeof window === "undefined") return;
  // Using standard system fonts or assuming fonts are loaded via CSS
  await document.fonts.load("900 48px 'Inter'");
  await document.fonts.load("700 24px 'Inter'");
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
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = color;

  const scaleX = cardW / 400;
  const scaleY = (cardH * 0.5) / 200;

  ctx.translate(cardX, cardY + cardH * 0.5);
  ctx.scale(scaleX, scaleY);

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

  ctx.beginPath();
  ctx.moveTo(85, 40); ctx.lineTo(100, 20); ctx.lineTo(115, 40); ctx.lineTo(115, 120); ctx.lineTo(85, 120); ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(325, 40); ctx.lineTo(340, 20); ctx.lineTo(355, 40); ctx.lineTo(355, 120); ctx.lineTo(325, 120); ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/** Draw the boy character */
function drawBoy(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  ctx.save();
  ctx.translate(cx - 200 * scale, cy - 300 * scale);
  ctx.scale(scale, scale);
  ctx.shadowBlur = 40; ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.arc(200, 225, 105, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#4B2C20"; ctx.beginPath(); ctx.moveTo(110,200); ctx.bezierCurveTo(110,150,290,150,290,200); ctx.lineTo(290,240); ctx.lineTo(110,240); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.moveTo(120,190); ctx.bezierCurveTo(120,140,150,100,200,100); ctx.bezierCurveTo(250,100,280,140,280,190); ctx.lineTo(280,230); ctx.lineTo(120,230); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(165,250,30,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(235,250,30,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "#1A1A1A"; ctx.beginPath(); ctx.arc(165,255,22,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(235,255,22,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(158,245,8,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(228,245,8,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = "#4B2C20"; ctx.lineWidth = 3; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(185,310); ctx.quadraticCurveTo(200,320,215,310); ctx.stroke();
  ctx.fillStyle = "#FDA4AF"; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(135,295,12,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(265,295,12,0,Math.PI*2); ctx.fill(); ctx.globalAlpha = 1;
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.moveTo(130,390); ctx.quadraticCurveTo(200,375,270,390); ctx.lineTo(280,600); ctx.lineTo(120,600); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.moveTo(180,500); ctx.lineTo(200,440); ctx.lineTo(220,500); ctx.quadraticCurveTo(200,525,180,500); ctx.fill();
  ctx.restore();
}

/** Draw the girl character */
function drawGirl(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  ctx.save();
  ctx.translate(cx - 200 * scale, cy - 300 * scale);
  ctx.scale(scale, scale);
  ctx.shadowBlur = 40; ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.fillStyle = "#D8B4FE"; ctx.beginPath(); ctx.moveTo(70,240); ctx.bezierCurveTo(70,100,330,100,330,240); ctx.lineTo(330,440); ctx.lineTo(70,440); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.arc(200,270,100,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "#C084FC"; ctx.globalAlpha = 0.3;
  ctx.beginPath(); ctx.moveTo(75,250); ctx.bezierCurveTo(75,140,325,140,325,250); ctx.quadraticCurveTo(200,220,75,250); ctx.fill(); ctx.globalAlpha = 1;
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(168,295,32,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(232,295,32,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "#1A1A1A"; ctx.beginPath(); ctx.arc(168,300,24,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(232,300,24,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(160,290,9,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(224,290,9,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = "#1A1A1A"; ctx.lineWidth = 2.5; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(140,275); ctx.lineTo(150,285); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(260,275); ctx.lineTo(250,285); ctx.stroke();
  ctx.strokeStyle = "#4B2C20"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(185,350); ctx.quadraticCurveTo(200,360,215,350); ctx.stroke();
  ctx.fillStyle = "#FDA4AF"; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(130,340,16,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(270,340,16,0,Math.PI*2); ctx.fill(); ctx.globalAlpha = 1;
  ctx.fillStyle = "#8B5CF6"; ctx.beginPath(); ctx.moveTo(110,440); ctx.quadraticCurveTo(200,430,290,440); ctx.lineTo(310,600); ctx.lineTo(90,600); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#FEE2C7"; ctx.beginPath(); ctx.moveTo(180,540); ctx.lineTo(200,480); ctx.lineTo(220,540); ctx.quadraticCurveTo(200,565,180,540); ctx.fill();
  ctx.restore();
}

/** Draw scattered stars */
function drawStars(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  for (let i = 0; i < 20; i++) {
    const radius = Math.random() < 0.3 ? 3 : 1.5;
    ctx.globalAlpha = 0.3 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.arc(x + Math.random() * w, y + Math.random() * h, radius, 0, Math.PI * 2);
    ctx.fill();
  }
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

  // Theme values matching EidCardPreview
  let outerBg, innerBg, silhouette, accent;
  switch (opts.templateId) {
    case "majestic-midnight":
      outerBg = "#0f172a"; innerBg = "#1e1b4b"; silhouette = "#020617"; accent = "#e2e8f0"; break;
    case "eternal-ivory":
      outerBg = "#fef2f2"; innerBg = "#fffcf2"; silhouette = "#fecaca"; accent = "#fb7185"; break;
    case "royal-teal":
    default:
      outerBg = "#042f2e"; innerBg = "#134e4a"; silhouette = "#042f2e"; accent = "#fcd34d"; break;
  }

  // Draw background
  ctx.fillStyle = outerBg;
  roundRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  const b = 20;
  const cw = W - b*2, ch = H - b*2;
  ctx.fillStyle = innerBg;
  roundRect(ctx, b, b, cw, ch, 16);
  ctx.fill();

  // Decorative border
  ctx.strokeStyle = accent; ctx.globalAlpha = 0.4; ctx.lineWidth = 3;
  roundRect(ctx, b + 10, b + 10, cw - 20, ch - 20, 12); ctx.stroke();
  ctx.globalAlpha = 1;

  drawStars(ctx, b, b, cw, ch * 0.5, accent);
  drawMosque(ctx, silhouette, b, b, cw, ch);

  ctx.textAlign = "center";
  ctx.fillStyle = accent;
  ctx.font = `bold ${W * 0.02}px sans-serif`;
  ctx.fillText("HAPPY EID AL-FITR", W/2, b + ch * 0.08);

  ctx.fillStyle = "white";
  ctx.font = `black ${W * 0.09}px serif`;
  ctx.fillText("MUBARAK", W/2, b + ch * 0.18);

  ctx.fillStyle = accent; ctx.globalAlpha = 0.7;
  ctx.font = `bold ${W * 0.02}px sans-serif`;
  ctx.fillText("TO", W/2, b + ch * 0.25);

  ctx.fillStyle = opts.templateId === "eternal-ivory" ? "black" : "white"; ctx.globalAlpha = 1;
  ctx.font = `bold ${W * 0.07}px sans-serif`;
  ctx.fillText(opts.receiverName.toUpperCase() || "DEAREST ONE", W/2, b + ch * 0.33);

  const charScale = W / 700;
  if (opts.gender === "Female") drawGirl(ctx, W/2, H * 0.65, charScale);
  else drawBoy(ctx, W/2, H * 0.65, charScale);

  ctx.fillStyle = accent; ctx.globalAlpha = 1.0; // Full opacity for the label
  ctx.font = `bold ${W * 0.026}px sans-serif`;
  ctx.fillText("FROM", W/2, H - b - ch * 0.155);

  const fromName = (opts.senderName || "UMAMA").toUpperCase();
  ctx.font = `bold ${W * 0.048}px sans-serif`;
  const tw = ctx.measureText(fromName).width;
  ctx.fillStyle = "rgba(0,0,0,0.7)"; // Much darker background for high contrast
  roundRect(ctx, W/2 - tw/2 - 35, H - b - ch * 0.12, tw + 70, 70, 35);
  ctx.fill();
  
  // High contrast border
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "white"; ctx.globalAlpha = 1;
  ctx.fillText(fromName, W/2, H - b - ch * 0.065);

  return canvas;
}
