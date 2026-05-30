# SmartShelf – Intelligent Inventory Monitoring System

SmartShelf is a modern Single Page Application (SPA) designed to solve a critical retail business challenge: preventing lost sales caused by out-of-stock products. Built with React and TypeScript, this application provides a real-time management dashboard to track merchandise, manage stock dynamically, and handle critical inventory alerts efficiently.

---

##  Features List

*   **Business Dashboard (Home):** A centralized control panel displaying real-time Key Performance Indicators (KPIs): *Total Items*, *Low Stock Alerts*, and *Out of Stock* products. Clickable stat cards provide direct navigation to critical sections.
*   **Hybrid Live Search:** An instantaneous search tool deployed on both the Home and the Inventory views. It resolves products smoothly by tracking both partial **product names** and exact numerical **Ref IDs**.
*   **Dynamic Cross-Filtering:** An advanced management layout on the Inventory grid that extracts raw API fields using native JavaScript `Set` logic to build unique category selectors, allowing users to cross-reference search queries with precise business categories.
*   **Replenishment Alert Monitor:** A dedicated section that automatically filters and displays items that have hit or fallen below the safety threshold (`minLimit: 5`), empowering managers to restore merchandise efficiently.
*   **Resilient Stock Management:** Interactive triggers to simulate fast sales (`Sell Unit -1`) with automated visual locking when stock hits zero (`Out of Stock`), paired with rapid replenishment triggers (`Restock +20`) in the Alerts monitor.
*   **Data Persistence:** Full integration with **LocalStorage** to write global changes to the browser's hard drive, ensuring that operational logs survive hard page refreshes (F5) or tab closures.
*   **Advanced UX Feedback:** Visual feedback mechanisms including a custom CSS-animated **Loading Spinner** for network operations and a dedicated `ErrorMessage` fallback component featuring an on-demand "Try Again" re-fetch trigger.
*   **Dynamic Document Context:** Implementation of a custom hook (`useDocumentTitle`) to abstract browser DOM side-effects and seamlessly shift tab titles based on the user's active page.

---

##  Technologies Used

*   **React 18** (Vite build toolchain for fast refresh rates and production bundling)
*   **TypeScript** (Strict type enforcement using dedicated structural interfaces, completely bypassing the `any` type keyword)
*   **React Router Dom** (Single Page Application routing using dynamic parameter matching with `:id`, `useParams`, and `useNavigate` anchors).
*   **Context API** (Centralized state management layout acting as the single source of truth for global synchronization).
*   **React Hook Form** (Lightweight validated inputs on dashboard controllers with real-time error reporting)
*   **CSS3** (Isolated style sheet modularization mapped per view for clean layout separations)
*   **DummyJSON API** (Asynchronous third-party service data injection restricted to a subset of 100 entries via `async/await` fetch).

---

##  Setup Instructions

Follow these chronological commands in your local machine terminal to launch the development ecosystem:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed (Version 18 or above recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/SotoM80/smartshelf.git
cd smartshelf
```

### 3. Install Package Dependencies
Download and map all structural libraries configured in the package manifesto (including React Router and React Hook Form):
```bash
npm install
```

### 4. Boot Up the Development Server
Fire up the local Vite architecture:
```bash
npm run dev
```
Open your preferred browser and navigate to the address displayed in the terminal output (commonly `http://localhost:5173`).

### 5. Build for Production Optimization (Optional)
To compile a lightweight, highly compressed bundle ready for deployment servers:
```bash
npm run build
```

---

##  Source Code Structure

The repository architecture follows strict modular guidelines for scalability:
*   `src/components/`: Reusable interface building blocks (e.g., `ErrorMessage.tsx`).
*   `src/context/`: Core business logic engine (`InventoryContext.tsx`) distributing global state indicators.
*   `src/css/`: Mapped custom stylesheets.
*   `src/hooks/`: Abstracted custom behavior layer (`useDocumentTitle.ts`).
*   `src/pages/`: Main user perspectives (`Home`, `Inventory`, `Alerts`, `ProductDetail`).
*   `src/types/`: Structured TypeScript blueprint contracts (`index.ts`).
*   `.gitignore`: Strict exclusion list blocking local system cache and the heavy `node_modules` directory from committing.

```
