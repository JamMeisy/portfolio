/** @type {import('tailwindcss').Config} */
module.exports = {
    "content": [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    "theme": {
        "extend": {
            "colors": {
                "gray": {
                    "100": "#181816",
                    "200": "#161513"
                },
                "aliceblue": "#e7e8ef",
                "silver": {
                    "100": "#b6b8bf",
                    "200": "rgba(182, 184, 191, 0.3)"
                },
                "goldenrod": "#e5ba49",
                "antiquewhite": "#f4ebd5"
            },
            "fontFamily": {
                "plus-jakarta-sans": "Plus Jakarta Sans"
            }
        }
    },
    "corePlugins": {
        "preflight": false
    }
}