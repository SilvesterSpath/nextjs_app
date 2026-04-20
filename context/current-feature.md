# Current Feature

<!-- Feature Name -->

Property AI - Phase 2 (Frontend Integration)

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Update `components/PropertyAddForm.jsx`
- Add a "Generate with AI" button near the Description section
- Add minimal local state for:
  - isGenerating
  - aiError
  - rawNotes
- Add an optional `rawNotes` textarea for user guidance
- Build the AI request payload from existing form values:
  - property type
  - location
  - beds
  - baths
  - amenities
  - rawNotes
- Call `/api/properties/ai-content`
- On success:
  - fill the existing Listing Name field
  - fill the existing Description field
- Keep the normal property submit flow unchanged

## Notes

<!-- Any extra notes -->

- Do not integrate into the edit page in this phase
- Do not add bullet points, tags, or SEO keywords
- Do not refactor unrelated form logic
- References:
  - `components/PropertyAddForm.jsx`
  - `app/properties/add/page.jsx`
  - `app/api/properties/ai-content/route.js`
  - `utils/requests.js`
  - `context/features/property-ai-phase-1-spec.md`
  - `context/features/property-ai-phase-2-spec.md`
  - `context/features/property-ai-phase-3-spec.md`

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-04-17: Feature initialized from `property-ai-phase-1-spec.md` and status set to In Progress.
- 2026-04-20: Property AI Phase 1 complete. Fixed error classification gaps: malformed request JSON now returns `400 INVALID_REQUEST`; AI provider network failures and upstream body parse failures now return normalized `502` errors (`AI_PROVIDER_ERROR` / `AI_INVALID_RESPONSE`). Changes in `app/api/properties/ai-content/route.js` and `utils/ai/generatePropertyAIContent.js`.
- 2026-04-20: Feature updated to Property AI Phase 2 (Frontend Integration).

**Completed Features**
