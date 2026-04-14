# 🏆 WeRank – Frontend 
### **1st Prize Winner | NUML Open House 2024**

**WeRank** isn't just another social media clone. It is a high-performance, ranking-centric social ecosystem that moves beyond the primitive "like" button. This repository houses the sophisticated frontend engine—a React-based powerhouse designed to handle complex, collaborative data ranking with a seamless, intuitive UX.

While others build simple CRUD apps, WeRank implements a **dynamic interaction layer** where users don't just consume content—they influence its hierarchy through an intelligent, algorithmically-driven interface.

---

## 🚀 Why WeRank is Superior

In a world of infinite scrolling and mindless "liking," WeRank introduces **Collaborative List Ranking**. The frontend is engineered to handle:
* **Intelligent Feed Curation:** Seamlessly switching between a global "For You" algorithmic feed and a chronological "Following" feed.
* **Dynamic UX:** Utilizing dual drag-and-drop libraries to allow users to visually reorder list items, which translates into complex API weight shifts in real-time.
* **State Persistence & Speed:** A robust Redux architecture that ensures zero-latency feel and persistent sessions, even on hard refreshes.

---

## 🛠 High-Performance Tech Stack

The frontend architecture was built with a focus on **scalability, modularity, and rapid state synchronization.**

* **Core Framework:** `React 18.2.0` – Leveraging concurrent rendering for a snappier UI.
* **Global State Management:** `Redux Toolkit` + `Redux Persist`. We don’t lose state. Ever. 
* **Complex Interactions:** `React Beautiful DnD` & `React DnD`. Implemented for high-precision, low-latency drag-to-rank functionality.
* **UI Architecture:** `Material-UI (MUI 5)` with a custom-engineered `Theme Engine` for a premium aesthetic.
* **Real-time Services:** `Firebase 10.7.0` integration for high-speed authentication and push notification delivery.
* **API Orchestration:** A centralized, domain-driven API layer built with `Axios`, designed to interface with our custom ranking backend.

---

## 🏗️ Clean Architecture

The codebase follows a strict **Separation of Concerns (SoC)**, ensuring that any developer can scale the platform without breaking the core logic.

```text
src/
├── api/        # Domain-driven API modules (Auth, Feed, Social, Ranking)
├── redux/      # Redux Toolkit Slices (Global state & persistence)
├── components/ # Atomic UI components (Modals, Custom Buttons, Loaders)
├── pages/      # High-level route components (The "Views")
├── hooks/      # Custom React logic hooks for reusable business logic
└── utils/      # Theme configurations and helper algorithms
