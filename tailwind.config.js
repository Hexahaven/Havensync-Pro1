// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Your app's source files
    './node_modules/nativewind/dist/**/*.js',  // Add this to include NativeWind's classes
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('nativewind'),
  ],
}
