# CLAUDE.md — Daly Vet (Lite Veterinary Clinic System)

## 1. Project Overview & Scope
- Product: **Daly Vet** — a lightweight, fast web application for veterinary clinics in Saudi Arabia, positioned under the **Daly Track** digital solutions umbrella.
- Build ONLY the Phase 1 MVP modules below (do NOT add unrequested features or bloat):
  1. **Reception, Reminders & Boarding**: Register pet & owner (auto-format Saudi mobile numbers to `9665xxxxxxxx`), track upcoming vaccinations/deworming with 1-click WhatsApp pre-filled links (`https://wa.me/...`), and basic boarding/grooming status.
  2. **Vet Consultation, Dose Helper & Rx**: Input pet species (cat/dog) and weight, calculate suggested dose helper values clearly marked as clinical reference assistance, record exam/imaging summaries, and generate a clean printable prescription view (`window.print()`).
  3. **Digital Pet Health Passport (`/passport/:uuid`)**: Public read-only page accessed via QR code displaying pet profile, vaccinations, allergies, approved exam/X-ray summaries, and clinic emergency contact—**NEVER** expose owner phone numbers, personal IDs, or private addresses on the public route.
- Localization & Modes: Full **Arabic (RTL)** and **English (LTR)** toggle, **Light / Dark** theme toggle, and **SAR** currency where applicable.

## 2. Visual Assets & Style Rules
- Use the friendly soft-3D pet visuals placed in `public/images/dog-3d.jpg` and `public/images/cat-3d.jpg` sparingly for welcoming cards, empty states, or passport headers so page loads stay fast.
- If `docs/ui-reference.jpg` is present, use its soft emerald/forest green + warm cream/light surface palette, rounded card layout, and clean sidebar/tab structure—**NEVER** copy text, branding ("PawPal"), or personal pet-owner expense trackers from that image.
- Do NOT invent external image URLs or generate extra decorative images on your own.

## 3. Tech Stack & Cloudflare Edge Rules
- Frontend: React + Vite + Tailwind CSS + lightweight QR code component (`qrcode.react` or SVG/Canvas).
- Backend & Database: Cloudflare Pages Functions + Cloudflare D1 (SQLite).
- **STRICT EDGE RULES**:
  - Never use Node-only modules (`fs`, `path`, child processes, or heavy server-side rendering/PDF libraries).
  - Always use parameterized D1 queries (`db.prepare(...).bind(...)`). Never concatenate untrusted input into SQL strings.
  - Run and verify `npm run build` passes with zero errors after each milestone.

## 4. Security & Anti-Hallucination Rules
- Strictly separate public endpoints (`/api/public/passport/[uuid]`) from clinic management endpoints (`/api/clinic/*`).
- Protect `/api/clinic/*` routes/actions with a clinic PIN/session check so unauthenticated callers cannot mutate or list internal clinic records.
- Use random UUIDs (`crypto.randomUUID()`) for public pet passport links—never sequential numeric IDs.
- Do NOT add extra tables, routes, or features beyond `schema.sql` and this file unless explicitly asked.
- Work step-by-step, state what files you modified, and ask when something is unclear rather than guessing.