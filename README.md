# Blog Website

## Description
This is a React-based blog website that fetches country-related data from the [REST Countries API](https://restcountries.com/v3.1/all) and displays information about various countries. Users can like blog posts, add comments with their names, and view an interactive Google Map.

## Features
- Fetch country data from REST Countries API
- Display country details including name, region, population, and borders
- Interactive Google Map for each country
- Like and comment functionality on blog posts
- Redux Toolkit for state management
- Responsive UI using Tailwind CSS

## Technologies Used
- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **API:** REST Countries API
- **Maps:** Google Maps API
- **Icons:** React Icons

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Keshab1113/Bloging.git
cd Bloging
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment Variables
Create a `.env` file in the root directory and add the following:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Start the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

## Project Structure
```
📂 src
 ┣ 📂 components
 ┃ ┣ 📜 BlogPost.jsx   # Blog Post Component
 ┃ ┣ 📜 MapContainer.jsx  # Google Maps Component
 ┣ 📂 redux
 ┃ ┣ 📜 blogSlice.js   # Redux Slice for Blogs
 ┣ 📜 App.jsx          # Main App Component
 ┣ 📜 main.jsx         # Entry Point
```


## License
This project is licensed under the MIT License.
