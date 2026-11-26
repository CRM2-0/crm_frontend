import React, { useMemo, useState } from "react";

const NAVY = "#000A49";
const GOLD = "#EBC27D";

// ---- canvas / geometry (matched to the design image) ----------------
const VB_W = 690;
const VB_H = 439;
const CX = 345; // donut centre x
const CY = 205; // donut centre y (top face)
const R = 176; // outer radius
const RI = 80; // inner radius (hole)
const K = 0.78; // vertical squash  -> tilt of the donut
const DEPTH = 27; // thickness of the donut (px on screen)
const SHIFT = 8.5; // how far each slice is pulled out
const START = -90; // first slice starts at 12 o'clock

const CARD_H = 45;

export const DUMMY_DATA = [
  {
    name: "S.Sumathi",
    tag: "Prize",
    value: 27,
    color: NAVY,
    layout: {
      card: { x: 498, y: 67, w: 106 },
      dots: [
        { x: 473, y: 107 },
        { x: 487, y: 92 },
      ],
    },
  },
  {
    name: "S.Sumathi",
    tag: "Prize",
    value: 26,
    color: GOLD,
    layout: {
      card: { x: 497, y: 313, w: 98 },
      dots: [
        { x: 466, y: 316 },
        { x: 480, y: 333 },
      ],
    },
  },
  {
    name: "S.Sumathi",
    tag: "Prize",
    value: 18,
    color: NAVY,
    layout: {
      card: { x: 73, y: 285, w: 99 },
      dots: [
        { x: 207, y: 298 },
        { x: 186, y: 307 },
      ],
    },
  },
  {
    name: "S.Sumathi",
    tag: "Prize",
    value: 29,
    color: GOLD,
    layout: {
      card: { x: 73, y: 80, w: 99 },
      dots: [
        { x: 207, y: 116 },
        { x: 188, y: 104 },
      ],
    },
  },
];

// ---- helpers ---------------------------------------------------------
const rad = (d) => (d * Math.PI) / 180;

const shade = (hex, f) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const c = (v) =>
    Math.max(0, Math.min(255, Math.round(v * f)))
      .toString(16)
      .padStart(2, "0");
  return `#${c((n >> 16) & 255)}${c((n >> 8) & 255)}${c(n & 255)}`;
};

const isDark = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const l = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l < 0.5;
};

// side-wall colours (explicit for the two brand colours, derived otherwise)
const wallOf = (color) =>
  ({ [NAVY]: "#00052B", [GOLD]: "#B8863F" })[color] || shade(color, 0.62);

// world point (angle a, radius r, height z) -> screen point
const pt = (a, r, z, sx, sy) => [
  CX + sx + r * Math.cos(rad(a)),
  CY + K * (sy + r * Math.sin(rad(a))) - z,
];

const arc = (a0, a1, r, z, sx, sy) => {
  const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) / 2));
  const out = [];
  for (let i = 0; i <= n; i++) out.push(pt(a0 + ((a1 - a0) * i) / n, r, z, sx, sy));
  return out;
};

const toPath = (pts) =>
  "M" + pts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join("L") + "Z";

// angle ranges inside [a0,a1] where sign*sin(t) > 0
// sign = +1 -> front half (outer wall is visible), -1 -> back half (inner wall is visible)
const runs = (a0, a1, sign) => {
  const out = [];
  const n = Math.max(1, Math.ceil(a1 - a0));
  let s = null;
  for (let i = 0; i < n; i++) {
    const t0 = a0 + ((a1 - a0) * i) / n;
    const t1 = a0 + ((a1 - a0) * (i + 1)) / n;
    const vis = sign * Math.sin(rad((t0 + t1) / 2)) > 0;
    if (vis && s === null) s = t0;
    if (!vis && s !== null) {
      out.push([s, t0]);
      s = null;
    }
  }
  if (s !== null) out.push([s, a1]);
  return out;
};

// ---- component -------------------------------------------------------
const FamilyChar3D = ({
  data = DUMMY_DATA,
  centerLabel = "P.Kumari",
  background = "#F7F8FB",
  maxWidth = VB_W,
  lift = 12, // how high a hovered slice rises (px)
  zoom = 1.035, // how much a hovered slice grows
  duration = 450, // animation time (ms)
}) => {
  const dataKey = JSON.stringify(data);
  const [hover, setHover] = useState(null); // index of the hovered slice

  const { slices, callouts } = useMemo(() => {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    let acc = 0;

    const sl = data.map((d, idx) => {
      const a0 = START + (360 * acc) / total;
      acc += d.value;
      const a1 = START + (360 * acc) / total;
      const mid = (a0 + a1) / 2;
      const sx = Math.cos(rad(mid)) * SHIFT;
      const sy = Math.sin(rad(mid)) * SHIFT;
      return { d, idx, a0, a1, mid, sx, sy, wall: wallOf(d.color) };
    });

    // ----- callouts -----
    const items = sl.map(({ d, mid, sx, sy }) => {
      const w = d.layout?.card?.w ?? Math.max(100, d.name.length * 6.4 + 40);
      const side = Math.cos(rad(mid)) >= 0 ? 1 : -1;
      const lineColor = isDark(d.color) ? GOLD : NAVY;

      if (d.layout?.card && d.layout?.dots) {
        return {
          d, w, lineColor,
          cardX: d.layout.card.x,
          cardY: d.layout.card.y,
          ring: d.layout.dots[0],
          pin: d.layout.dots[1],
        };
      }

      // automatic placement
      const edge = CX + side * R * 0.92;
      const cy = Math.max(
        CARD_H / 2 + 8,
        Math.min(VB_H - CARD_H / 2 - 8, CY + K * Math.sin(rad(mid)) * R * 1.2),
      );
      const [rx, ry] = pt(mid, R * 0.93, 0, sx, sy);
      return {
        d, w, lineColor, side, auto: true,
        cardX: side === 1 ? edge : edge - w,
        cardY: cy - CARD_H / 2,
        ring: { x: rx, y: ry },
        pin: { x: edge - side * 15, y: cy },
      };
    });

    // keep automatically placed cards on one side from overlapping
    [-1, 1].forEach((side) => {
      const list = items
        .filter((i) => i.auto && i.side === side)
        .sort((a, b) => a.cardY - b.cardY);
      for (let k = 1; k < list.length; k++) {
        const minY = list[k - 1].cardY + CARD_H + 10;
        if (list[k].cardY < minY) {
          list[k].cardY = minY;
          list[k].pin.y = minY + CARD_H / 2;
        }
      }
    });

    // draw slices back-to-front
    const ordered = [...sl].sort(
      (a, b) => Math.sin(rad(a.mid)) - Math.sin(rad(b.mid)),
    );

    return { slices: ordered, callouts: items };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataKey]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        margin: "0 auto",
        background,
        borderRadius: 16,
      }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        style={{ display: "block", height: "auto" }}
        role="img"
        aria-label="3D donut chart"
        fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
      >
        <style>{`
          .fc3d-slice, .fc3d-call { transition: transform ${duration}ms cubic-bezier(.22,.9,.28,1.08); }
          .fc3d-card { transition: stroke ${duration}ms ease, fill ${duration}ms ease; }
          @media (prefers-reduced-motion: reduce) {
            .fc3d-slice, .fc3d-call, .fc3d-card { transition: none; }
          }
        `}</style>
        <defs>
          <filter id="fc3d-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow
              dx="0"
              dy="14"
              stdDeviation="9"
              floodColor="#1B2A5A"
              floodOpacity="0.16"
            />
          </filter>
        </defs>

        {/* ---------------- donut ---------------- */}
        <g filter="url(#fc3d-shadow)" strokeLinejoin="round">
          {slices.map(({ d, idx, a0, a1, mid, sx, sy, wall }, i) => {
            const innerWall = shade(wall, 0.9);
            const f = (c) => ({ fill: c, stroke: c, strokeWidth: 0.6 });

            // hovered slice rises (z direction), drifts outward a little and zooms
            const up = hover === idx;
            const slideX = Math.cos(rad(mid)) * 5;
            const slideY = Math.sin(rad(mid)) * 5 * K;

            return (
              <g
                key={i}
                className="fc3d-slice"
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                  transform: up
                    ? `translate(${slideX}px, ${slideY - lift}px) scale(${zoom})`
                    : "translate(0px, 0px) scale(1)",
                }}
              >
                {/* inner wall (seen through the hole, back half) */}
                {runs(a0, a1, -1).map(([s, e], k) => (
                  <path
                    key={`iw${k}`}
                    d={toPath([
                      ...arc(s, e, RI, 0, sx, sy),
                      ...arc(e, s, RI, -DEPTH, sx, sy),
                    ])}
                    {...f(innerWall)}
                  />
                ))}

                {/* outer wall (front half) */}
                {runs(a0, a1, 1).map(([s, e], k) => (
                  <path
                    key={`ow${k}`}
                    d={toPath([
                      ...arc(s, e, R, 0, sx, sy),
                      ...arc(e, s, R, -DEPTH, sx, sy),
                    ])}
                    {...f(wall)}
                  />
                ))}

                {/* cut faces between slices (only when they face the viewer) */}
                {[a0, a1]
                  .filter((a, idx) =>
                    idx === 0 ? Math.cos(rad(a)) < -1e-6 : Math.cos(rad(a)) > 1e-6,
                  )
                  .map((a, k) => (
                    <path
                      key={`cf${k}`}
                      d={toPath([
                        pt(a, RI, 0, sx, sy),
                        pt(a, R, 0, sx, sy),
                        pt(a, R, -DEPTH, sx, sy),
                        pt(a, RI, -DEPTH, sx, sy),
                      ])}
                      {...f(wall)}
                    />
                  ))}

                {/* top face */}
                <path
                  d={toPath([
                    ...arc(a0, a1, R, 0, sx, sy),
                    ...arc(a1, a0, RI, 0, sx, sy),
                  ])}
                  {...f(d.color)}
                />
              </g>
            );
          })}
        </g>

        {/* ---------------- hover targets (they never move, so no flicker) ---------------- */}
        <g>
          {slices.map(({ d, idx, a0, a1, sx, sy }) => (
            <g
              key={idx}
              tabIndex={0}
              aria-label={`${d.name} ${d.tag || ""}`}
              style={{ cursor: "pointer", outline: "none" }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(idx)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
              onPointerDown={(e) =>
                e.pointerType !== "mouse" && setHover((h) => (h === idx ? null : idx))
              }
              onFocus={() => setHover(idx)}
              onBlur={() => setHover(null)}
            >
              <path
                d={toPath([
                  ...arc(a0, a1, R, 0, sx, sy),
                  ...arc(a1, a0, RI, 0, sx, sy),
                ])}
                fill="#000"
                fillOpacity="0"
              />
              {runs(a0, a1, 1).map(([s, e], k) => (
                <path
                  key={k}
                  d={toPath([
                    ...arc(s, e, R, 0, sx, sy),
                    ...arc(e, s, R, -DEPTH, sx, sy),
                  ])}
                  fill="#000"
                  fillOpacity="0"
                />
              ))}
            </g>
          ))}
        </g>

        {/* ---------------- centre label ---------------- */}
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12.5"
          fontWeight="700"
          fill={NAVY}
        >
          {centerLabel}
        </text>

        {/* ---------------- callouts ---------------- */}
        {callouts.map(({ d, w, lineColor, cardX, cardY, ring, pin }, i) => {
          const bw = Math.max(38, (d.tag || "").length * 6 + 14);
          const on = hover === i;
          return (
            <g
              key={i}
              className="fc3d-call"
              style={{
                pointerEvents: "none",
                transform: on ? "translate(0px, -5px)" : "translate(0px, 0px)",
              }}
            >
              <line
                x1={ring.x}
                y1={ring.y}
                x2={pin.x}
                y2={pin.y}
                stroke={lineColor}
                strokeWidth="1.3"
              />
              <circle cx={ring.x} cy={ring.y} r="3" fill={lineColor} />
              <circle cx={pin.x} cy={pin.y} r="3" fill={lineColor} />

              <rect
                x={cardX}
                y={cardY}
                width={w}
                height={CARD_H}
                rx="3"
                className="fc3d-card"
                fill={on ? "#E4E8FA" : "#EEF1FB"}
                stroke={on ? NAVY : "#8C96CC"}
                strokeWidth="1"
              />
              <text
                x={cardX + w / 2}
                y={cardY + 14}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11.5"
                fontWeight="600"
                fill="#3E4357"
              >
                {d.name}
              </text>
              <rect
                x={cardX + (w - bw) / 2}
                y={cardY + 25}
                width={bw}
                height="13"
                rx="2"
                fill={NAVY}
              />
              <text
                x={cardX + w / 2}
                y={cardY + 31.8}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="8.5"
                fontWeight="600"
                fill="#FFFFFF"
              >
                {d.tag}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FamilyChar3D;