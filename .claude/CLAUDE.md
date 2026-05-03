# CLAUDE.md — Fintrack Budget

## Project Overview

**Fintrack Budget** is a responsive personal finance web app built with React. It covers expense management, debt tracking & settlements, and basic analytics. The UI is modal-driven with a clean dashboard aesthetic.

---

## Tech Stack

| Layer         | Library / Tool          |
|---------------|-------------------------|
| UI Components | shadcn/ui + Radix UI    |
| Styling       | Tailwind CSS            |
| State         | Redux Toolkit           |
| Server State  | React Query (TanStack)  |
| Forms         | TanStack React Form     |
| Tables        | TanStack Table          |
| Dates         | date-fns                |
| Backend       | Appwrite                |
| Language      | TypeScript              |

---

## Project Structure

```
src/
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
  pages/
    Landing.tsx
    Dashboard.tsx     # Redirects to /expenses by default
    Expenses.tsx
    Debts.tsx
    Notifications.tsx # Placeholder
    Profile.tsx       # Minimal
  store/
    index.ts
    slices/
      authSlice.ts
      expenseSlice.ts
      debtSlice.ts
      uiSlice.ts      # Modals, filters, UI state
  hooks/              # Custom React hooks
  lib/
    appwrite.ts       # Appwrite client & helpers
    utils.ts          # Currency formatting, date helpers, etc.
  types/              # Shared TypeScript interfaces
```

---

## Routes

| Path            | Component        | Auth Required |
|-----------------|------------------|---------------|
| `/`             | Landing          | No            |
| `/dashboard`    | Dashboard        | Yes           |
| `/expenses`     | Expenses         | Yes           |
| `/debts`        | Debts            | Yes           |
| `/notifications`| Notifications    | Yes           |
| `/profile`      | Profile          | Yes           |

---

## State Management

### Redux Toolkit Slices

- **authSlice** — current user session, login/logout state
- **expenseSlice** — expense list, active filters, pagination state
- **debtSlice** — debt list, active tab (All/Active/Closed)
- **uiSlice** — modal open/close state, global filter UI state

### React Query

Used for all Appwrite data fetching, caching, and mutations. Always pair mutations with optimistic updates where feasible (see Notes section).

---

## Appwrite Backend

### Collections

#### `users`
| Field | Type   |
|-------|--------|
| id    | string |
| name  | string |
| email | string |

#### `expenses`
| Field         | Type     |
|---------------|----------|
| id            | string   |
| userId        | string   |
| title         | string   |
| amount        | number   |
| category      | string   |
| paymentMethod | string   |
| date          | datetime |
| createdAt     | datetime |

#### `debts`
| Field       | Type                        |
|-------------|-----------------------------|
| id          | string                      |
| userId      | string                      |
| name        | string (person name)        |
| type        | `owed_to_me` \| `i_owe`    |
| startDate   | datetime                    |
| status      | `active` \| `closed`       |
| totalAmount | number                      |

#### `debtEntries`
| Field         | Type                  |
|---------------|-----------------------|
| id            | string                |
| debtId        | string                |
| title         | string                |
| amount        | number                |
| paymentMethod | string                |
| type          | `paid` \| `repaid`   |
| date          | datetime              |

---

## Expense Module

### Overview Card (top of Expenses page)
- Current month label
- Total expense amount
- % change vs. last month (green/red indicator)
- Stats: Last Month Total | Avg/Day | Largest Category

### Controls
- Month filter (date-fns for range calculation)
- Search by title (debounced — 300ms)
- Category filter (dropdown)
- Payment Method filter (dropdown)
- Sort by Date or Amount
- **Add Expense** button → opens Add/Edit modal

### Expense List
- TanStack Table, 10 rows per page
- Columns: Date | Title | Category | Payment Method | Amount | Actions (Edit / Delete)
- Dynamic header: shows total transaction count + total filtered amount on any active filter/search

### Add/Edit Expense Modal (shared modal)
Fields:
- Title — required, max 20 chars
- Date — date picker, required
- Amount — positive number only, required
- Category — dropdown (see values below)
- Payment Method — dropdown (see values below)

On edit do not call api to load the details load it from tanstack local data 
and on every change in item add/edit/delete update the tanstack cached data no need to refetch api to load updated record

### Delete Expense
- Confirmation modal: "Are you sure?" → Yes (delete) / No (cancel)

### Categories
```
Food & Dining | Groceries | Transport | Shopping
Bills & Utilities | Entertainment | Health | Travel | Other
```

### Payment Methods
```
Credit Card | Debit Card | Cash | Bank Transfer | Google Pay | PhonePe
```

---

## Debt Module

### Summary Cards (top of Debts page)
- Total Owed to Me
- Total I Owe
- Net Position (green if positive, red if negative)

### Filters
Tab-based: **All** | **Active** | **Closed**

### Debt Item Fields
- Name (person)
- Date Started
- Status: `Running` / `Settled`
- Amount Summary: Total Paid | Total Repaid | Outstanding Balance

### Payments Section (per debt)
List of transactions:
- Date | Title | Amount | Payment Mode

### Add Entry Modal (Payment / Repayment)
Fields:
- Title — required
- Date — required
- Amount — positive number, required
- Payment Mode — dropdown

### Mark as Settled
- Confirmation modal with optional comment field
- On confirm → set debt status to `closed`

---

## Validation Rules

| Field        | Rule                        |
|--------------|-----------------------------|
| Expense Title| Required, max 20 chars      |
| Amount       | Required, must be > 0       |
| Expense Date | Required                    |
| Debt Entry Title | Required               |
| Debt Entry Amount | Required, must be > 0 |

All forms use TanStack React Form. Show inline errors below each field.

---

## UI/UX Rules

- **Mobile-first** responsive layout (Tailwind breakpoints)
- All create/edit/delete actions are **modal-driven** — no inline editing
- Color semantics:
  - 🟢 Green → positive values, success states
  - 🔴 Red → negative values, destructive actions
  - ⚪ Neutral/Gray → informational, secondary
- Consistent Tailwind spacing scale — don't use arbitrary values unless necessary
- Modals must be accessible: focus trap, `aria-modal`, keyboard-dismissible (Esc)
- Use Radix UI primitives for all modal/dialog/dropdown components

---

## Global Layout (Authenticated)

### Header
- Left: Logo / App name
- Center/Right nav links: Expenses | Debts | Notifications
- Far right: Profile icon → dropdown → Logout

### Logout Flow
1. Click Logout
2. Confirmation modal: "Are you sure you want to logout?"
3. Confirm → clear Redux auth state + Appwrite session → redirect to `/`
4. Cancel → close modal

---

## Coding Conventions

- **TypeScript everywhere** — no `any` unless truly unavoidable
- Functional components only — no class components
- Use `shadcn/ui` components as base; extend with Tailwind, don't override with custom CSS files
- Co-locate component-specific types in the same file; shared types go in `src/types/`
- Name files in `kebab-case`, React components in `PascalCase`
- Mutations via React Query; keep Redux slices for UI/client-only state, not server data
- Format currency consistently — use a shared `formatCurrency(amount: number)` util (Indian Rupee default: `₹`)
- All dates handled via `date-fns` — always store as UTC, display in local timezone

---

## Performance & Quality Notes

- Debounce search input (300ms)
- Use optimistic updates for add/edit/delete mutations where Appwrite allows
- Initial load target: < 2 seconds
- ARIA compliance required on all interactive elements
- Paginate expense list at 10 items per page — do not fetch all records at once

---

## Future Scope (do not build yet)

- AI Insights on spending
- Notifications system
- Recurring expenses
- CSV / PDF export
- Multi-user shared debts

---

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
```

> Update these commands to match your actual `package.json` scripts.

---

*This file is the source of truth for Claude when working on this codebase. Keep it updated as the project evolves.*
