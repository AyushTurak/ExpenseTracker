# Quick Setup Guide

Follow these steps to get your Expense Tracker application running.

## Step 1: Database Setup (REQUIRED)

Before running the application, you must set up the database tables in Supabase.

1. **Open Supabase SQL Editor**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Click on "SQL Editor" in the left sidebar

2. **Run the Database Script**
   - Open the `database-setup.sql` file in this project
   - Copy ALL the SQL content
   - Paste it into the Supabase SQL Editor
   - Click "Run" or press Ctrl/Cmd + Enter

3. **Verify Tables Were Created**
   - Go to "Table Editor" in Supabase
   - You should see three new tables:
     - `categories`
     - `transactions`
     - `budget_alerts`

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Verify Environment Variables

The `.env` file should already contain your Supabase credentials:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are already configured for you.

## Step 4: Run the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Step 5: Create Your Account

1. Click "Sign up" on the login page
2. Enter your details (name, email, password)
3. You'll be automatically logged in

## Step 6: Start Using the App

1. **Create Categories First**
   - Go to the Categories page
   - Add some expense categories (e.g., Food, Transport, Entertainment)
   - Add some income categories (e.g., Salary, Freelance)

2. **Add Your First Transaction**
   - Go to the Dashboard
   - Use the Quick Add form on the right
   - Or go to Transactions page and click "Add Transaction"

3. **Set a Budget (Optional)**
   - Go to Settings
   - Enter your monthly budget
   - Set an alert threshold

## Troubleshooting

### "Failed to fetch" or Database Errors

**Most likely cause:** You haven't run the database setup script.

**Solution:**
1. Go to Supabase SQL Editor
2. Copy and run the entire `database-setup.sql` file
3. Refresh your application

### Authentication Errors

**Check:**
- Email authentication is enabled in Supabase (Authentication > Providers)
- You're using a valid email format
- Password is at least 6 characters

### No Data Showing

**Check:**
- You've created categories before adding transactions
- You've added at least one transaction
- You're looking at the correct time period in Analytics

## Need Help?

- Check the main `README.md` for detailed documentation
- Review the `database-setup.sql` file to understand the schema
- Check browser console for detailed error messages
