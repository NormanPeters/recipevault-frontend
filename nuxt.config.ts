// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],
    devtools: {enabled: true},
    compatibilityDate: '2024-04-03',
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
})