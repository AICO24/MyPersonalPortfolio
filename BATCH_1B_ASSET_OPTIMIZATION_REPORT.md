# Batch 1B — Asset Optimization & Broken Reference Fixes Report

**Batch:** Batch 1B  
**Role:** Senior Front-End Developer (Performance & Asset Optimization)  
**Date:** November 5, 2026  
**Active Branch:** `batch-1b-asset-optimization`  
**Status:** Completed (Awaiting User Review & Approval before Batch 2A)  

---

## 1. Executive Summary

Batch 1B resolved critical media defects, optimized oversized assets, and hardened image loading performance across the personal portfolio. 

The most critical finding and fix of this batch was uncovering that **`Profile2.png` was not a valid PNG**, but an Apple iPhone HEIF container (`ftypheic`, 3024×4032 px, 1.20 MB) with an arbitrary `.png` file extension that failed to render in Chrome, Firefox, and Edge. Using the Windows Imaging Component (`Microsoft HEIF Decoder`), `Profile2.png` was converted into a valid W3C PNG at crisp 480×640 px resolution, saving **790,776 bytes (65.69% reduction)** and restoring cross-browser display.

Additionally, layout shift (CLS) prevention attributes (`width`, `height`), native lazy loading (`loading="lazy"`, `decoding="async"`), and carousel cache preloading were implemented.

---

## 2. Files Modified and Created

### Modified Files:
1. `index.html`:
   - Added `width="140" height="140" loading="eager"` to the above-the-fold profile avatar.
   - Added `width="340" height="180" loading="lazy" decoding="async"` to all three below-the-fold project card thumbnails.
   - Added `width="390" height="280" loading="lazy" decoding="async"` to the project detail modal image.
2. `js/modules/carousel.js`:
   - Added browser cache preloading (`new Image().src = ...`) for secondary carousel images to eliminate hover and click latency.
3. `assets/images/profile/Profile2.png`:
   - Converted from 3024×4032 raw Apple HEIF container into a compliant 480×640 PNG image.

### Created Files:
1. `BATCH_1B_ASSET_OPTIMIZATION_REPORT.md`: This comprehensive implementation report.

---

## 3. Broken References Found & Corrected

| Location | Prior Value | Defect | Resolution & New Target |
| :--- | :--- | :--- | :--- |
| `assets/images/profile/Profile2.png` | `ftypheic` Apple HEIF (3024×4032) | **Severe Browser Failure:** Chrome, Firefox, and Edge on Windows/Android cannot decode HEIF in `<img>`. Hovering over avatar resulted in a blank/broken frame. | Decoded using WIC `Microsoft HEIF Decoder` and converted to native W3C PNG at 480×640 px. Verified with `System.Drawing.Image`. |
| `index.html:103` (`data-img`) | `assets/SystemProject1.png` | File did not exist on disk (404 on modal open). | Pointed to verified asset: `assets/images/projects/architecture/SystemArchitectureProject1.png`. |
| `index.html:165` (`modal-image`) | `assets/project1.svg` | File did not exist on disk (404 on initial DOM parse). | Pointed to verified asset: `assets/images/projects/architecture/SystemArchitectureProject1.png`. |

---

## 4. Image Optimization & Exact File-Size Savings

### 4.1 Optimization Measurements

| Asset | Original Dimensions | Optimized Dimensions | Original Size | Optimized Size | Exact Savings (Bytes) | Exact Savings (%) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `assets/images/profile/Profile2.png` | 3024 × 4032 px (HEIF) | 480 × 640 px (PNG) | 1,203,858 bytes (1,175.64 KB) | 413,082 bytes (403.40 KB) | **790,776 bytes** (772.24 KB) | **65.69%** |

*Note on other project screenshots:* `SystemArchitectureProject1.png` (207 KB), `SystemArchitectureProject2.png` (205 KB), `SystemProject2.png` (249 KB), `MusicVideo.png` (102 KB), and `ProjectAnimation&VideoEditing.png` (154 KB) were inspected. Re-encoding tests confirmed that these files already possess high indexed compression; re-encoding them with generic encoders would enlarge them by up to 4x. Therefore, they were preserved in their original state.

### 4.2 Core Web Vitals & Loading Hardening
- **Cumulative Layout Shift (CLS):** `width` and `height` dimension ratios were added to all five `<img>` elements in `index.html`, allowing browsers to allocate bounding boxes prior to asset download.
- **Largest Contentful Paint (LCP):** The above-the-fold profile avatar is explicitly prioritized with `loading="eager"`.
- **Below-the-Fold Offloading:** The three project card thumbnails and modal preview image use native `loading="lazy"` and `decoding="async"` to conserve mobile network bandwidth.
- **Zero-Latency Hover:** Secondary carousel images (`Profile2.png`, `Profile3.png`) are preloaded asynchronously into the browser memory cache upon DOM readiness.

---

## 5. Assets Identified as Unused but Preserved

In strict compliance with Section 5.C, **zero original assets were deleted**. The following unreferenced assets remain safely preserved in `assets/`:

| Preserved Unused File | Size (Bytes) | Size (KB) | Nature / Content |
| :--- | :--- | :--- | :--- |
| `assets/GroupPhoto(2).png` | 2,073,222 bytes | 2,024.63 KB (1.98 MB) | Unreferenced group photograph. |
| `assets/posterrizal.jpg` | 297,265 bytes | 290.30 KB | Unreferenced event poster. |
| `assets/SystemProject2(1).png` | 189,692 bytes | 185.25 KB | Unreferenced system diagram variant. |
| `assets/SystemProject2(2).png` | 190,508 bytes | 186.04 KB | Unreferenced system diagram variant. |
| `assets/SystemProject2(3).png` | 73,573 bytes | 71.85 KB | Unreferenced system diagram variant. |
| `assets/` root duplicates (8 files) | 2,464,710 bytes | 2,406.94 KB | Original files kept for backwards compatibility. |

**Total Preserved Unused Payload:** 5,288,970 bytes (~5.04 MB) kept safely in repository history.

---

## 6. Generated Portrait Restriction Compliance

No newly generated, external, or AI-generated portraits were imported or substituted. The existing identity, photographic likeness, and content remain completely authentic and unchanged.

---

## 7. Remaining Issues & Limitations (For Batch 2A)

1. **Content Integration (Batch 2A):** Flagship projects (**TindaMate** and **Cemetery Management System**) are ready for structured integration in Batch 2A.
2. **Heading Hierarchy (Batch 2B):** Sidebar section titles (`h1` → `h3`) will be aligned with WCAG heading specifications.
3. **Modal Focus Trap (Batch 2B):** Complete keyboard focus trapping inside the modal dialog will be implemented in Batch 2B.

---

## 8. Git Branch and Working Tree Status

- **Base Branch:** `batch-1a-architecture-migration` (clean, committed).
- **Active Branch:** `batch-1b-asset-optimization`
- **Remote:** `origin/main` remains untouched.

---

## 9. Manual Verification Instructions

To verify Batch 1B locally:

1. Open `c:\MyPersonalPortfolio` in VS Code.
2. Start Live Server on `index.html` (or run `npx serve .`).
3. **Verify Profile Carousel:**
   - Hover over the profile avatar picture in the sidebar.
   - Confirm that the photo smoothly switches from `Profile1.png` to the newly optimized, valid `Profile2.png` and then `Profile3.png` with **zero latency and zero blank/broken frames**.
   - Click the avatar to verify click-cycling.
4. **Verify Project Images:**
   - Confirm all 3 project card thumbnails render cleanly without layout jumps.
   - Click each project card to verify that the modal dialog opens with a valid image preview.
5. **Verify Developer Tools Console:**
   - Press `F12` and inspect both the **Console** and **Network** tabs.
   - Confirm **0 HTTP 404 errors** and **0 MIME type / decoding warnings**.

---

*End of Batch 1B Implementation Report. Stopped per instructions. Awaiting user review and approval before Batch 2A.*

