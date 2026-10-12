import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aliveinstitute.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/student/',
        '/student/*',
        '/staff/',
        '/staff/*',
        '/admin/',
        '/admin/*',
        '/api/',
        '/api/*'
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
