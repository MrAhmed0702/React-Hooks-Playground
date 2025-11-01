# 🚀 React Hooks Playground — Debounce, Focus Timer, and GitHub User Search

This project is a **React learning sandbox** where I explored building custom hooks and applying modern React patterns to solve real-world UI/UX problems.

It includes:

* A **focus timer** that tracks how long an input stays focused
* A **debounced text reversal** example
* A **GitHub user search** powered by the GitHub API
* Built-in **request cancellation** with `AbortController`
* **Persistence** using `localStorage`

---

## 🧠 What I Learned

This project started as a small experiment, but it ended up teaching me a lot about **React hooks composition, side effects, and request management**.

Here’s a summary of my key takeaways:

### 1. **Debouncing with Custom Hooks**

Instead of re-implementing debounce logic inside components, I created a reusable hook `useDebounce`.
It delays value updates by a specified amount of time, preventing excessive re-renders or API calls.

```js
const value = useDebounce(input, 1000);
```

➡️ *Lesson:* Debouncing should happen **at the data level**, not in UI logic.

---

### 2. **Tracking Focus Time**

`useFocusTimer` uses refs and state to track how long an input field stays focused.
When the input blurs, elapsed time persists, and the timer resets when re-focused.

➡️ *Lesson:* Refs are perfect for tracking **mutable state across renders** that shouldn’t trigger re-renders.

---

### 3. **Request Cancellation with AbortController**

I used the **AbortController API** to cancel stale API requests.
If a user types quickly, earlier requests are aborted before they complete — avoiding race conditions.

```js
if (controller.current) controller.current.abort();
controller.current = new AbortController();
```

➡️ *Lesson:* Always cancel in-flight requests in React effects when working with async code.

---

### 4. **LocalStorage for UX Persistence**

The last successfully fetched GitHub user is stored locally.
On reload, the UI shows the previous user instantly — a small but meaningful UX improvement.

➡️ *Lesson:* Small persistence features often make a big difference in perceived polish.

---

### 5. **Separation of Concerns with Custom Hooks**

I moved all GitHub API logic into a custom hook `useGithubUser`, which handles:

* Debouncing
* Fetching
* Loading and error states
* Request cancellation
* Local persistence

Now the main component, `App`, is almost purely presentational.

➡️ *Lesson:* Hooks are not just utilities — they’re a way to **encapsulate business logic** cleanly.

---

## 🧩 Architecture Overview

```
src/
├── hooks/
│   ├── UseDebounce.jsx        # Debounce hook
│   ├── UseFocusTimer.jsx      # Focus timer hook
│   ├── UseGithubUser.jsx      # GitHub user fetching + AbortController
├── Services/
│   └── GithubApi.js          # API layer (fetch abstraction)
├── App.jsx                    # Main UI component
└── main.jsx
```

---

## ⚙️ How It Works (Diagram)

```
User Types → useDebounce → useGithubUser → API (AbortController)
                     ↓
              Cancels previous request
                     ↓
          Fetch completes → UI updates → Stored in localStorage
```

---

## 💡 Example Features in Action

### 🔤 Character Input

* Tracks character count
* Displays reversed + debounced value
* Tracks how long input was focused

### 🧑‍💻 GitHub User Search

* Debounced API calls to `https://api.github.com/users/{username}`
* Shows avatar, name, bio, and followers
* Cancels old requests if typing continues
* Remembers the last searched user even after reload

---

## 🧰 Tech Stack

* **React 18+**
* **Tailwind CSS** for styling
* **GitHub REST API**
* **AbortController**, **useRef**, and **Custom Hooks**

---

## 🧪 Running Locally

```bash
git clone https://github.com/yourusername/react-hooks-playground.git
cd react-hooks-playground
npm install
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** (if using Vite) or the port shown in your terminal.

---

## 🧭 Future Improvements

* Add TypeScript for better type safety
* Create unit tests for each custom hook
* Handle GitHub API rate limiting gracefully
* Add dark/light mode toggle
* Migrate API logic to React Query for caching and retry control

---

## ✨ Final Thoughts

This project reminded me that **clarity is power** — small, well-scoped hooks can make codebases far more readable and maintainable.
It’s easy to throw everything into one component, but separating logic with intention leads to better systems and easier debugging.

> “Simple is not easy — it’s the result of iteration, not the absence of complexity.”
> — *A lesson learned the hard way.*
