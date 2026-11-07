# Changelog

All notable changes to **CineFlow AI Studio** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-07

### Added
- **Core Platform Architecture:** Next.js 14 App Router with TypeScript, Tailwind CSS, and Dark Cinematic Premium UI.
- **AI Director Engine:** Automated generation of 10-point film production packages from single creative prompts.
- **Permanent Character Lock Engine:** Visual specification and negative constraint preservation for Omar, Ruqayya, and Farfoor.
- **Smart Storyboard:** Dual-mode grid and timeline visual editor with multi-version generation and video task dispatch.
- **Arabic Dialogue Studio:** Dual dialect support (Fusha & Omani), reading duration counter (~0.36s/word), lip-sync cue generators, and Web Speech API preview.
- **15 Hollywood Camera Movements:** Comprehensive cinematic camera library with dramatic mood matching.
- **Multi-Adapter Prompt Engine:** Simple mode (default for Omar & Ruqayya), Professional mode, and Advanced mode with adapters for Google Flow, Veo, Runway, and Higgsfield.
- **Assisted Google Flow Companion Mode:** Creator-driven prompt preparation and official platform launcher without credential scraping.
- **Video Editing Studio & FFmpeg 9.0.2 Integration:** Multi-track timeline with server-side H.264 rendering in 16:9, 9:16, and 1:1.
- **Quality Control System (QC):** 7 automated heuristic consistency checks with interactive manual checklist.
- **Production Memory System:** Permanent knowledge retention through *Learn From Approved Results*.
- **YouTube Publishing Studio:** High-CTR titles, timestamped chapters, SEO hashtags, and 16:9 thumbnail concepts.
- **Documentation & CI/CD:** Complete enterprise documentation, `.gitignore`, safe `.env.example`, and GitHub Actions CI workflow.

### Security
- **Command Injection Hardening:** Parameter sanitization for FFmpeg subprocess invocations.
- **Enterprise Security Headers:** Added `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- **Credential Protection:** Zero secret exposure across client bundles and source control.
