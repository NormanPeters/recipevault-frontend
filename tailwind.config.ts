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
            fontSize: {
                body: '12px',  // Default body font size
            },
            backgroundColor: {
                body: 'whitesmoke',  // Default body background color
            },
            color: {
                primary: '#3f3f46',  // Default font color
            },
            colors: {
                primary: {
                    DEFAULT: '#326917',
                },
                btnPrimary: {
                    DEFAULT: '#326917',
                    hover: '#f45e45',
                }
            },
        },
    },
    plugins: [
        function ({ addBase, theme }) {
            addBase({
                'body': {
                    fontFamily: theme('fontFamily.montserrat'),
                    fontSize: theme('fontSize.body'),
                    backgroundColor: theme('backgroundColor.body'),
                    color: theme('color.primary'),
                },
            });
        }
    ],
};