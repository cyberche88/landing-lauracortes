# Design System Document: Velvet Obsidian — Violet Edition

## 1. Overview & Creative North Star
**Creative North Star: "The Amethyst Gallery"**
This design system is not a utility; it is a curated experience. It moves away from the "app-like" density of standard interfaces toward a high-end, editorial "Magazine-as-an-Interface" philosophy. The goal is to evoke the feeling of a private gallery at midnight—where ultraviolet light replaces candlelight and darkness provides the canvas for digital sovereignty.

To achieve this, we break the "template" look by utilizing **intentional asymmetry** and **expansive negative space (Air)**. We treat every screen as a film frame, prioritizing visual hierarchy over information density. Large-scale typography, overlapping elements, and violet light leaks replace traditional boxes and lines.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Deep Black" foundation, punctuated by electric violet and soft lilac.

### The Color Tokens
* **Background / Surface:** `#131313` (The Deep Void)
* **Primary (Violet):** `#A855F7` | **Container:** `#7C3AED`
* **Secondary (Lilac):** `#C084FC`
* **On-Surface (Text/Icons):** `#e5e2e1` (Off-white to prevent harsh contrast)
* **On-Surface Variant:** `#cfc2d6` (Muted lavender-white for secondary text)
* **Outline Variant:** `#4d4354`

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. In a premium environment, structural lines are perceived as "noise."
* **Transitions:** Define boundaries through background shifts only. Use `surface-container-low` for secondary sections and `surface-container-high` for interactive modules.
* **The Signature Gradient:** Use a subtle, large-radius radial gradient of `primary-container` (`#7C3AED`) at 8% opacity in corners of the screen to simulate ultraviolet lens flares.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of obsidian and smoked glass:
1. **Base Layer:** `surface` (#131313)
2. **Inset Content:** `surface-container-lowest` (#0e0e0e) for recessed areas.
3. **Raised Elements:** `surface-container-low` (#1c1b1b) for cards.
4. **Floating Modals:** `surface-bright` (#3a3939) with a 20px backdrop-blur.

---

## 3. Typography
The tension between the traditional Serif and the geometric Sans-Serif creates a "Modern Heritage" aesthetic.

* **Display & Headlines (Playfair Display / Noto Serif):** Used for storytelling. These should be set with tighter letter-spacing (-2%) and generous leading. Never center-align more than three lines; keep it editorial (left-aligned or intentionally staggered).
* **Body & Titles (Montserrat / Manrope):** The functional layer. Set in `body-lg` (1rem) for readability. Use `on-surface-variant` (#d0c5b2) for secondary text to maintain the "warm" atmosphere.
* **Editorial Scaling:** Use extreme scale differences. A `display-lg` headline should dominate the screen, followed by a significantly smaller, wide-tracked `label-md` for sub-headers to create "the luxury gap."

---

## 4. Elevation & Depth
In "The Nocturnal Gallery," depth is created by light, not by physics.

* **The Layering Principle:** Stack `surface-container` tiers. Place a `surface-container-high` card on a `surface` background to create a "soft lift."
* **Ambient Shadows:** Use shadows only for floating elements (modals/dropdowns).
* *Spec:* `0px 24px 48px rgba(0, 0, 0, 0.5)`. The shadow must feel like a natural fall-off of light.
* **The "Ghost Border" Fallback:** If a container needs more definition (e.g., in high-glare environments), use the `outline-variant` (#4d4637) at **15% opacity**. It should be felt, not seen.
* **Glassmorphism:** For top navigation bars or floating action buttons, use `surface` at 60% opacity with a `40px` backdrop-blur. This keeps the "Cinematic" background visible as the user scrolls.

---

## 5. Components

### Buttons: The "Jewelry" of the UI
* **Primary:** Gradient from `#A855F7` to `#7C3AED` (Violet Shimmer). No border. On hover: brightness +10%, `box-shadow: 0 8px 40px rgba(168,85,247,0.45)`.
* **Secondary:** Ghost style. No fill, `outline` at 30% opacity. On hover, the background fills with a 5% violet tint.
* **Shape:** Use `md` (0.375rem) roundedness. It’s elegant, not "bubbly."

### Cards & Lists
* **Rule:** Forbid divider lines.
* **Separation:** Use `48px` or `64px` of vertical white space to separate list items. For cards, use a background shift to `surface-container-low`.
* **Imagery:** Photos should have a subtle `0.5rem` (lg) corner radius and a slight darkening overlay to ensure text legibility.

### Input Fields
* **Style:** Minimalist under-lines or "soft-fill" boxes. Use `surface-container-highest` for the field background. The cursor/caret should always be the `tertiary` (Amber) color to act as a "beacon."

### Signature Component: The "Hero Spotlight"
A specific layout pattern where a large `display-lg` Serif title overlaps a high-quality image by 20px, creating a layered, 3D magazine effect.

---

## 6. Do’s and Don’ts

### Do:
* **Use "The Air":** If you think there is enough white space, add 20% more. Premium is defined by what you *don’t* show.
* **Embrace Asymmetry:** Place a small label on the far right and a large headline on the left.
* **Tone-on-Tone:** Use violet text on dark purple-black backgrounds; keep the contrast sophisticated, not jarring.
* **Surgical Violet:** Use `#A855F7` only for CTAs, key numbers, and eyebrow labels. Lilac `#C084FC` for supporting tags and overlines.

### Don’t:
* **No Pure White:** Never use `#FFFFFF`. Use `on-surface` (#e5e2e1) to keep the cinematic warmth.
* **No Sharp Corners:** Avoid `0px` radius; it feels too aggressive. Use `sm` or `md` for a "tailored" feel.
* **No Standard Grids:** Avoid the "3-column card row" whenever possible. Try a 2/3 and 1/3 split to create visual interest.
* **No High-Contrast Borders:** Never use a 100% opaque border. It breaks the illusion of a seamless, light-based interface.
* **No Violet Overload:** If everything glows violet, nothing glows. Use as a surgical strike only.