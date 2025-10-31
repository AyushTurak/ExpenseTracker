💰 Expense Tracker with Analytics

A full-featured expense tracking application built with React, TypeScript, Supabase, and Tailwind CSS.
Easily track your income and expenses, visualize spending patterns, set budget alerts, and export your financial data.

🚀 Features
🔐 Authentication

Email/password authentication via Supabase Auth

Secure user registration and login

Protected routes and session management

📊 Dashboard

Real-time financial summary (balance, income, expenses)

Recent transactions overview

Quick transaction entry form

Current month statistics

💼 Transactions Management

Create, read, update, and delete transactions

Advanced filtering (date range, type, category, search)

Pagination for large datasets

Export to CSV and PDF formats

Detailed transaction history

🏷️ Categories

Organize transactions with custom categories

Color-coded categories for easy identification

Separate income and expense categories

Visual category management

📈 Analytics

Interactive line charts showing income vs. expenses

Category breakdown with pie charts

Monthly and yearly trend analysis

Visual insights into spending patterns

💡 Budget Alerts

Set monthly budget limits

Configurable alert thresholds

Email notification preferences

Track spending against your budget

📤 Export Functionality

Export transactions to CSV

Generate PDF reports

Filter data before export

💱 Multi-Currency Support

Choose from 5 major currencies (INR, USD, EUR, GBP, JPY)

Real-time currency conversion with automatic formatting

Persistent currency preference across sessions

Instant visual feedback when changing currency

All amounts displayed in selected currency throughout the app

📱 Progressive Web App (PWA)

Install the app on any device (desktop, tablet, mobile)

Works offline with intelligent caching

Automatic background updates

One-click installation with friendly prompts

Offline-capable with local data access

Installable via home screen shortcut (iOS/Android)

🧩 Tech Stack
Layer	Technologies
Frontend	React 18, TypeScript
Styling	Tailwind CSS
Database	Supabase (PostgreSQL)
Authentication	Supabase Auth
Charts	Recharts
PDF Generation	jsPDF
Build Tool	Vite
PWA Framework	vite-plugin-pwa, Workbox
Icons	Lucide React
⚙️ Prerequisites

Node.js v18+ and npm

A Supabase account and project

🧭 Setup Instructions
1️⃣ Clone and Install Dependencies
npm install

2️⃣ Set Up Supabase

Create a project at supabase.com

Go to Settings → API and copy your project URL and Anon Key

Add these credentials to the .env file

3️⃣ Configure Database

Open your Supabase project dashboard

Navigate to SQL Editor

Copy and run the contents of database-setup.sql

This will create:

Tables: categories, transactions, budget_alerts

Indexes for performance

RLS (Row Level Security) policies

Triggers for automatic timestamps

4️⃣ Configure Authentication

Go to Authentication → Settings

Enable Email authentication

(Optional) Disable email confirmation for testing

Customize email templates as needed

5️⃣ Run the Application
npm run dev


The app will be available at:
👉 http://localhost:5173

🧠 Usage Guide
🪄 First-Time Setup

Register an Account

Click Sign Up and create an account

You’ll be automatically logged in

Create Categories

Navigate to Categories

Add categories for income and expenses

Assign colors for better visualization

Add Transactions

Use the Quick Add form on the Dashboard

Or go to Transactions → Add Transaction

Fill in amount, category, date, and notes

Set Budget Alerts (Optional)

Go to Settings

Define a monthly budget and alert threshold

Enable email alerts if desired

📅 Daily Use

Dashboard: Quick financial overview

Transactions: Full transaction management

Analytics: View visual spending insights

Categories: Manage and organize categories

Settings: Manage budgets and preferences

🧱 Project Structure
src/
├── components/
│   ├── auth/              # Login and Register components
│   ├── categories/        # Category management
│   ├── dashboard/         # Dashboard widgets
│   ├── layout/            # Navbar, Sidebar
│   ├── transactions/      # Transaction forms and lists
│   └── ui/                # Reusable UI components
├── contexts/
│   ├── AuthContext.tsx    # Authentication state
│   ├── CurrencyContext.tsx # Currency management & conversion
│   └── ToastContext.tsx   # Toast notifications
├── lib/
│   └── supabase.ts        # Supabase client config
├── pages/
│   ├── Analytics.tsx
│   ├── Categories.tsx
│   ├── Dashboard.tsx
│   ├── Settings.tsx
│   └── Transactions.tsx
├── services/
│   ├── analyticsService.ts
│   ├── budgetAlertService.ts
│   ├── categoryService.ts
│   └── transactionService.ts
├── utils/
│   ├── exportUtils.ts     # CSV & PDF utilities
│   └── formatters.ts      # Date and currency utils
├── App.tsx
└── main.tsx

🧮 Database Schema
🗂️ categories

User-owned categories

Supports income/expense types

Custom color tagging

💵 transactions

Core transaction data

Category-linked (optional)

Includes amount, date, type, notes

Automatic timestamp updates

🔔 budget_alerts

User-specific budget settings

Alert thresholds and notifications

One alert per user

🔐 Security

Row Level Security (RLS): Users access only their data

Authentication Required: All CRUD operations are protected

Input Validation: Client + server-side validation

Secure Defaults: No unauthenticated data exposure

🏗️ Building for Production
npm run build


The optimized build will be generated in the dist/ directory, including:
- Service worker (`dist/sw.js`) for offline support
- Web app manifest (`dist/manifest.webmanifest`)
- Optimized PWA assets and caching strategies

🌐 Deployment
⚛️ Frontend

Deploy the dist folder to:

Vercel

Netlify

AWS S3 + CloudFront

Any static hosting service

Ensure you:

Add environment variables on your host

Configure redirects for client-side routing

💱 Currency System

Base Currency

All transaction amounts are stored in INR (Indian Rupees) in the database

This is the base currency for all calculations

Users can view amounts in any supported currency via the UI

Supported Currencies

INR (₹) - Indian Rupee - Base currency (rate: 1.0)

USD ($) - US Dollar - Rate: 0.012

EUR (€) - Euro - Rate: 0.011

GBP (£) - British Pound - Rate: 0.0095

JPY (¥) - Japanese Yen - Rate: 1.85

Currency Selection

Click the Globe icon in the navigation bar to access the currency selector

Select your preferred currency from the dropdown menu

Your selection is saved in browser localStorage and persists across sessions

All monetary values throughout the app update instantly

Conversion Logic

All conversions happen client-side using the rates defined in src/contexts/CurrencyContext.tsx

The conversion formula: displayed_amount = stored_amount × conversion_rate

For example: 1000 INR × 0.012 = $12.00

Updating Conversion Rates

To update currency conversion rates:

Open src/contexts/CurrencyContext.tsx

Locate the CONVERSION_RATES object

Update the rates as needed:

export const CONVERSION_RATES: Record<string, number> = {
  INR: 1,        // Base currency - always 1
  USD: 0.012,    // Update this value
  EUR: 0.011,    // Update this value
  GBP: 0.0095,   // Update this value
  JPY: 1.85,     // Update this value
};


The rates are relative to INR (base = 1.0)

All amounts in the database remain in INR

Only the display conversion changes

Adding New Currencies

To add support for additional currencies:

Add the currency to the CURRENCIES array in src/contexts/CurrencyContext.tsx:

export const CURRENCIES: Currency[] = [
  // ... existing currencies
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];


Add its conversion rate to CONVERSION_RATES:

export const CONVERSION_RATES: Record<string, number> = {
  // ... existing rates
  CAD: 0.016,  // Rate relative to INR
};


The currency will automatically appear in the selector

Notes on Currency Display

Amounts are formatted with the appropriate currency symbol

Most currencies show 2 decimal places (e.g., $12.00)

Japanese Yen (JPY) shows no decimal places (e.g., ¥1,850)

Thousands separators are added for readability

📱 PWA Installation & Offline

For complete PWA configuration and offline capabilities, see PWA_SETUP.md

Quick Start:
1. The app will show an "Install App" prompt on first visit
2. Click "Install" on the Dashboard for manual installation
3. Works fully offline with cached data
4. Automatic background updates

Install Prompts

Auto-Popup: Shows 2 seconds after first page load
Dashboard Button: Always available when installable
Smart Dismissal: Remembers user preferences
Toast Notifications: Confirms installation success

Offline Capabilities

View cached transactions and balances
Access analytics and reports
Browse categories and history
Automatic sync on reconnect

Service Worker Features

Network First (APIs): Prioritizes fresh data
Cache First (Assets): Fast asset loading
Stale While Revalidate (Pages): Quick response with background updates
Automatic cache cleanup
