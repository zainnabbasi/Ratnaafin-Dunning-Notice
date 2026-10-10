# Ratnaafin Dunning Notice Generator & Mail Merge System

Automate monthly dunning notice generation for Ratnaafin Capital directly from Excel/CSV files, producing individual letterhead-compliant PDFs in English or Gujarati auto-named by each borrower's email address, downloadable individually or bundled in a single ZIP.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed through workflow clarification:
> - **Download Delivery**: Both single-click bulk ZIP archive and individual PDF preview/download buttons in a high-density management table.
> - **Batch Language Mode**: Selection of English or Gujarati for the entire monthly run, with interactive live preview and switchable language tab.
> - **Missing/Invalid Emails Handling**: Automatically named with fallback pattern `MISSING_EMAIL_<New_Lan_Number>.pdf` (e.g., `MISSING_EMAIL_001-005-401-000038.pdf`) so no account notice is lost.
> - **Font Rendering for Gujarati**: Embedded web fonts (Noto Sans Gujarati) and client-side vector/canvas-backed PDF pipeline (jsPDF + html2canvas / SVG) to ensure flawless Gujarati conjunct glyph rendering.

---

### 1. Overview & Core Concept

- **What It Does**: Eliminates the multi-step manual workflow (Excel $\rightarrow$ Word Mail Merge $\rightarrow$ Single Giant PDF $\rightarrow$ PDF Splitter $\rightarrow$ Manual file renaming by email). Users select the target notice month, upload an Excel/CSV file (or load the bundled 100+ borrower sample sheet), choose English or Gujarati, preview the generated letters on the official Ratnaafin letterhead, and export individual PDFs named by recipient email (e.g., `bhanuvaghela99@gmail.com.pdf`).
- **Target Audience**: Loan operations, collections, and credit recovery managers at Ratnaafin Capital.
- **Key Value**: Reduces a 2-hour frustrating monthly manual export-and-rename process into a 10-second automated workflow with zero naming mismatches.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Source & Settings Bar**:
   - Month & Year selector (e.g., `September 2026`).
   - Notice Language switch (`English` / `ગુજરાતી`).
   - Excel/CSV upload button with drag-and-drop, plus a 1-click *"Load Sample Dataset (100 Accounts)"* button.
2. **Template & Notice Inspector**:
   - Split view or toggleable drawer featuring the authentic Ratnaafin letterhead:
     - Top-right Ratnaafin logo ("NBFC for Business Owners").
     - Center subtle watermark (`₹` symbol).
     - Standard legal dunning notice body copy (English / Gujarati) with 6 dynamic placeholders:
       `{{New Lan Number}}`, `{{Account Name}}`, `{{Emi Amt}}`, `{{Total Overdue}}`, `{{EMI Due From}}`, `{{Month}}`.
     - Structured financial table: EMI Due Date | EMI Amount (₹) | Overdue Amount (₹).
     - Official footer: Registered Office, Corporate Office, CIN, Email, Toll-Free, and "Possible hai!" badge.
   - Live interactive template editor allowing text customization or variable placement tweaks if corporate legal text changes.
3. **Data Records & Batch Table**:
   - High-density data grid displaying all parsed borrowers:
     - Account Name, LAN Number, Contact No., EMI Amt, Total Overdue, Due Date, Mail ID.
     - Target PDF filename badge (e.g., `bhanuvaghela99@gmail.com.pdf`).
     - Actions: Instant Preview, Single PDF Download.
   - Batch Actions Toolbar:
     - Total count and summary metrics (Total Overdue sum, Accounts with Email, Accounts missing email).
     - **"Generate All & Download ZIP"** with real-time progress bar.

#### Visual Identity & Theme
- **Theme**: Enterprise Financial / NBFC Clean.
- **Palette**:
  - Dominant Canvas: Crisp clean neutral (`#F8FAFC` slate-50).
  - Brand Primary: Ratnaafin Cyan/Teal (`#0096C7` / `#0077B6`) and Corporate Navy (`#0F172A`).
  - Letterhead Accent: "Possible hai!" vibrant green (`#10B981` / `#059669`).
  - Text: Dark Charcoal (`#1E293B`) for high legal legibility.
- **Typography**:
  - Display & UI: Plus Jakarta Sans.
  - Tabular Numbers: Monospace tabular numerals (`font-mono tabular-nums`) for currency amounts and LAN numbers.
  - Gujarati Script: Noto Sans Gujarati (loaded via Google Fonts) for typographic rendering without character fragmentation.

---

### 3. Key Product Decisions & Trade-Offs

- **Client-Side In-Browser Generation vs Server-Side Headless Chrome**:
  - *Chosen Approach*: Fast, zero-dependency client-side generation using `jspdf`, `html2canvas`, and `jszip`, plus `xlsx` for Excel/CSV parsing.
  - *Why*: Instant generation inside the browser without file upload server latency, completely private (borrower financial data never leaves the client browser), and fully offline-capable.
- **Gujarati Typography Fidelity**:
  - *Chosen Approach*: Render letterhead notices in a DOM container styled with `Noto Sans Gujarati` and rasterize into high-DPI canvas (2x/3x scale) before embedding into A4 PDF pages.
  - *Why*: Standard jsPDF vector text struggles with complex Indian Brahmic scripts / conjunct ligatures (e.g. `પ્રિય`, `શરતો મુજબ`, `ટ્રાન્ઝેક્શન`). Canvas snapshotting preserves glyphs, kerning, and the Ratnaafin watermark and footer with 100% fidelity.
- **Naming Rule Integrity**:
  - *Sanitization*: Filenames are strictly cleaned of invalid filesystem characters (`/`, `\`, `:`, `*`, `?`, `"`, `<`, `>`, `|`).
  - *Missing Email Fallback*: Automatically labeled `MISSING_EMAIL_<New_Lan_Number>.pdf` with visual indicator in the table so the user can easily identify records requiring manual dispatch.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Ratnaafin Dunning App                           │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐        ┌──────────────────┐
│  Dataset Loader  │       │ Language & Month │        │ Template Engine  │
│  - Excel/CSV     │       │ - Month Picker   │        │ - English Legal  │
│  - 100 Demo Rows │       │ - EN / GU Toggle │        │ - Gujarati Legal │
│  - Column Map    │       │                  │        │ - Letterhead SVG │
└────────┬─────────┘       └─────────┬────────┘        └────────┬─────────┘
         │                           │                          │
         └───────────────────────────┼──────────────────────────┘
                                     ▼
                      ┌─────────────────────────────┐
                      │    Batch Synthesis Engine   │
                      │  - Variable Injection       │
                      │  - Filename Resolving       │
                      │  - Canvas/PDF Conversion    │
                      └──────────────┬──────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    ▼                                 ▼
         ┌──────────────────────┐          ┌──────────────────────┐
         │ Individual PDF View  │          │   ZIP Archiver       │
         │ - Live Letter Modal  │          │   - JSZip Bundle     │
         │ - Direct Download    │          │   - Batch Download   │
         └──────────────────────┘          └──────────────────────┘
```

#### Key Libraries
- `xlsx`: For reading `.xlsx`, `.xls`, and `.csv` files.
- `jspdf`: For standard A4 PDF document composition.
- `html2canvas`: For pixel-perfect rendering of the letterhead with Gujarati fonts and watermarks.
- `jszip` & `file-saver`: For packaging all generated PDFs into a single zip archive.
- `lucide-react`: Clean functional icons.

#### Step-by-Step Implementation Sequence
1. **Dependencies**: Install `xlsx`, `jspdf`, `html2canvas`, `jszip`, `file-saver` and their type definitions.
2. **Data & Sample Pre-Load**: Embed the 100-record dataset provided by the user so the tool works out-of-the-box on load.
3. **Master Letterhead & Templates**:
   - Reconstruct the official Ratnaafin letterhead (Logo, NBFC tagline, watermark ₹, and exact corporate footer).
   - English Master Template with dynamic variables.
   - Gujarati Master Template with exact Gujarati text and dynamic variables.
4. **Interactive Dashboard**:
   - Control bar (Month selector, Language toggle, Upload/Sample button).
   - High-density borrower ledger table with search and filtering.
   - Single preview drawer with print/download.
   - Batch generation progress tracker with bulk ZIP download.
5. **PDF Engine & Naming**:
   - Compute `<CleanEmail>.pdf` or `MISSING_EMAIL_<LAN>.pdf`.
   - Batch progress feedback bar during ZIP bundling.
6. **Verification & Build**: Compile and verify layout, fonts, and end-to-end PDF export.
