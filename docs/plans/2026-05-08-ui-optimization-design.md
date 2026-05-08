# Design Document: UI Optimization & Branding Overhaul

**Date:** 2026-05-08
**Topic:** Mobile/Desktop Optimization, Professional Branding, and UX Improvements

## 1. Objectives
- Optimize the layout for seamless mobile and desktop usage.
- Enhance branding with a professional header, footer, and IUB-inspired design.
- Improve UX with better feedback for new entries and a mobile-friendly action bar.
- Increase template flexibility by making Department and School names dynamic.

## 2. Architecture & Components

### Layout Strategy
- **Desktop:** Two-column layout with a "Sticky Preview" on the right.
- **Mobile:** Tabbed navigation ("Edit Form" vs "Preview") to maximize screen real estate.
- **Sticky Bar:** A persistent bottom bar on mobile containing "Add Row" and "Download PDF".

### Component Updates
- **Home.jsx:** Manage tabs, layout, header, footer, and the new sticky bar.
- **BillForm.jsx:** Add fields for `department` and `school`. Optimize input types (`tel`, etc.).
- **BillPreview.jsx:** Dynamically render department/school from state.
- **TimesheetForm.jsx:** 
  - Desktop: Compact table-row layout.
  - Mobile: Refined card layout.
  - Interaction: Auto-scroll to new entries and a "pulse" highlight effect.

### Branding & Aesthetics
- **Palette:** Deep blues, grays, and high-contrast accents (IUB style).
- **Typography:** Clean sans-serif for the app; Serif preserved for the PDF preview.
- **Header:** Professional bar with logo and title.
- **Footer:** Detailed credits and organizational context.

## 3. Interaction Design
- **New Row:** Clicking "Add Row" triggers `scrollIntoView` on the new card and focuses the Date field.
- **Validation:** Visual cues (red text/borders) for invalid time ranges.
- **Pulse Effect:** New entries will briefly flash a light background to confirm creation.

## 4. Implementation Steps
1. Update state schema in `Home.jsx`.
2. Modify `BillForm` and `BillPreview` for dynamic headers.
3. Implement the tabbed mobile layout and sticky desktop layout in `Home.jsx`.
4. Refactor `TimesheetForm` for new layout patterns and scroll-to logic.
5. Apply final branding styles and create Header/Footer components.
