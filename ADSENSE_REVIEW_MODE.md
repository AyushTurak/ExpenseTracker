# AdSense Review Mode Documentation

## Overview

This document describes the temporary authentication bypass feature created specifically for Google AdSense review. This allows AdSense reviewers to access all pages without creating an account.

## How It Works

The application uses an environment variable `VITE_ADSENSE_REVIEW_MODE` to control authentication enforcement:

- When set to `'true'`: Authentication is bypassed, allowing access to all pages
- When set to `'false'`: Normal authentication is enforced (default)

## Implementation Details

### Files Modified

1. **`.env`** - Added the feature flag:
   ```
   VITE_ADSENSE_REVIEW_MODE=false
   ```

2. **`src/components/layout/ProtectedRoute.tsx`** - Updated to check the feature flag:
   - Reads `import.meta.env.VITE_ADSENSE_REVIEW_MODE`
   - Bypasses authentication redirect when set to `'true'`

### Security Considerations

- The flag only bypasses the frontend route protection
- Backend RLS (Row Level Security) policies remain active
- No user data is exposed when not authenticated
- Pages will show empty states when no user is logged in
- All data operations require authentication at the database level

## How to Enable for AdSense Review

### Step 1: Update Environment Variable

Edit the `.env` file and change:

```diff
- VITE_ADSENSE_REVIEW_MODE=false
+ VITE_ADSENSE_REVIEW_MODE=true
```

### Step 2: Rebuild the Application

```bash
npm run build
```

### Step 3: Deploy to Preview Environment

Deploy the updated build to your hosting platform (Vercel, Netlify, etc.)

### Step 4: Submit to AdSense

Use the preview deployment URL when submitting to AdSense for review.

## How to Disable After AdSense Approval

### Step 1: Revert Environment Variable

Edit the `.env` file and change back:

```diff
- VITE_ADSENSE_REVIEW_MODE=true
+ VITE_ADSENSE_REVIEW_MODE=false
```

### Step 2: Rebuild and Deploy

```bash
npm run build
```

Then deploy to production.

## Testing the Feature

### Test with Auth Bypass Enabled

1. Set `VITE_ADSENSE_REVIEW_MODE=true` in `.env`
2. Start the dev server: `npm run dev`
3. Navigate to protected routes like `/app/dashboard`
4. Verify you can access the pages without logging in
5. Verify pages show empty states (no user data)

### Test with Auth Bypass Disabled

1. Set `VITE_ADSENSE_REVIEW_MODE=false` in `.env`
2. Start the dev server: `npm run dev`
3. Navigate to protected routes like `/app/dashboard`
4. Verify you are redirected to `/login`

## Important Notes

- This is a **temporary** feature for AdSense review only
- Always set `VITE_ADSENSE_REVIEW_MODE=false` in production after approval
- The feature does not compromise user data security
- Monitor your hosting platform's environment variables to ensure the flag is set correctly
- Consider removing this feature entirely after AdSense approval is complete

## Git Workflow for AdSense Review

### Option 1: Separate Branch (Recommended)

```bash
# Create a new branch for AdSense review
git checkout -b adsense-review

# Update .env file
# Set VITE_ADSENSE_REVIEW_MODE=true

# Commit changes
git add .env
git commit -m "Enable AdSense review mode"

# Deploy this branch to a preview URL
# Submit preview URL to AdSense

# After approval, switch back to main
git checkout main

# DO NOT merge the adsense-review branch to main
```

### Option 2: Production Feature Flag

If your hosting platform supports environment variables:

1. Keep `VITE_ADSENSE_REVIEW_MODE=false` in `.env` file
2. Set the variable to `true` in your hosting platform's dashboard (for preview only)
3. Deploy a preview build
4. Submit the preview URL to AdSense
5. After approval, remove the environment variable override

## Rollback Instructions

If you need to quickly disable the feature:

1. Set `VITE_ADSENSE_REVIEW_MODE=false` in `.env`
2. Rebuild: `npm run build`
3. Deploy immediately

Or if deployed via environment variables:

1. Update the environment variable in your hosting platform
2. Trigger a redeploy

## Contact Form Setup

The contact form now uses Formspree for email delivery:

- Formspree endpoint: `https://formspree.io/f/xanygkjz`
- Emails are sent to: `turakayush@gmail.com`
- Honeypot spam protection is enabled
- Mailto fallback link is provided for accessibility

No additional setup is required for the contact form to work.
