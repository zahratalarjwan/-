# Contributing to CineFlow AI Studio

Thank you for your interest in contributing to **CineFlow AI Studio**!

## Code of Conduct
We are committed to maintaining a welcoming, inclusive, and professional environment for all contributors. Respectful collaboration is required at all times.

## Production Standards for CineFlow
When submitting changes or new features, ensure strict compliance with our filmmaking rules:
1. **Character Consistency:**
   - Omar's model must always reflect an authentic Omani boy wearing a clean white dishdasha and an embroidered white/brown kammah.
   - Ruqayya's model must strictly feature an emerald green modest hijab covering her hair completely, with an olive green floral dress.
   - Farfoor's model must remain a friendly, spherical floating robot with cyan digital eyes.
2. **Arabic Dialogue:**
   - Default Arabic text must remain unvocalized (without tashkeel).
   - Maintain natural spoken pacing (~0.36 seconds per word).
3. **No Fake Functionality:**
   - Every button, form, and modal must deliver real utility. If a service requires external keys, clearly mark it as *Not Connected* or *Requires Configuration* rather than faking API responses.
4. **Security & Zero Secrets in Source:**
   - Never commit API keys, service account JSONs, or environment files.
   - Sanitize all parameters before passing them to system subprocesses (such as FFmpeg).

## Development Workflow
1. Fork and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the automated test suite before committing:
   ```bash
   npm test
   ```
4. Verify production build succeeds:
   ```bash
   npm run build
   ```
5. Submit a descriptive Pull Request referencing any relevant issues.

## Style Guide
- **TypeScript:** Strict type checking enabled (`strict: true`). Avoid using `any` where structured interfaces exist in `src/types/index.ts`.
- **CSS / Styling:** Use Tailwind utility classes adhering to the Dark Cinematic palette (`cine-950`, `cine-900`, `cine-850`, `cine-accent-*`).
- **Icons:** Use `lucide-react`.
