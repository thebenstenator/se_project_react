# WTWR (What to Wear?)

## About the Project

WTWR is a weather-based clothing recommendation application that helps users decide what to wear based on current weather conditions. The app fetches real-time weather data and suggests appropriate clothing items for the temperature.

## Features

- Real-time weather data integration using OpenWeatherMap API
- Dynamic clothing recommendations based on temperature ranges (hot, warm, cold)
- Add new clothing items through a modal form
- Preview clothing item details in an item modal
- Responsive design for mobile and desktop viewing
- Clean, intuitive user interface

## Technologies Used

- **React** - Frontend framework
- **CSS** - Styling with BEM methodology
- **OpenWeatherMap API** - Weather data
- **Vite** - Build tool and development server
- **Responsive Design** - Mobile-first approach

## Installation

1. Clone the repository:

```bash
git clone https://github.com/thebenstenator/se_project_react.git
```

2. Navigate to the project directory:

```bash
cd se_project_react
```

3. Install dependencies:

```bash
npm install
```

4. Add your OpenWeatherMap API key in `src/utils/constants.js`:

```javascript
export const APIkey = "your_api_key_here";
```

5. Run the development server:

```bash
npm run dev
```

## How to Use

1. The app displays current weather conditions for your location
2. Browse clothing recommendations based on the current temperature
3. Click on any clothing item to see more details
4. Use the "+ Add clothes" button to add new items to your wardrobe (coming soon)

## Future Enhancements

This project is currently frontend-only, but future updates will include:

- Backend server with Node.js and Express
- Database integration for persistent clothing storage
- User authentication and profiles
- Ability to actually add, edit, and delete clothing items
- User-specific wardrobes
- Weather forecasts for planning ahead

## Deployment

[View Live Project](https://thebenstenator.github.io/se_project_react/)

## Project Status

This is my first React project and is currently in active development. The frontend is functional, with full-stack capabilities planned for future iterations.

## Author

Ben Anderson

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Clothing item images from Practicum by Yandex
