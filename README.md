# SahayakAI - Government Schemes Portal

A modern, responsive web application that helps users find and apply for government and state-level schemes and scholarships.

## Features

- **Multi-language Support**: English, Hindi, and Marathi
- **Responsive Design**: Works on desktop and mobile devices
- **Government-style UI**: Clean, professional design similar to government portals
- **Scheme Catalog**: Browse through 10 sample government schemes with detailed information
- **Interactive Chatbot**: Placeholder chatbot interface for user assistance
- **Contact Form**: Complete contact page with form and office information
- **Category Filtering**: Filter schemes by category (Education, Agriculture, Healthcare, etc.)

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State Management**: React Context for language switching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/faiz/Documents/sahayak_ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sahayak_ai/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── schemes/           # Schemes page
│   ├── chatbot/           # Chatbot page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   ├── SchemeCard.tsx     # Individual scheme card
│   └── LanguageSwitcher.tsx # Language selection
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Language state management
├── lib/                   # Utility libraries
│   ├── translations.ts    # Multi-language translations
│   └── schemes.ts         # Sample scheme data
└── Configuration files...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

1. **Homepage (/)**: Hero section with call-to-action and feature overview
2. **Schemes (/schemes)**: Complete list of available schemes with filtering
3. **Chatbot (/chatbot)**: Interactive chat interface (placeholder)
4. **Contact (/contact)**: Contact form and office information

## Customization

### Adding New Schemes

Edit `/lib/schemes.ts` to add new government schemes. Each scheme requires:
- Multi-language names and descriptions
- Eligibility criteria
- Required documents
- Official application link

### Language Support

Update `/lib/translations.ts` to modify translations or add new languages.

### Styling

The project uses TailwindCSS with custom government-themed colors defined in `tailwind.config.js`.

## Deployment

The application is ready for deployment on Vercel, Netlify, or any platform that supports Next.js.

```bash
npm run build
npm run start
```

## Future Enhancements

- User authentication and profile management
- Real-time eligibility checking
- Document upload and verification
- Integration with actual government APIs
- Real chatbot implementation
- Application tracking system
- SMS/WhatsApp notifications

## Note

This is a prototype website. The backend functionality (authentication, real scheme data, document verification) will be implemented in future iterations.
