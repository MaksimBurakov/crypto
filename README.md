Overview:
Crypto Trading App is a React-based application that enables users to convert cryptocurrency to fiat currency and vice versa using real-time exchange rates. It provides a dynamic input field that updates the conversion value automatically and allows users to swap between crypto and fiat modes.

Installation & Setup:

1. Install dependencies
   bash
   npm install

2. Create a .env file
   In the root directory, create a .env file and add API keys:

env
VITE_MESSARI_API_KEY=your_api_key_here
VITE_EXCHANGE_RATE_KEY=your_api_key_here

3. Start the application
   bash
   npm run dev

Technology Stack:

React + TypeScript: Provides strong typing and improved code reliability.

React Query: Efficiently handles API calls and caching.

SCSS: Modular styling for cleaner UI design.

Implementation Details:

Why this approach?
✅ React Query ensures automatic caching and refetching for API calls. ✅ TypeScript prevents runtime errors and improves maintainability. ✅ SCSS enhances style structuring with better reuse and modularity.
