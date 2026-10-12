import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ALIVE Institute',
    short_name: 'ALIVE',
    description: 'Premier coaching institute for Classes 6th to 12th in Indore. Igniting Minds, Building Futures.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a3a5c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  };
}
