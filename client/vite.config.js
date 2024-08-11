// vite.config.js
export default {
    build: {
        rollupOptions: {
            input: {
                app: 'public/index.html',
            },
        },
    },
    server: {
        open: 'public/index.html',
    },
}