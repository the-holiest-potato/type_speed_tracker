# TypeShift - Project Context

## Project Overview
**TypeShift** is a modern, web-based typing speed and accuracy tracker. It provides a highly interactive environment inspired by minimalist typing platforms, focusing on a clean aesthetic and smooth user experience.

- **Frontend:** React 19, Vite, JavaScript (ESM).
- **Routing:** React Router DOM for multi-page navigation (Home, Login, Profile).
- **Icons:** Lucide React for consistent and modern iconography.
- **Styling:** Modern Dark Mode with Purple accents (`--main-color: #ae81ff`).
- **Core Logic:** Real-time WPM and accuracy calculation with a dynamic caret that moves through the text.
- **Project Status:** 
    - **Completed:** Core typing engine, real-time stats (WPM, Accuracy, Raw WPM), modern dark-mode UI, word-based line wrapping, results screen, dynamic word generation, multi-page routing, test duration selection (30/60/120s), infinite typing support, and a fixed 4-line typing window with immediate line-scrolling.
    - **Ongoing:** Refining typing experience, user authentication, and profile management.
    - **Planned:** Database integration, Performance Dashboard, and Leaderboard.

    ## Recent Changes (April 20, 2026)
    - **Test Duration Options:** Added minimalist selection for 30s, 60s, and 120s tests in the header.
    - **Infinite Typing:** Implemented dynamic word generation that appends new words as the user nears the end of the text.
    - **Windowed Typing Area:** Restricted the visible typing area to 4 lines with an "Immediate Scroll" behavior (the previous line hides as soon as the cursor moves to the next).
    - **Global Shortcuts:** Integrated a `Tab + Enter` shortcut to quickly restart the test while preventing default browser focus behavior.
    - **Bug Fixes:** Resolved issues with duration selection sync, keyboard focus leaks, and a crash on the result screen's restart button.
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
- **Modular Styles:** Component-specific styles are kept in adjacent `.css` files (e.g., `src/pages/Login.css`).
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
- `src/App.jsx`: Main routing configuration and application entry point.
- `src/components/Navbar.jsx`: Global navigation component.
- `src/pages/Home.jsx`: Core typing experience and game logic.
- `src/pages/Login.jsx`: User authentication interface.
- `src/pages/Profile.jsx`: User stats and settings overview.
- `src/App.css`: Core design system, dark mode theme, and layout.
- `src/wordGenerator.js`: Utility for generating randomized word lists based on difficulty.
- `src/index.css`: Minimal global resets and color-scheme configuration.
- `package.json`: Dependency management (React 19, Vite 7).
- `README.md`: High-level project description and team details.
