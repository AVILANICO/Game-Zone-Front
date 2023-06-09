let VITE_API = 'http://localhost:8080/'

if (process.env.NODE_ENV==='production') {
    VITE_API = import.meta.env.VITE_API
}

export default VITE_API
