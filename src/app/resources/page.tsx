import type { Metadata } from 'next';
import Link from 'next/link';
import { getResources, getSubjects } from '@/lib/resources-data';
import ResourceListWithFilter from '@/components/resources/ResourceListWithFilter';
import '@/styles/resources.css';

export const metadata: Metadata = {
  title: 'Educational Resources | ALIVE Institute',
  description:
    'Free educational guides, visual mathematics tutorials, organic chemistry concept maps, and board examination study techniques curated by ALIVE Institute Indore.',
  keywords: [
    'ALIVE Institute resources',
    'Class 10 quadratic equations guide',
    'Class 11 organic chemistry notes',
    'board exam study techniques',
    'coordinate geometry formulas',
    'Indore coaching study material'
  ],
  openGraph: {
    title: 'Educational Resources & Study Materials — ALIVE Institute',
    description:
      'Explore deep-dive conceptual guides, formula cheat sheets, and board exam revision strategies prepared by senior coaching educators.',
    url: 'https://aliveinstitute.in/resources',
    type: 'website'
  }
};

export default function ResourcesPage() {
  const resources = getResources();
  const subjects = getSubjects();

  return (
    <main className="resources-page">
      <div className="resources-container">
        {/* Breadcrumb Navigation */}
        <nav className="resources-breadcrumb" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              /
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Resources
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="resources-hero">
          <span className="section-label">RESOURCES</span>
          <h1 className="resources-main-heading">Study Materials &amp; Guides</h1>
          <p className="resources-subheading">
            Conceptual clarity is the foundation of competitive and board examination success.
            Browse our faculty-curated visual breakdowns, step-by-step problem guides, and cognitive study frameworks.
          </p>
        </header>

        {/* Filterable Resource Listing */}
        <ResourceListWithFilter resources={resources} subjects={subjects} />
      </div>
    </main>
  );
}
