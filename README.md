# CineScope 🎬

A modern Angular-based web application that lets you explore movies and TV shows using The Movie Database (TMDB) API.

## 📌 Overview
CineScope allows you to:
- Browse popular movies and TV shows.
- Navigate by genre categories.
- View detailed information about a movie or TV show.
- Display images (posters/backdrops) using TMDB's image URLs.
- Enjoy a responsive and user-friendly UI.

## 🧰 Technologies
- Angular (up to v20.3.2)
- HTML, CSS (responsive design)
- TMDB API integration
- CoreUI Carousel components for displaying categorized content

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/kostasbel96/CineScope.git
cd CineScope
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure the API
- Create an account on [The Movie Database (TMDB)](https://www.themoviedb.org/).
- Obtain your API key.
- Add it to your environment configuration (e.g., `environment.ts`) or as an environment variable.

### 4. Run Locally
```bash
ng serve
```
Then open [http://localhost:4200](http://localhost:4200) in your browser.

## 🛠️ Build for Production
```bash
ng build
```
The compiled files will be generated in the `dist/` folder.

## 📁 Project Structure
- `src/app` – main Angular modules and components  
- `src/environments` – environment configurations (development/production)  
- `assets/` – static content (images, logos, etc.)  
- `tsconfig.json`, `angular.json`, `package.json` – project configuration files  


