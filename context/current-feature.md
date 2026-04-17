# Current Feature

## Feature

Property AI - Phase 1 (Backend Foundation)

Implement backend-only AI content generation for property listings. This phase adds an authenticated API endpoint that accepts property details and returns AI-generated `title` and `shortDescription` with validation and normalized error handling.

## Status

In Progress

## Goals

- Add route:
  - `app/api/properties/ai-content/route.js`

- Implement:
  - POST endpoint only
  - Authenticated access using existing session utility

- Accept JSON input:
  - propertyType
  - location
  - beds
  - baths
  - amenities
  - rawNotes (optional)

- Add minimal input validation

- Call AI provider from the server

- Ensure AI response returns only:
  - title
  - shortDescription

- Validate response shape before returning

- Return normalized JSON error responses

## Constraints

- Do not modify frontend files
- Do not modify `Property` schema
- Do not persist AI-generated data in this phase

## Notes

- References:
  - `app/api/properties/route.js`
  - `app/api/properties/[id]/route.js`
  - `utils/getSessionUser.js`
  - `models/Property.js`
  - `context/features/property-ai-phase-1-spec.md`
  - `context/features/property-ai-phase-2-spec.md`
  - `context/features/property-ai-phase-3-spec.md`

## History

- 2026-04-17: Feature initialized from `property-ai-phase-1-spec.md` and status set to In Progress.

**Completed Features**
