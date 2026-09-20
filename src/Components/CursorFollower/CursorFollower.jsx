import { useEffect, useRef, useState } from 'react';
import './CursorFollower.css';

/**
 * What the cursor becomes over each kind of element, most specific first.
 *
 * Targets are matched once per `pointerover` rather than on every mouse move:
 * the previous version ran `closest()` and a React setState on every single
 * mousemove event, which meant a re-render for every pixel of travel.
 *
 * `snap` makes the ring wrap the element's box instead of following the
 * pointer, which is what the original did for text and is kept here.
 */
const TARGETS = [
  { match: '[data-cursor]', state: (el) => el.dataset.cursor, label: (el) => el.dataset.cursorLabel },
  { match: '.project-card[data-status="coming-soon"]', state: 'muted', label: 'Soon' },
  { match: '.project-card', state: 'card', label: 'Open' },
  { match: 'input, textarea, select, [contenteditable="true"]', state: 'text' },
  { match: '.projects-tab, button, [role="button"]', state: 'button' },
  { match: '.skill_card', state: 'card', label: '' },
  // Icons sit inside anchors, so this has to win over the generic `a` rule
  // below or the ring would never wrap them the way the original did.
  { match: 'i, svg', state: 'snap', snap: true },
  { match: '.navbar a, .footer a, .projects-viewall, .certificate-link', state: 'link' },
  { match: 'a', state: 'link' },
  { match: 'h1, h2, h3', state: 'heading' },
];

const LERP = 0.18; // higher than the old 0.05 so the ring keeps up with fast moves
const MAX_VELOCITY = 150;
const STRETCH = 0.35;

/**
 * States that must stay upright and undistorted.
 *
 * The velocity spin and squash read well on the bare dot, but the label is a
 * child of the ring, so those transforms were tipping "Open" upside down and
 * stretching it on exactly the cards it is meant to be readable on.
 */
const STEADY = new Set(['card', 'muted', 'button', 'text']);

export default function CursorFollower() {
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  // Pointer-driven effects are pointless on touch and unwanted when the user
  // has asked for reduced motion. Watched live so a mouse plugged in later,
  // or a window resize across the breakpoint, is picked up.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setEnabled(fine.matches && !calm.matches);
    sync();

    fine.addEventListener('change', sync);
    calm.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring) return;

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...pointer };
    const prev = { ...pointer };

    let scale = 0;
    let angle = 0;
    let frame = 0;
    let snapRect = null;
    let state = 'default';
    let visible = false;
    let wasSnapped = false;

    const setState = (next, text = '', rect = null) => {
      if (next === state && rect === snapRect) return;
      state = next;
      snapRect = rect;
      ring.dataset.state = next;
      if (label.textContent !== text) label.textContent = text;
    };

    // ---- target detection: once per hovered element, not per pixel ----
    const resolve = (el) => {
      if (!(el instanceof Element)) return setState('default');

      for (const t of TARGETS) {
        const hit = el.closest(t.match);
        if (!hit) continue;

        const next = typeof t.state === 'function' ? t.state(hit) : t.state;
        if (!next) continue;

        const text = typeof t.label === 'function' ? t.label(hit) || '' : t.label || '';
        return setState(next, text, t.snap ? hit.getBoundingClientRect() : null);
      }
      setState('default');
    };

    const onOver = (e) => resolve(e.target);
    const onOut = (e) => {
      if (!e.relatedTarget) setState('default');
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) {
        visible = true;
        ring.dataset.visible = 'true';
      }
    };

    const onLeave = () => {
      visible = false;
      ring.dataset.visible = 'false';
    };

    // A snapped ring is pinned to a box that moves with the page.
    const onScroll = () => {
      if (snapRect) setState('default');
    };

    const tick = () => {
      if (snapRect) {
        // Wrap the hovered element rather than trail the pointer.
        wasSnapped = true;
        ring.style.width = `${snapRect.width + 12}px`;
        ring.style.height = `${snapRect.height + 10}px`;
        ring.style.transform =
          `translate(${snapRect.left + snapRect.width / 2}px, ` +
          `${snapRect.top + snapRect.height / 2}px) translate(-50%, -50%)`;
      } else {
        // Hand sizing back to CSS, but only on the frame we stop snapping -
        // writing these every frame would invalidate style for nothing.
        if (wasSnapped) {
          wasSnapped = false;
          ring.style.width = '';
          ring.style.height = '';
        }

        pos.x += (pointer.x - pos.x) * LERP;
        pos.y += (pointer.y - pos.y) * LERP;

        const dx = pointer.x - prev.x;
        const dy = pointer.y - prev.y;
        prev.x = pointer.x;
        prev.y = pointer.y;

        const velocity = Math.min(Math.hypot(dx, dy) * 4, MAX_VELOCITY);
        // Keep decaying the stretch even while steady, so returning to the
        // bare dot eases back in rather than snapping.
        const target = STEADY.has(state) ? 0 : (velocity / MAX_VELOCITY) * STRETCH;
        scale += (target - scale) * LERP;
        if (velocity > 20) angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        const base = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
        ring.style.transform = STEADY.has(state)
          ? base
          : `${base} rotate(${angle}deg) scale(${1 + scale}, ${1 - scale})`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const opts = { passive: true };
    window.addEventListener('pointermove', onMove, opts);
    window.addEventListener('pointerover', onOver, opts);
    window.addEventListener('pointerout', onOut, opts);
    window.addEventListener('scroll', onScroll, opts);
    document.addEventListener('pointerleave', onLeave, opts);

    return () => {
      cancelAnimationFrame(frame); // the old version never stopped its loop
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor-ring" ref={ringRef} data-state="default" data-visible="false" aria-hidden="true">
      <span className="cursor-ring__label" ref={labelRef} />
    </div>
  );
}
