/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            fontFamily: {
                syncopate: ['Syncopate', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#80E102',  // Original color
                    hover: '#A7F342',    // Lighter version for hover effect
                },
            },
        },
    },
};