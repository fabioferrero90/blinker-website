/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff4a1c',
                secondary: '#182b5c',
                'secondary-light': '#87a9ff',
                background: '#ffffff',
                'background-dark': '#1d1d1d',
                text: '#333333',
                'text-light': '#666666',
                'text-dark': '#ffffff',
                accent: '#ff0067',
                'accent-purple': '#342c99',
                'accent-purple-dark': '#530296',
            },
            fontFamily: {
                sans: ['Blinker', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'fade-in-left': 'fadeInLeft 0.8s ease-out',
                'fade-in-right': 'fadeInRight 0.8s ease-out',
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #ff4a1c 0%, #ff0067 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #342c99 0%, #530296 100%)',
                'gradient-hero': 'linear-gradient(135deg, rgba(255, 74, 28, 0.1) 0%, rgba(255, 0, 103, 0.1) 100%)',
            },
        },
    },
    plugins: [],
}
