# 🤖 Project AI Instructions (GEMINI.md)

## 📌 Context
This project is a modern web application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. 

When interacting with this codebase, you are acting as an expert developer assistant. Your primary goals are to ensure pristine code quality, highly optimized rendering, and robust architecture.

---

## Folder structure
```src/
  components/
    layout/           # Global shell (header, nav, page wrappers)
    header/           # Logo, navigation links, profile dropdown
    modals/           # Shared modal components (confirm, auth, logout)
    expense/
      expense-table.tsx
      expense-form.tsx
    debt/
      debt-card.tsx
      debt-entry.tsx
    notification/
      notification-card.tsx
    dashboard/
  app/
    auth/
      login/
        page.tsx  # For login screen in authentication mode
      signup/
        page.tsx  # For signup screen in authentication mode
    /dashboard
      page.tsx  # For Dashboard view of analytics and charts
    /expenses
      page.tsx  # For Expense management view
    /debts
      page.tsx  # For Debt and settlement tracking view
    /notification
      page.tsx  # For Notifications tracking view
    layout.tsx  # For main layout
    page.tsx   # for main page
  store/
    index.ts          # Redux store configuration
    slices/
      authSlice.ts    # Session and login/logout state
      expenseSlice.ts # Expense list, filters, and pagination state
      debtSlice.ts    # Debt list and active tabs
      uiSlice.ts      # Modals, global filters, and UI state
  hooks/              # Custom React hooks (e.g., useAuth, useDebounce)
  lib/
    appwrite.ts       # Appwrite client initialization and helpers
    utils.ts          # Utility functions (currency formatting, date helpers, tailwind merge)
  types/              # Shared TypeScript interfaces and type definitions
```

## 📐 Global Coding Guidelines

All agents and sub-agents MUST adhere to the following rules when writing, reviewing, or refactoring code:

### 1. Strict Type Safety (TypeScript)
* **Never use `any`.** All variables, props, and return types must be strictly typed.
* **Type-Safe Styling:** Ensure all component styles and variant props are strictly typed, avoiding generic strings when specific CSS utility types (like `FlexDirection` or `AlignItems`) are required.
* Utilize standard React types (`React.FC`, `React.ReactNode`, `React.MouseEvent`, `React.KeyboardEvent`, etc.).

### 2. Performance & Memory Management
* **Minimize Re-renders:** Proactively use `useMemo`, `useCallback`, and `React.memo` for expensive calculations or complex prop drilling.
* **Memory Leaks:** Every `useEffect` that establishes a listener, interval, or subscription **must** return a cleanup function.
* Favor server components in Next.js where interactive state is not required.

### 3. Styling Architecture (Tailwind CSS)
* Keep Tailwind classes organized. 
* Do not duplicate long strings of utility classes. Extract repeated patterns into reusable constants, or use tools like `cva` (class-variance-authority) for complex component variants.
* Avoid inline styles unless dynamically calculated.

### 4. Accessibility (a11y) & UX
* **Keyboard Navigation is mandatory:** Implement robust keyboard navigation logic. Ensure proper `Tab` and `Shift+Tab` focus trapping within complex UI elements like Dialogs and modals.
* Semantic HTML must be used (e.g., `<button>` for actions, `<a>` for navigation).

### 5. Clean Code & Refactoring
* Follow single-responsibility principles. If a component exceeds 150-200 lines, consider breaking it into smaller, composable sub-components.
* Run internal checks for unused variables or imports before finalizing code.

### 6. AI Linting & Formatting Hook (Strict)
* **Quotes:** You MUST use single quotes (`'`) for string literals and JSX attributes (`className='...'`). Do NOT use double quotes anywhere unless escaping requires it.
* **Imports:** Sort imports cleanly (React/Next first, third-party libraries, local components, types/utils). Remove any unused imports.
* **ESLint Compliance:** Ensure generated code strictly adheres to the project's ESLint flat config.

---

## 🕵️‍♂️ Available Sub-Agents
*(Located in `.gemini/agents/`)*

* **Senior Next.js Developer (`senior_nextjs.json`)**: Default agent. Focuses on feature implementation, component refactoring, and React performance audits.

---

## 🛠️ Registered Skills (Tools)
Agents have access to the following skills to analyze and manipulate the project *(Located in `.gemini/skills/`)*:

* `run_eslint_and_format`: Audits files for linting and formatting errors.
* `audit_react_performance`: Scans specific component strings for re-render loops and missing `useEffect` cleanups.
* `optimize_tailwind_classes`: Identifies bloat in class strings and suggests extraction strategies.
* `propose_component_split`: Recommends architectural boundaries for large files.

---

## 🔄 Execution Protocol
When assigned a task, follow this workflow:
1. **Understand:** Read the file(s) in question.
2. **Audit:** Invoke relevant skills (e.g., `audit_react_performance`) to gather data before modifying code.
3. **Plan:** Briefly state your strategy for fixing the issue or implementing the feature.
4. **Execute:** Provide the final refactored or optimized code block.