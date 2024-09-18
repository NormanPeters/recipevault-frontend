// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Syncopate:wght@400;700&display=swap',
                },
            ],
        },
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    pinia: {
        autoImports: [
            'defineStore',
        ],
    },
})