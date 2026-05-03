# Fintrack Budget — Product & Technical Specification

## 1. Overview

**Fintrack Budget** is a responsive web application for personal finance tracking, focusing on:

- Expense management
- Debt tracking & settlements
- Simple analytics and filtering

The app supports authenticated and unauthenticated experiences, with modal-driven interactions and clean, dashboard-style UI.

---

## 2. User Roles

### 2.1 Guest User

- View landing page
- Open Login / Register modal

### 2.2 Authenticated User

- Manage expenses
- Track debts
- View notifications (future scope)
- Access profile & logout

---

## 3. Application Structure

### 3.1 Routes

```
/                → Landing Page
/dashboard       → Default (Expenses)
/expenses        → Expenses Page
/debts           → Debts Page
/notifications   → Notifications (placeholder)
/profile         → Profile (minimal)
```

---

## 4. Landing Page

### 4.1 Sections

- Hero Section
  - App intro
  - CTA: "Join Us"
  - Opens Auth Modal (Login/Register toggle)

- Features Section
  - Expense tracking
  - Debt management
  - Insights (future AI)

---

## 5. Global Layout (Authenticated)

### 5.1 Header

- Logo / App Name
- Navigation:
  - Expenses
  - Debts
  - Notifications

- Profile Icon (Dropdown)
  - Logout

### 5.2 Logout Flow

- Click logout → Confirmation Modal
- Options:
  - Confirm → Clear session + redirect to landing
  - Cancel → Close modal

---

## 6. Expense Module

### 6.1 Overview Card

- Current Month Label with the month name e.g April 2026
- Total Expense Amount

---

### 6.2 Controls

- Month Filter
- Search (by title)
- Filters:
  - Category
  - Payment Method

- Sort:
  - Date ( this option will be button label and arrow up/down)
  - Amount  ( this option will be button label and arrow up/down)
 on click of this sort options will sort by every click . arrows will signifies asc and desc

- Add Expense Button

---

### 6.3 Expense List

- Pagination: 10 per page
- Columns:
  - Date
  - Title
  - Category
  - Payment Method
  - Amount
  - Actions a three dot menu (Edit/Delete)

### 6.4 Dynamic Header Info

On any filter/search:

- Total transactions count
- Total filtered amount

---

### 6.5 Add/Edit Expense Modal

Fields:

- Title (max 20 chars)
- Date (date picker)
- Amount (positive number only)
- Category (dropdown)
- Payment Method (dropdown)

Behavior:

- Same modal for Add/Edit
- Validation required
- Submit → Save & refresh list

---

### 6.6 Delete Expense

- Confirmation modal:
  - "Are you sure?"
  - Yes → delete
  - No → cancel

---

### 6.7 Categories

```
Food & Dining
Groceries
Transport
Shopping
Bills & Utilities
Entertainment
Health
Travel
Other
```

---

### 6.8 Payment Methods

```
Credit Card
Debit Card
Cash
Bank Transfer
Google Pay
PhonePe
```

---

## 7. Debt Module

### 7.1 Summary Cards

- Total Owed to Me
- Total I Owe
- Net Position

---

### 7.2 Filters

- Tabs:
  - All
  - Active
  - Closed

---

### 7.3 Debt Item

Each debt contains:

- Name (Person)
- Date Started
- Status (Running / Settled)
- Amount Summary:
  - Total Paid
  - Total Repaid
  - Outstanding Balance

---

### 7.4 Payments Section

- List of transactions:
  - Date
  - Title
  - Amount
  - Payment Mode

---

### 7.5 Add Entry (Payment/Repayment)

Modal Fields:

- Title
- Date
- Amount
- Payment Mode

---

### 7.6 Mark as Settled

- Confirmation Modal
- Optional comment
- Update status to Closed

---

## 8. State Management

### 8.1 Redux Toolkit

Slices:

- authSlice
- expenseSlice
- debtSlice
- uiSlice (modals, filters)

---

### 8.2 React Query

Used for:

- Server sync (Appwrite)
- Caching
- Mutations

---

## 9. Backend (Appwrite)

### 9.1 Collections

#### Users

- id
- name
- email

#### Expenses

- id
- userId
- title
- amount
- category
- paymentMethod
- date
- createdAt

#### Debts

- id
- userId
- name
- type (owed_to_me | i_owe)
- startDate
- status (active | closed)
- totalAmount

#### DebtEntries

- id
- debtId
- title
- amount
- paymentMethod
- type (paid | repaid)
- date

---

## 10. Validation Rules

### Expense

- Title: required, max 20 chars
- Amount: > 0
- Date: required

### Debt Entry

- Amount: > 0
- Title: required

---

## 11. UI/UX Guidelines

- Mobile-first responsive design
- Modal-driven actions
- Clean dashboard cards
- Consistent spacing (Tailwind)
- Color indicators:
  - Green → positive
  - Red → negative
  - Neutral → info

---

## 12. Component Structure

```
components/
  layout/
  header/
  modals/
  expense/
    expense-table.tsx
    expense-form.tsx
  debt/
    debt-card.tsx
    debt-entry.tsx
```

---

## 13. Tech Stack Mapping

| Feature      | Library             |
| ------------ | ------------------- |
| UI           | shadcn + radix-ui   |
| State        | redux toolkit       |
| Server state | react-query         |
| Forms        | tanstack react-form |
| Tables       | tanstack table      |
| Date         | date-fns            |
| Backend      | appwrite            |
| Styling      | tailwindcss         |

---

## 14. Future Enhancements

- AI Insights
- Notifications system
- Recurring expenses
- Export reports (CSV/PDF)
- Multi-user shared debts

---

## 15. Non-Functional Requirements

- Fast load (<2s initial)
- Accessible (ARIA compliance)
- Secure auth (Appwrite)
- Scalable state management
- Clean code modularity

---

## 16. Acceptance Criteria

- All CRUD operations functional
- Filters & search reactive
- Pagination works correctly
- Modals accessible & reusable
- Debt calculations accurate

---

## 17. Notes

- Use optimistic updates where possible
- Debounce search input
- Maintain consistent currency formatting
- Ensure timezone-safe date handling

---

**End of Spec**
