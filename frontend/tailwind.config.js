/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6366F1', // Figma Purple
                secondary: '#10B981', // Figma Green (Active/Accent)
                background: '#F9FAFB', // Main BG
                surface: '#FFFFFF', // White
                text: {
                    primary: '#1F2937', // Gray-800
                    secondary: '#6B7280', // Gray-500
                    tertiary: '#9CA3AF' // Gray-400
                },
                border: '#E5E7EB',
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#EF4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
