# Project Overview: Automotive & Financial Services Portal

This is a modern, multilingual React application designed for an automotive and financial services business. The platform provides information and contact options for various services including car sales, financing (auto and real estate), Schufa clearance, tax advice, insurance, and vehicle registration.

## Technical Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Motion](https://motion.dev/) (formerly Framer Motion)

## Architecture & Project Structure

- **`src/components/`**: Reusable UI components (Layout, Hero, ServicesGrid, Modals, etc.).
- **`src/pages/`**: Main page components (`Home`, `ServicePage`).
- **`src/store/`**: Zustand store for global state management (language selection, modal states, and i18n helper).
- **`src/i18n/`**: Centralized translation strings for multiple languages (DE, RO, EN, IT, RU, AR, TR).
- **`src/main.tsx`**: Application entry point.
- **`src/App.tsx`**: Root component defining routes and layout.

### Internationalization (i18n)

The project uses a custom i18n implementation managed via Zustand. The `useStore` hook provides a `t` function to retrieve translations based on the currently selected language, which is persisted in `localStorage`.

## Development Workflow

### Building and Running

- **Install dependencies:**
  ```bash
  npm install
  ```
- **Run development server:**
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:3000`.
- **Build for production:**
  ```bash
  npm run build
  ```
- **Type checking (Linting):**
  ```bash
  npm run lint
  ```

### Development Conventions

- **Component Structure:** Prefer functional components with TypeScript interfaces for props.
- **Styling:** Use Tailwind CSS utility classes. For complex animations, leverage the `motion` library.
- **State:** Keep global UI state (like language or modals) in the Zustand store. Local component state should use `useState`.
- **Routing:** New pages should be added to the `Routes` in `src/App.tsx`.
- **Translations:** Always add new strings to all supported languages in `src/i18n/translations.ts` to maintain consistency.

## Environment Variables

Copy `.env.example` to `.env.local` and set the following variables:
- `GEMINI_API_KEY`: Your Google Gemini API key (if AI features are enabled).
