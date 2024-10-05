// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'

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
    hooks: {
        'pages:extend'(pages) {
            function setMiddleware(pages: NuxtPage[]) {
                for (const page of pages) {
                    // Example condition: apply middleware to all routes except `/login`
                    if (page.path !== '/login') {
                        page.meta ||= {};
                        page.meta.middleware = ['auth'];
                    }
                    if (page.children) {
                        setMiddleware(page.children); // Recursively set middleware for child routes
                    }
                }
            }

            // Call the function to set middleware on all pages
            setMiddleware(pages);
        },
    },
})