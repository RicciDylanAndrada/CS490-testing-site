module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./components/images/free.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
}