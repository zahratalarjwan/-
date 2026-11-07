# Testing Guide for CineFlow AI Studio

## Overview
CineFlow AI Studio incorporates automated test coverage verifying:
- Prompt generation syntax across Google Flow, Veo, Runway, and Higgsfield adapters.
- Quality Control heuristic evaluation algorithms.
- Subtitle timecode calculations for `.srt` and `.vtt` specifications.
- Security sanitization defenses against command injection attacks.
- Server-side API endpoint contract validation.

## Running Tests
Run all test suites locally:
```bash
npm test
```

Run tests with interactive watcher during development:
```bash
npm run test:watch
```

Run test coverage analysis:
```bash
npm run test:coverage
```

## Test Directory Structure
```
tests/
├── unit/
│   ├── promptGenerator.test.ts    # Tests Simple, Pro, Advanced modes and adapter formatting
│   ├── subtitles.test.ts          # Tests SRT and VTT timecode formatting & dialogue mapping
│   ├── qcEngine.test.ts           # Tests heuristic rules, scoring, and checklist integrity
│   └── securitySanitizer.test.ts  # Tests FFmpeg parameter sanitization and injection defense
└── integration/
    └── apiEndpoints.test.ts       # Tests /api/director, /api/ffmpeg/render, /api/qc/analyze
```

## Adding New Tests
When adding new features:
1. Ensure unit tests verify both valid inputs and edge cases (e.g. empty strings, zero duration, unsupported aspect ratios).
2. Never mock successful live API integration as evidence of connectivity if no live API credentials are configured.
3. Validate that character constraints for Omar and Ruqayya are verified in all prompt tests.
