import type { MetadataRoute } from 'next';
import { courses, facultyDemoData } from '@/lib/data';
import { educationalResources } from '@/lib/resources-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aliveinstitute.in';
  const currentDate = new Date();

  // Static core public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];

  // Dynamic Course URLs
  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  // Dynamic Faculty URLs
  const facultyRoutes: MetadataRoute.Sitemap = facultyDemoData.map((faculty) => ({
    url: `${baseUrl}/faculty/${faculty.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75
  }));

  // Dynamic Educational Resource URLs
  const resourceRoutes: MetadataRoute.Sitemap = educationalResources.map((resource) => ({
    url: `${baseUrl}/resources/${resource.slug}`,
    lastModified: new Date(resource.updatedDate || resource.publishedDate),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  return [
    ...staticRoutes,
    ...courseRoutes,
    ...facultyRoutes,
    ...resourceRoutes
  ];
}
