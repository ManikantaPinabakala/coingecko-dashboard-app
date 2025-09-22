# CoinGecko Clone

This project, `CoinGecko Clone`, is a `React application` that provides a real-time view of cryptocurrency market data and trends. It is built to be a fast, responsive, and data-rich tool for tracking the crypto market.

## 🔑 Project Setup & API Key Instructions

To get this project up and running on your local machine, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/ManikantaPinabakala/coingecko-dashboard-app.git
cd coingecko-dashboard-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Setup the API key**:

    - You'll need a CoinGecko API key to fetch cryptocurrency data.

    - Go to the <a href="https://www.coingecko.com/en/api" target="_blank">CoinGecko API</a> page and sign up for a free API key.

    - In the root of the project directory, create a new file named `.env`.

    - Add your API key to the `.env` file. You can check the format of adding API key in the `.env.example` file of this repository.

4. **Run the App**:

```bash
npm run dev
```

5. **View the App**:

    - You can hit `o + enter` or visit `http://localhost:5173` to view the app on you browser.

## 🛠️ Tech Stack and Architecture

- `Vite + React`: The core library for building the UI. Vite provides a quick development server and optimized builds.

- `TypeScript`: Ensures type safety throughout the codebase, reducing bugs and improving maintainability.

- `Tailwind CSS & Shadcn/UI`: Used for reusable components, rapid and consistent styling.

- `React Router`: Manages client-side routing, enabling navigation between the Markets and Trending pages without a full page reload.

- `React Query`: Handles all server state management, including caching and data synchronization, making the app feel fast and responsive.

- `Axios`: A promise-based HTTP client for making API calls.

The application uses a component-based architecture with React Router for navigation. Data fetching is centrally managed by React Query, which decouples data from the UI and improves performance.

## 💡 Design Patterns

**Adapter Pattern**: We use this pattern to transform raw data from the CoinGecko API into a standardized format before it reaches the UI. This decouples the frontend from the backend and makes the app more resilient to API changes.

**Container/Presentational Pattern**: This separates logic from UI. Components like Markets and Trending handle data fetching and state (Containers), while components like HighlightCard and AppLoader simply display data (Presentational).

## 📝 Limitations and Improvements

- `Assumptions`:

  - The CoinGecko API remains stable and accessible.

- `Limitations`:

  - Search functionality is basic, relying on exact coin IDs.

  - The market table is paginated and lacks advanced features like infinite scrolling.

  - The current sorting logic is client-side, which is inefficient for large datasets.

- `Future Improvements`:

  - Implement server-side sorting and pagination for better performance with large datasets.

  - Enhance search with fuzzy matching.

  - Add time-series charts to display historical price data.

  - Implement real-time price updates using WebSockets.