# UI Optimization & Branding Overhaul Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a professional, mobile-optimized Bill Generator with dynamic templates and enhanced UX.

**Architecture:** Use a responsive layout with "Sticky Preview" on desktop and "Tabbed Navigation" on mobile. Implement a sticky action bar for mobile ergonomic access.

**Tech Stack:** React, Tailwind CSS, Lucide React (or SVG icons), jsPDF, html-to-image.

---

### Task 1: Update State Schema & Dynamic Fields

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/components/BillForm.jsx`
- Modify: `src/components/BillPreview.jsx`

**Step 1: Update `formData` state in `Home.jsx`**
Add `department` and `school` with default values.
```javascript
// src/pages/Home.jsx
const [formData, setFormData] = useState({
  month: 'March 2026',
  department: 'Department of Physical Sciences',
  school: 'School of Engineering, Technology & Sciences',
  // ... rest of data
});
```

**Step 2: Add dynamic inputs to `BillForm.jsx`**
Add inputs for Department and School. Use `inputmode` for tel field.
```javascript
// src/components/BillForm.jsx
// Add inputs for department and school
// Update mobile input: <input type="tel" name="mobile" ... />
```

**Step 3: Update `BillPreview.jsx` to use dynamic data**
```javascript
// src/components/BillPreview.jsx
// Replace static text with {data.department} and {data.school}
```

**Step 4: Commit**
```bash
git add src/pages/Home.jsx src/components/BillForm.jsx src/components/BillPreview.jsx
git commit -m "feat: make department and school dynamic"
```

---

### Task 2: Implement Responsive Layout & Sticky Sidebar

**Files:**
- Modify: `src/pages/Home.jsx`

**Step 1: Add Tab state for mobile**
```javascript
const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
```

**Step 2: Implement Responsive Container**
On mobile, show tabs. On desktop, show two columns with sticky preview.
```javascript
// src/pages/Home.jsx
<div className="lg:grid lg:grid-cols-2 lg:gap-8 items-start">
  <div className={activeTab === 'edit' ? 'block' : 'hidden lg:block'}>
    <BillForm ... />
  </div>
  <div className={`lg:sticky lg:top-8 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
    <BillPreview ... />
  </div>
</div>
```

**Step 3: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: add mobile tabs and desktop sticky preview"
```

---

### Task 4: Branding, Header & Footer

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Footer.jsx`
- Modify: `src/pages/Home.jsx`

**Step 1: Create Header component**
Professional bar with IUB theme.

**Step 2: Create Footer component**
"Developed by Momotaj Akther Happy" with context.

**Step 3: Integrate into Home.jsx**

**Step 4: Commit**
```bash
git add src/components/Header.jsx src/components/Footer.jsx src/pages/Home.jsx
git commit -m "feat: add professional header and footer"
```

---

### Task 5: UX Enhancements (Sticky Bar & Pulse)

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/components/TimesheetForm.jsx`

**Step 1: Implement Sticky Bottom Bar on Mobile**
```javascript
// src/pages/Home.jsx
<div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-4 lg:hidden z-50">
  {/* Add Row and Download buttons */}
</div>
```

**Step 2: Implement Auto-Scroll and Pulse in `TimesheetForm.jsx`**
Use `useEffect` to detect new entries, `ref.current.scrollIntoView()`, and a CSS transition for the pulse.

**Step 3: Final Style Polish**
Cleanup `App.css` and ensure Tailwind consistency.

**Step 4: Commit**
```bash
git add src/pages/Home.jsx src/components/TimesheetForm.jsx
git commit -m "feat: add sticky mobile bar and entry pulse UX"
```
