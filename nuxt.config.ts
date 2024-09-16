// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&family=Syncopate:wght@400;700&display=swap',
                },
            ],
        },
    },
})
