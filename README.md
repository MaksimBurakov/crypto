🚀 Trading Application

📌 Project Overview
This is a cryptocurrency trading application built using React, TypeScript, Vite, Zustand, and React Query. It enables users to view a list of cryptocurrency assets, sort them by name or price, and execute buy or sell transactions. Trading functionality is available only after logging in through a simulated authentication system for demonstration purposes.

🚀 Getting Started
🛠 Installation
Clone the repository:

```sh
git clone https://github.com/your-repo/Crypto-trading-app.git
cd crypto
```
Install dependencies:

```sh
npm install
```
⚙ Configuration
Create a .env file in the root directory based on .env.example:


🚀 Running the Development Server
Start the local development server using Vite:

```sh
npm run dev
```
This will launch the application and open it in your default browser.

🏗 Building for Production
To generate an optimized production build using Vite, run:

```sh
npm run build
```
The compiled files will be located in the dist/ directory.

🔧 Key Technologies
✔ React – Component-based UI framework ✔ TypeScript – Static type-checking for better development experience ✔ Vite – Fast build tool with hot-reload capabilities ✔ Zustand – Minimalistic state management solution ✔ React Query – Efficient data fetching with caching and background updates ✔ SCSS – Structured styling with variables and mixins

📂 Folder Structure
/assets      - Images for application  
/components  - Reusable UI components  
/routes      - Page routing management  
/hooks       - Custom React hooks  
/types       - TypeScript interfaces for structured data  
/pages       - Page components such as Home and Trade  
/store       - Global state management using Zustand  
/api         - Methods for fetching data  
App.tsx      - Main application entry point  
main.tsx     - Initial React setup  


📌 Design Decisions & Implementation Choices
✔ React + TypeScript → Improves scalability and reduces bugs ✔ Vite → Provides ultra-fast development and optimized production builds ✔ Zustand → Simple state management for efficient app performance ✔ React Query → Handles API caching, retries, and data synchronization ✔ SCSS & CSS Modules → Scoped styles with maintainable structure
