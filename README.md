# Ray - Client Proposal Generator

AI-powered client proposal generator for freelancers and agencies. Create professional, winning proposals in minutes instead of hours.

🚀 **Live Demo:** Coming soon

## Features

- 📝 **Smart Generation** - AI writes compelling proposal copy based on your inputs
- 🎨 **Professional Templates** - Beautiful, customizable proposal designs
- 📄 **PDF Export** - Download ready-to-send PDF proposals
- 💾 **Save & Reuse** - Store templates and client info for faster proposals
- 💳 **Simple Pricing** - Pay per proposal or subscribe for unlimited

## Tech Stack

- **Frontend:** Next.js 14 + React + Tailwind CSS
- **AI:** Anthropic Claude API
- **PDF:** @react-pdf/renderer
- **Payments:** Stripe
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key
- Stripe account (for payments)

### Installation

```bash
# Clone the repo
git clone https://github.com/MLttu/Ray-client-proposal-generator.git
cd ray-proposal-generator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Landing page
│   ├── create/            # Proposal creation flow
│   │   └── page.tsx
│   ├── preview/           # Proposal preview
│   │   └── page.tsx
│   └── api/               # API routes
│       ├── generate/      # AI generation endpoint
│       └── pdf/           # PDF generation endpoint
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── proposal/         # Proposal-specific components
├── lib/                   # Utilities
│   ├── anthropic.ts      # Claude API integration
│   ├── pdf.ts            # PDF generation
│   └── stripe.ts         # Payment handling
└── types/                # TypeScript types
```

## Roadmap

### MVP (Week 1-2)
- [x] Project setup
- [ ] Basic proposal form (client, project, pricing)
- [ ] AI-powered content generation
- [ ] Single proposal template
- [ ] PDF export
- [ ] Stripe checkout (pay-per-proposal)

### V1 (Week 3-4)
- [ ] Multiple templates
- [ ] Save/edit proposals
- [ ] Client database
- [ ] Subscription billing

### Future
- [ ] Team features
- [ ] Proposal analytics (opened, viewed)
- [ ] E-signatures
- [ ] Custom branding

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT

---

Built with 🤖 by [Mark Lujan](https://mlujandesign.com)
