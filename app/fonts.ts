import localFont from 'next/font/local'

export const plein = localFont({
  variable: '--font-plein',
  display: 'swap',
  src: [
    { path: '../public/fonts/Plein-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Plein-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Plein-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Plein-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Plein-Italic.ttf', weight: '400', style: 'italic' },
  ],
})

export const switzer = localFont({
  variable: '--font-switzer',
  display: 'swap',
  src: [
    { path: '../public/fonts/Switzer-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Switzer-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Switzer-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Switzer-Semibold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/Switzer-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Switzer-Italic.ttf', weight: '400', style: 'italic' },
  ],
})

