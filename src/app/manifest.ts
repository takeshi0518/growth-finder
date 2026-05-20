import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Growth Finder',
    short_name: 'Growth Finder',
    description: 'スタッフの成長を可視化し、関係性構築を支援する人材育成ツール',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/img/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
