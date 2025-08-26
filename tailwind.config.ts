import type { Config } from 'tailwindcss'


export default {
content: [
'./src/app/**/*.{ts,tsx}',
'./src/components/**/*.{ts,tsx}',
'./src/containers/**/*.{ts,tsx}'
],
theme: {
extend: {
fontFamily: {
sans: ["Inter", "ui-sans-serif", "system-ui"]
},
colors: {
brand: {
50: '#eef2ff',
100: '#e0e7ff',
200: '#c7d2fe',
300: '#a5b4fc',
400: '#818cf8',
500: '#6366f1',
600: '#4f46e5',
700: '#4338ca',
800: '#3730a3',
900: '#312e81'
}
},
boxShadow: {
glow: '0 0 25px rgba(99,102,241,0.35)',
},
keyframes: {
floaty: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)'} },
},
animation: {
floaty: 'floaty 6s ease-in-out infinite'
}
},
},
plugins: [],
} satisfies Config