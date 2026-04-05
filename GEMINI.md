# TypeShift - Project Context

## Project Overview
**TypeShift** is a modern, web-based typing speed and accuracy tracker. It provides a highly interactive environment inspired by minimalist typing platforms, focusing on a clean aesthetic and smooth user experience.

- **Frontend:** React 19, Vite, JavaScript (ESM).
- **Styling:** Modern Dark Mode with Purple accents (`--main-color: #ae81ff`).
- **Core Logic:** Real-time WPM and accuracy calculation with a dynamic caret that moves through the text.
- **Project Status:** 
    - **Completed:** Core typing engine, real-time stats (WPM, Accuracy, Raw WPM), modern dark-mode UI, word-based line wrapping, results screen, and dynamic word generation.
    - **Ongoing:** Refining typing experience and asset management.
    - **Planned:** User Authentication, Performance Dashboard, and Leaderboard.

## Recent Changes (April 5, 2026)
- **Dynamic Word Generation:** Integrated `src/wordGenerator.js` to provide a randomized set of words for each test session, replacing the hardcoded sample text.
- **Test Completion Logic:** Implemented an automatic test finish condition when the user reaches the end of the generated text, in addition to the time-based finish.
- **Reset Functionality:** Updated the restart mechanism to refresh the word pool, ensuring a unique experience every time.

## Building and Running
The project uses **Vite** as the build tool and development server.

- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint Codebase:** `npm run lint`
- **Preview Production Build:** `npm run preview`

## Development Conventions

### Coding Style
- **React Components:** Functional components using hooks (`useState`, `useEffect`, `useRef`).
- **Input Handling:** Uses a hidden text input to capture keystrokes, allowing the UI to render a custom caret and character-by-character feedback.
- **Font:** Uses `Roboto Mono` for a consistent monospaced typing experience.

### UI & Styling
- **Theme:** Dark mode by default (`#111111`) with purple highlights.
- **CSS Variables:** Standardized in `src/App.css` for colors (`--main-color`, `--bg-color`, etc.) and typography.
- **Text Rendering:** Characters are grouped into `.word` containers to prevent words from splitting across lines during wrapping. Spaces are rendered as non-breaking spaces (`\u00A0`).
- **Animations:** Subtle transitions for character states (correct/incorrect) and a blinking caret.

### Core Implementation Details
- **WPM Calculation:** Standardized as `(correct characters / 5) / time in minutes`.
- **Raw WPM:** Calculated as `(total characters typed / 5) / time in minutes`.
- **Typing Engine:** Characters are rendered individually within a `.words-wrapper`. A `.caret` element is dynamically positioned based on the current input length.
- **State Management:** Local React state manages the active test session. The `useEffect` hook is optimized to avoid cascading renders by handling test-finishing logic within the `setInterval` callback.
- **Word Generation:** Uses a custom `wordGenerator.js` utility that supports different difficulty levels (easy, common, hard) and ensures no two consecutive words are the same.
- **Space Handling:** Incorrectly typed spaces are visually marked with a red background to ensure visibility.

## Key Files
- `src/App.jsx`: Main application logic, typing engine, and state management.
- `src/App.css`: Core design system, dark mode theme, and layout.
- `src/wordGenerator.js`: Utility for generating randomized word lists based on difficulty.
- `src/index.css`: Minimal global resets and color-scheme configuration.
- `package.json`: Dependency management (React 19, Vite 7).
- `README.md`: High-level project description and team details.
