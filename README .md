# 💰 Finovate — Finance Dashboard

A clean, interactive finance dashboard built with React and Tailwind CSS. It allows users to track income, expenses, and spending patterns with role-based UI behavior.

🔗 **Live Demo:** [https://finovate-xi.vercel.app/](https://finovate-xi.vercel.app/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or above)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tripathipalak/Finovate.git

# Navigate into the project
cd finovate

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Tailwind CSS | Styling |
| Recharts | Charts and visualizations |
| Framer Motion | Animations |
| React Icons | Sidebar icons |
| Vite | Build tool |

---

## ✨ Features

### 📊 Dashboard Overview
- Summary cards showing **Total Balance**, **Income**, and **Expenses**
- All values formatted in Indian Rupees (₹) with locale formatting
- **Balance Trend** line chart across 3 months (Feb–Apr 2026)
- **Spending Breakdown** pie chart with category legend

### 💳 Transactions Section
- Full transaction list with Date, Category, Type badge, and Amount
- **Search** by category name
- **Filter** by type — All / Income / Expense
- **Sort** by Date (Newest/Oldest) or Amount (High/Low)
- Empty state handled gracefully when no results match

### 🔐 Role-Based UI
Switch between roles using the dropdown in the top-right corner:

| Role | Permissions |
|------|-------------|
| **Viewer** | Can view all data — read only |
| **Admin** | Can add, edit, and delete transactions |

When in **Admin** mode:
- A **+ Add** button appears above the transaction table
- Each row shows **Edit** and **Delete** action buttons
- Clicking **Edit** opens a pre-filled modal form
- Clicking **Add** opens a blank modal form with validation

### 💡 Insights Section
- **Top 3 spending categories** with relative progress bars
- **Monthly comparison table** — Income, Expense, and Savings per month
- **Stats grid** — Total transactions, Savings rate (%), and Highest expense category

### 💾 Data Persistence
- All transaction data is saved to **localStorage** automatically
- Data persists across page refreshes
- On first load, the app seeds with 22 pre-built mock transactions

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AddTransactionModal.jsx   # Modal form for add/edit
│   ├── Charts.jsx                # Line + Pie charts (responsive)
│   ├── Insights.jsx              # Insights section
│   ├── Navbar.jsx                # Top navbar with role switcher
│   ├── RoleSwitcher.jsx          # Viewer / Admin dropdown
│   ├── Sidebar.jsx               # Fixed sidebar with navigation
│   ├── SummaryCard.jsx           # Balance / Income / Expense cards
│   └── TransactionTable.jsx      # Filterable, sortable table
├── context/
│   └── AppContext.jsx            # Global state (Context API)
├── data/
│   └── mockData.js               # 22 mock transactions
├── pages/
│   └── Dashboard.jsx             # Main page layout
└── App.jsx                       # Root component with AppProvider
```

---

## 🧠 State Management

Global state is managed using **React Context API** (`AppContext`). The following state is stored globally:

- `transactions` — array of all transaction objects
- `role` — current user role (`viewer` or `admin`)
- `search` — search string for category filtering
- `filterType` — type filter (`all`, `income`, `expense`)
- `sortBy` — active sort order

Actions available through context:
- `addTransaction(txn)` — adds a new transaction
- `editTransaction(id, updated)` — updates an existing transaction
- `deleteTransaction(id)` — removes a transaction by ID

---

## 📱 Responsiveness

- Sidebar is **fixed** and always visible on scroll
- Summary cards use a **responsive grid** (1 col on mobile, 3 on desktop)
- Charts use `ResponsiveContainer` from Recharts — fluid on all screen sizes
- Transaction table has `overflow-x-auto` for small screens

---

## 🔄 Switching Roles (Demo)

1. Locate the **Viewer** dropdown in the top-right of the dashboard
2. Select **Admin** from the dropdown
3. The transaction table will now show **Edit**, **Delete**, and **+ Add** controls
4. Switch back to **Viewer** to hide all edit controls

---

## 🌐 Deployment

This project is deployed on **Vercel**. To deploy your own copy:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** and select your repository
4. Click **Deploy** — Vercel auto-detects Vite, no config needed
5. Your live URL will be ready in ~1 minute

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🙌 Author

Built by **Palak** as part of a frontend assignment to demonstrate UI design, state management, and role-based interfaces.
