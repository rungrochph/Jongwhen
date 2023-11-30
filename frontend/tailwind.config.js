/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    // Add more file paths as needed
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        customBlue: '#3498db',
      },
      fontFamily: {
        // Add custom fonts here
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
}
