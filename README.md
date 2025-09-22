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

- `TypeScript`: Chosen for ensuring type safety throughout the codebase, reducing bugs and improving maintainability.

- `Tailwind CSS`: A CSS framework for rapid and consistent styling.

- `Shadcn/UI`: A collection of reusable UI components that are built on top of Tailwind CSS and Radix UI primitives.

- `React Router`: Manages client-side routing, enabling navigation between the Markets and Trending pages without a full page reload.

- `React Query (TanStack Query)`: A powerful data-fetching library that handles server state, caching, and background data synchronization. It's crucial for the performance of this app.

- `Axios`: A promise-based HTTP client used to make API calls to the CoinGecko API.

- `Netlify`: An open-source hosting platform for deployment of web-applications.

The application's architecture is a standard React single-page application (SPA). It follows a component-based structure where the UI is broken down into reusable components. Data fetching is centralized using React Query, which caches API responses and provides a consistent state management layer for server data.

## 🧱 Design Patterns and Rationale
- Adapter Pattern: This pattern is used to decouple the UI components from the raw API response structure.

  - Rationale: The CoinGecko API can return inconsistent or deeply nested data, especially across different endpoints (e.g., /trending vs. /markets). Adapters transform this raw data into a standardized format, ensuring that UI components always receive the data they expect. If the API changes, only the adapter functions need to be updated, leaving the rest of the application's logic untouched.

- Container/Presentational Pattern: The Markets and Trending pages act as Containers by handling data fetching and business logic (e.g., sorting, filtering, error handling), while components like HighlightCard and CoinDetailDialog are Presentational, focusing solely on rendering the UI based on the props they receive.

  - Rationale: This separation of concerns improves code organization and reusability. The UI components are simpler, and the data-fetching logic is isolated, making it easier to test and maintain.

## 📝 Assumptions, Limitations, and Future Improvements

- `Assumptions`:

  - The CoinGecko API remains stable and accessible.

- `Limitations`:

  - The search functionality is basic and relies on CoinGecko's ids parameter, which requires a precise coin ID. It does not support fuzzy or name-based searching on the API side.

  - The market data table is paginated, it only shows one page of results (20 coins) at a time and lacks an advanced infinite scroll feature.

  - The current sorting logic is client-side, which is inefficient for large datasets.

- `Future Improvements`:

  - **Server-side Sorting/Pagination**: Implement server-side sorting and pagination for the market table to handle larger datasets more efficiently.

  - **Enhanced Search**: Integrate a more robust search endpoint or a server-side search mechanism for a better user experience.

  - **Time-Series Charts**: Add interactive charts (e.g., using a library like Chart.js or Recharts) to display historical price data for each coin.

  - **Real-time Updates**: Use WebSockets or a similar technology to get real-time price updates instead of relying on staleTime and refetching.