# Hackathon Frontend

A minimal, accessible Next.js app with Tailwind CSS and shadcn/ui components—ready for Vercel deployment.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run locally:**

   ```bash
   npm run dev
   ```

3. **Deploy to Vercel:**
   - Push this repo to GitHub.
   - Import into [Vercel](https://vercel.com/import).
   - No extra config needed—Vercel auto-detects Next.js.

## Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

## Accessibility

- Uses semantic HTML and accessible color contrast.
- All interactive elements have accessible labels.

## Customization

- Edit `app/page.js` for your landing page.
- See [shadcn/ui docs](https://ui.shadcn.com/docs) for more components.

---

© Hackathon Team

#To-Do

App startup script commands

npm i
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add tooltip
npx shadcn@latest add toggle-group
npx shadcn@latest add toggle
npx shadcn@latest add toast
npx shadcn@latest add textarea
npx shadcn@latest add tabs
npx shadcn@latest add table
npx shadcn@latest add switch
npx shadcn@latest add sonner
npx shadcn@latest add slider
npx shadcn@latest add skeleton
npx shadcn@latest add sheet
npx shadcn@latest add separator
npx shadcn@latest add select
npx shadcn@latest add scroll-area
npx shadcn@latest add resizable
npx shadcn@latest add radio-group
npx shadcn@latest add progress
npx shadcn@latest add popover
npx shadcn@latest add pagination
npx shadcn@latest add navigation-menu
npx shadcn@latest add menubar
npx shadcn@latest add label
npx shadcn@latest add input-otp
npx shadcn@latest add input
npx shadcn@latest add hover-card
npx shadcn@latest add form
npx shadcn@latest add dropdown-menu
npx shadcn@latest add drawer
npx shadcn@latest add dialog
npx shadcn@latest add context-menu
npx shadcn@latest add command
npx shadcn@latest add collapsible
npx shadcn@latest add checkbox
npx shadcn@latest add carousel
npx shadcn@latest add card
npx shadcn@latest add calendar
npx shadcn@latest add button
npx shadcn@latest add breadcrumb
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add aspect-ratio
npx shadcn@latest add alert-dialog
npx shadcn@latest add alert
npx shadcn@latest add accordion

#Login Password:

Username: PS
Password: PS@1234

#Firebase Deploy:

npm install -g firebase-tools
firebase login
npm install firebase firebase-admin

firebase init

firebase init hosting

firebase experiments:enable webframeworks

firebase deploy

=====

firebase experiments:enable webframeworks

===

gcloud run deploy hackathon-26-fe \
 --source . \
 --region us-central1 \
 --memory=2Gi \
 --cpu=1 \
 --concurrency=4 \
 --min-instances=0 \
 --max-instances=5 \
 --port=8080 \
 --timeout=300 \
 --automatic-updates \
 --quiet
