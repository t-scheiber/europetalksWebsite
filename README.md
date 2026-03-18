# EuropeTalks

🌍 **Live at: [europetalks.eu](https://europetalks.eu)**

A modern, multilingual platform connecting Europeans across borders through cultural exchange, community events, and meaningful dialogue.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Translation System](#translation-system)
- [Admin Panel](#-admin-panel)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

EuropeTalks is a comprehensive web platform that facilitates cultural exchange and community engagement across Europe. The platform enables users to discover events, register for activities, explore photo galleries, and connect with a vibrant community of Europeans passionate about shared values and cross-border collaboration.

### Mission

To create a space where Europeans can share ideas, celebrate cultural diversity, and build lasting connections that transcend national borders.

---

## ✨ Features

### For Users

- 🌐 **Multilingual Support** - 12 languages (EN, DE, ES, FR, IT, PT, NL, EL, HR, HU, LV, UK)
- 📅 **Event Discovery** - Browse upcoming and past events with detailed information
- ✍️ **Event Registration** - Dynamic form system with custom fields per event
- 📸 **Photo Gallery** - Event galleries organized by location and date
- 💬 **Contact Form** - Direct communication with organizers
- 🌓 **Dark/Light Theme** - Seamless theme switching with system preference detection
- 📱 **Responsive Design** - Optimized for all devices

### For Admins

- 👥 **User Management** - Clerk-based authentication with role-based access
- 📝 **Event Management** - Create, edit, and delete events with custom signup forms
- 📊 **Signup Management** - View and export event registrations
- 🔧 **Form Builder** - Create reusable form schemas with dynamic fields
- 🌍 **Translation Editor** - Manage translations for all supported languages
- 📤 **Data Export** - Export signups and translations
- 🖼️ **Image Upload** - UploadThing integration for event images

---

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **React**: 18.3 with Server Components
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **i18n**: [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)

### Backend

- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **File Upload**: [UploadThing](https://uploadthing.com/)
- **Email**: [Nodemailer](https://nodemailer.com/)

### Developer Tools

- **TypeScript**: Full type safety
- **ESLint**: Code quality
- **Prisma Studio**: Database management
- **Git**: Version control

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **npm** or **pnpm** or **yarn**
- **PostgreSQL** database
- **Clerk** account (for authentication)
- **UploadThing** account (for file uploads)
- **SMTP server** (for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/europetalksWebsite.git
   cd europetalksWebsite
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file and fill in your values:

   ```bash
   cp .env.example .env.local
   ```

   See [Environment Variables](#-environment-variables) section for details.

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed translations
   npm run seed:translations
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Database

```env
DATABASE_URL="postgresql://user:password@localhost:5432/europetalks?schema=public"
```

### Clerk Authentication

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs (optional, uses defaults if not set)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

**Domain note:** Clerk uses two domains: **Frontend API** (`clerk.europetalks.eu`) for API calls only; **Account Portal** (`accounts.europetalks.eu`) for sign-in, sign-up, sign-out, and user profile. Use `accounts.europetalks.eu` for any direct links to sign-out (e.g. `https://accounts.europetalks.eu/sign-out`), not `clerk.europetalks.eu`.

### Email Configuration (Contact Form)

```env
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
CONTACT_FORM_EMAIL_SERVER_USER=your_email@example.com
CONTACT_FORM_EMAIL_SERVER_PASSWORD=your_password
CONTACT_FORM_EMAIL_FROM=noreply@europetalks.eu
SEND_TO_EMAIL=contact@europetalks.eu
```

### Email Configuration (Event Signups)

```env
EVENT_SIGNUP_EMAIL_SERVER_USER=your_email@example.com
EVENT_SIGNUP_EMAIL_SERVER_PASSWORD=your_password
EVENT_SIGNUP_EMAIL_FROM=events@europetalks.eu
```

### UploadThing (File Uploads)

```env
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

### Translation Export

```env
TRANSLATIONS_EXPORT_API_KEY=your_random_secure_key
```

### Node Environment

```env
NODE_ENV=development
```

See `.env.example` for a complete template.

---

## 📁 Project Structure

```text
europetalksWebsite/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── admin/               # Admin panel
│   │   ├── events/         # Event management
│   │   ├── signups/        # Signup management
│   │   ├── form-schemas/   # Form builder
│   │   └── translations/   # Translation editor
│   ├── api/                # API routes
│   │   ├── contact/        # Contact form
│   │   ├── events/         # Event APIs
│   │   ├── uploadthing/    # File upload
│   │   └── translations/   # Translation APIs
│   ├── contact/            # Contact page
│   ├── events/             # Events page
│   ├── gallery/            # Photo gallery
│   ├── past-events/        # Past events
│   └── ...
├── components/             # React components
│   ├── admin/             # Admin components
│   ├── events/            # Event components
│   ├── translations/      # Translation components
│   ├── ui/                # UI components (Radix)
│   └── ...
├── lib/                   # Utility libraries
│   ├── db.ts             # Database connection
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Helper functions
│   └── validations/      # Zod schemas
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
├── public/               # Static assets
│   ├── images/          # Images and gallery
│   └── locales/         # Translation files
├── translations/         # JSON translation files
├── types/               # TypeScript type definitions
└── utils/               # Additional utilities
```

---

## 🎯 Key Features

### Event Management System

The platform includes a comprehensive event management system with:

- **Dynamic Form Builder**: Create custom signup forms with various field types (text, email, phone, date, checkbox, radio, select, etc.)
- **Reusable Form Schemas**: Define form templates that can be applied to multiple events
- **Signup Period Control**: Set custom registration windows for each event
- **Export Functionality**: Download signup data in CSV/JSON format
- **Email Notifications**: Automatic confirmation emails to participants and admins

### Translation System

EuropeTalks uses a hybrid translation approach:

1. **Database-backed translations**: Primary source, editable through admin panel
2. **JSON file fallback**: Local files ensure functionality even if database is unavailable
3. **Admin Editor**: Full-featured translation editor for administrators
4. **Member Editor**: Restricted editor for specific language contributors
5. **Export/Import**: Sync translations between database and JSON files

For detailed information, see [README-TRANSLATIONS.md](README-TRANSLATIONS.md).

### Gallery System

The gallery automatically organizes event photos using a folder-based structure:

```text
public/images/Gallery/
└── EventName_Location_Date/
    ├── photo1.jpg
    ├── photo2.jpg
    └── ...
```

Folder naming convention: `EventName_Location_MonthYear` (e.g., `EuropeTalks-Summit_Brussels_January 2024`)

---

## 🔧 Admin Panel

Access the admin panel at `/admin` (requires admin role in Clerk).

### Features

- **Dashboard**: Overview of events and signups
- **Event Management**: Create, edit, delete events with custom forms
- **Signup Management**: View and export event registrations
- **Form Builder**: Create reusable form schemas
- **Translation Editor**: Manage multilingual content
- **Upload Images**: Manage event images via UploadThing

### Setting Admin Roles

1. Go to your Clerk Dashboard
2. Navigate to Users
3. Select a user
4. Add public metadata: `{ "role": "admin" }`

---

## 🗄 Database Schema

### Main Models

- **Event**: Event information with dates, location, and associated form schema
- **FormSchema**: Reusable form templates with custom fields
- **FormField**: Individual form fields (text, email, phone, etc.)
- **EventTerm**: Terms and conditions for event signups
- **EventSignup**: User registrations with dynamic form data
- **Translation**: Multilingual content storage

See [prisma/schema.prisma](prisma/schema.prisma) for the complete schema.

---

## 📦 Deployment

### Deployment Prerequisites

- PostgreSQL database (e.g., [Neon](https://neon.tech/), [Supabase](https://supabase.com/))
- [Vercel](https://vercel.com/) account (recommended) or any Node.js hosting
- Configured Clerk application
- Configured UploadThing application
- SMTP server access

### Steps

1. **Set up your production database**

   ```bash
   npx prisma migrate deploy
   ```

2. **Configure environment variables** in your hosting platform (e.g., Vercel)

3. **Deploy**

   ```bash
   npm run build
   ```

4. **Verify**
   - Test authentication flow
   - Test event signup
   - Test contact form
   - Test image uploads

### Recommended Platforms

- **Hosting**: [Vercel](https://vercel.com/) (optimized for Next.js)
- **Database**: [Neon](https://neon.tech/) (serverless PostgreSQL)
- **Authentication**: [Clerk](https://clerk.com/)
- **File Storage**: [UploadThing](https://uploadthing.com/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📄 License

This project is private and proprietary to EuropeTalks.

---

## 🙏 Acknowledgments

- **Vivien Costanzo** - Founder and President
- All EuropeTalks volunteers and contributors
- The broader European community

---

## 📞 Contact

- **Website**: [europetalks.eu](https://europetalks.eu)
- **Contact Form**: [europetalks.eu/contact](https://europetalks.eu/contact)

---

## 🔗 Additional Documentation

- [Translation System](README-TRANSLATIONS.md)
- [Translation Cleanup](README-TRANSLATIONS-CLEAN.md)

---

## 💝 Built with ❤️ for a united Europe
