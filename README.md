# 🚀 TaskFlow - Glassmorphic To-Do & Office Productivity Hub

TaskFlow is a sleek, feature-rich, high-performance web application engineered for personal productivity and daily office task management. Built with vanilla HTML5, CSS3, and ES6 JavaScript, it features a glassmorphic dark theme, star galaxy glowing background, real-time analytics, task priorities, categories, and full `localStorage` persistence.

🌐 **Live Vercel App**: [https://task-flow-theta-pearl.vercel.app/](https://task-flow-theta-pearl.vercel.app/)  
🔗 **GitHub Repository**: [https://github.com/Joy-Mukeshbhai-Patel/taskflow](https://github.com/Joy-Mukeshbhai-Patel/taskflow)

---

## 📸 App Preview & Interface Overview

![TaskFlow App Preview](taskflow_preview.jpg)

---

## 🌟 Complete Feature Inventory (What We Added)

### 1. 🎨 Visual Design & Theme System
- **Dark Glassmorphic UI**: Translucent backdrop-blur cards (`backdrop-filter: blur(20px)`), glossy borders, and glowing button elevations.
- **Glowing Star Galaxy Background**: Animated multi-layered starfield (`@keyframes galaxyTwinkle` & `@keyframes starGlowPulse`) with vibrant indigo, purple, and cyan cosmic nebula glows.
- **Responsive Layout**: Designed for seamless usage across desktop, tablet, and mobile browsers.

### 2. 📊 Real-Time Analytics & Productivity Bar
- **Live Statistics**: Displays real-time counters for **Total**, **Active**, and **Completed** tasks.
- **Dynamic Progress Fill Bar**: Calculates task completion percentage automatically and smoothly animates an illuminated gradient bar.

### 3. 🏷️ Rich Task Metadata & Tagging
- **Priority Badges**:
  - 🔴 **High Priority**: Urgent & time-sensitive items
  - 🟡 **Medium Priority**: Standard daily tasks
  - 🟢 **Low Priority**: Backlog & low-urgency goals
- **Category Tags**:
  - 💼 **Work**: Office tasks, code reviews & meetings
  - 🏠 **Personal**: Home, errands & shopping
  - 💪 **Fitness**: Workouts, health & hydration goals
  - 📚 **Study**: Reading, courses & skill upgrades
  - 💡 **Ideas**: Brainstorming & creative thoughts
- **Due Date Tracker**: Calendar selector with relative date tags ("Today", "Tomorrow", "Due Sep 28") and glowing red **Overdue** alerts for late tasks.

### 4. ⭐ Task Actions & Management (CRUD)
- **Checkmark Completion**: Custom animated checkbox with line-through strikethrough animation & celebratory toast notification.
- **Star / Favorite Toggle**: One-click star button to highlight top priority goals.
- **Full Edit Modal Dialog**: Glassmorphic modal popup allowing you to update task title, priority, category, and due date.
- **Delete & Batch Clear**: Smooth slide-out task deletion and a **Clear Completed** batch action button.

### 5. 🔍 Real-Time Search, Filtering & Sorting
- **Instant Search Bar**: Filter tasks live as you type in the title search input.
- **View Status Tabs**: Quickly switch views between **All**, **Active**, **Completed**, and **Starred** tasks.
- **Category Dropdown Filter**: Filter your list by specific categories (e.g. show only Work or Fitness).
- **Multi-Criterion Sorting**: Sort tasks by **Newest**, **Oldest**, **Due Date**, or **Priority**.

### 6. 💾 Persistence & Feedback System
- **LocalStorage Sync**: All your tasks, completion states, and favorites are automatically saved locally in your browser.
- **Toast Notification Alerts**: Interactive floating toast popups confirming actions (e.g., "Task completed! 🎉", "Task starred!", "Task deleted").

---

## 📖 How to Use TaskFlow (Step-by-Step Guide)

### Step 1: Adding a New Task
1. Type your goal or action item into the main input box (*"What needs to be done?"*).
2. Select a **Priority** level (Low, Medium, or High).
3. Choose a **Category** (Work, Personal, Fitness, Study, Ideas).
4. *(Optional)* Select a **Due Date** using the date picker.
5. Click **`+ Add Task`** or press **Enter**.

### Step 2: Completing & Starring Tasks
- Click the **Checkbox** on the left of any task to mark it complete. Watch your progress bar advance!
- Click the **Star Icon** next to the checkbox to highlight critical goals. Filter starred tasks anytime using the **Starred** tab.

### Step 3: Filtering & Searching
- Type key terms in the **Search Box** to find specific tasks instantly.
- Click view tabs (**All**, **Active**, **Completed**, **Starred**) to organize your view.
- Use the **Category Dropdown** to focus on work or personal goals.
- Use the **Sort Dropdown** to sort by **Due Date** or **Priority**.

### Step 4: Editing or Deleting Tasks
- Click the **Pencil Icon (Edit)** on any task card to open the edit modal dialog. Modify any detail and click **`Save Changes`**.
- Click the **Trash Icon (Delete)** to remove an item, or click **`Clear Completed`** at the bottom right to clean up completed tasks in bulk.

---

## 🛠️ Technology Stack

| Component | Technology Used |
| :--- | :--- |
| **Structure** | HTML5 Semantic Elements & Accessibility (ARIA) |
| **Styling** | Vanilla CSS3 (Custom Properties, Glassmorphism, Keyframe Animations) |
| **Logic** | Modern ES6+ JavaScript (LocalStorage API, Dynamic DOM Engine) |
| **Deployment** | Hosted live on **Vercel** & **GitHub Pages** |

---

## 📂 Project Files

```
├── index.html          # Main HTML structure, layout & modal markup
├── styles.css          # Glassmorphic design system & star galaxy CSS
├── script.js          # CRUD logic, state management, filter/sort engine
├── taskflow_preview.jpg# App visual preview image
└── README.md           # Project documentation
```

---

## 🌐 Live Web App Links

- **Live Production App (Vercel)**: [https://task-flow-theta-pearl.vercel.app/](https://task-flow-theta-pearl.vercel.app/)
- **GitHub Repository**: [https://github.com/Joy-Mukeshbhai-Patel/taskflow](https://github.com/Joy-Mukeshbhai-Patel/taskflow)

---

Developed with ❤️ for high productivity & focus!
