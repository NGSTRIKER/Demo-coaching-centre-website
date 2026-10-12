import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-context';
import { instituteInfo, branches } from '@/lib/data';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://aliveinstitute.in'),
  title: {
    template: '%s | ALIVE Institute Indore',
    default: 'ALIVE Institute Indore | Premier Coaching for Classes 6th–12th & CUET',
  },
  description:
    'ALIVE Institute Indore — Established in 2012. Top-tier coaching for Classes 6th to 12th (CBSE, ICSE, MP Board) in Science (PCM/PCB) and Commerce, plus specialized CUET preparation at Usha Nagar and Airport Road centers.',
  keywords: [
    'ALIVE Institute',
    'ALIVE Institute Indore',
    'Coaching classes in Indore',
    'Class 10 coaching Indore',
    'Class 12 Science PCM PCB Indore',
    'Commerce coaching Indore',
    'CUET preparation Indore',
    'Usha Nagar coaching',
    'Airport Road coaching Indore',
  ],
  authors: [{ name: 'ALIVE Institute' }],
  creator: 'ALIVE Institute',
  publisher: 'ALIVE Institute',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aliveinstitute.in',
    siteName: 'ALIVE Institute Indore',
    title: 'ALIVE Institute Indore | Igniting Minds, Building Futures',
    description:
      'Premier educational institute in Indore offering comprehensive foundation, secondary, senior secondary (Science & Commerce), and CUET coaching with proven academic results.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ALIVE Institute Indore Campus & Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALIVE Institute Indore | Academic Excellence Since 2012',
    description:
      'Top coaching for Class 6-12th (CBSE, ICSE, MP Board) & CUET at Usha Nagar & Airport Road, Indore.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const educationalOrgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: instituteInfo.name,
  alternateName: 'ALIVE Institute Indore',
  description: instituteInfo.description,
  url: 'https://aliveinstitute.in',
  foundingDate: '2012',
  email: instituteInfo.email,
  telephone: '+919302204651',
  sameAs: [
    'https://www.instagram.com/aliveinstituteindore/',
    'https://www.youtube.com/@aliveinstituteindore',
    'https://www.facebook.com/aliveinstituteindore/',
  ],
  address: branches.map((branch) => ({
    '@type': 'PostalAddress',
    name: branch.name,
    streetAddress: branch.address,
    addressLocality: branch.city,
    addressRegion: branch.state,
    postalCode: branch.pincode,
    addressCountry: 'IN',
    telephone: branch.phone,
  })),
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('alive_theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(educationalOrgJsonLd),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
