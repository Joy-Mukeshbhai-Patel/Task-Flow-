/* ==========================================================================
   TaskFlow - Professional JavaScript Application Logic (Clean Text UI)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Local Storage Key
  const STORAGE_KEY = 'taskflow_app_tasks';

  // Application State
  let tasks = [];
  let currentFilter = 'all';
  let currentCategory = 'all';
  let currentSort = 'created-desc';
  let searchQuery = '';

  // DOM Elements Selection
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const prioritySelect = document.getElementById('priority-select');
  const categorySelect = document.getElementById('category-select');
  const dueDateInput = document.getElementById('due-date-input');

  const taskList = document.getElementById('task-list');
  const emptyState = document.getElementById('empty-state');
  const emptyStateText = document.getElementById('empty-state-text');

  const searchInput = document.getElementById('search-input');
  const filterTabs = document.querySelectorAll('.tab-btn');
  const filterCategorySelect = document.getElementById('filter-category');
  const sortSelect = document.getElementById('sort-select');
  const btnClearCompleted = document.getElementById('btn-clear-completed');

  const statTotal = document.getElementById('stat-total');
  const statActive = document.getElementById('stat-active');
  const statCompleted = document.getElementById('stat-completed');
  const progressFill = document.getElementById('progress-fill');

  const currentDayEl = document.getElementById('current-day');
  const currentDateEl = document.getElementById('current-date');

  // Edit Modal Elements
  const editModal = document.getElementById('edit-modal');
  const editForm = document.getElementById('edit-form');
  const editTaskId = document.getElementById('edit-task-id');
  const editTitle = document.getElementById('edit-title');
  const editPriority = document.getElementById('edit-priority');
  const editCategory = document.getElementById('edit-category');
  const editDueDate = document.getElementById('edit-due-date');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');

  // Welcome Modal Elements
  const welcomeModal = document.getElementById('welcome-modal');
  const btnCloseWelcome = document.getElementById('btn-close-welcome');
  const btnStartWelcome = document.getElementById('btn-start-welcome');

  const toastContainer = document.getElementById('toast-container');

  // Initial Professional Sample Tasks
  const defaultSampleTasks = [
    {
      id: 'sample-1',
      title: 'Finalize quarterly product roadmap presentation',
      priority: 'high',
      category: 'work',
      dueDate: getFutureDate(1),
      completed: false,
      favorite: true,
      createdAt: Date.now() - 3600000 * 5
    },
    {
      id: 'sample-2',
      title: 'Daily 30-minute cardio & core workout session',
      priority: 'medium',
      category: 'fitness',
      dueDate: getFutureDate(0),
      completed: true,
      favorite: false,
      createdAt: Date.now() - 3600000 * 24
    },
    {
      id: 'sample-3',
      title: 'Study JavaScript ES6+ state management patterns',
      priority: 'medium',
      category: 'study',
      dueDate: getFutureDate(2),
      completed: false,
      favorite: false,
      createdAt: Date.now() - 3600000 * 12
    },
    {
      id: 'sample-4',
      title: 'Brainstorm design concepts for modern UI library',
      priority: 'low',
      category: 'ideas',
      dueDate: '',
      completed: false,
      favorite: true,
      createdAt: Date.now() - 3600000 * 48
    }
  ];

  // Initialize Application
  init();

  function init() {
    updateDateDisplay();
    loadTasks();
    setupEventListeners();
    render();

    // Show huge welcome greeting modal on page launch
    setTimeout(() => {
      openWelcomeModal();
    }, 300);
  }

  function openWelcomeModal() {
    if (welcomeModal) welcomeModal.classList.add('active');
  }

  function closeWelcomeModal() {
    if (welcomeModal) welcomeModal.classList.remove('active');
  }

  // Update Header Date Display
  function updateDateDisplay() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    if (currentDayEl) currentDayEl.textContent = days[now.getDay()];
    if (currentDateEl) currentDateEl.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  }

  // Load Tasks from LocalStorage
  function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        tasks = JSON.parse(stored);
      } catch (e) {
        tasks = [...defaultSampleTasks];
      }
    } else {
      tasks = [...defaultSampleTasks];
      saveTasks();
    }
  }

  // Save Tasks to LocalStorage
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // Helper for generating relative ISO dates
  function getFutureDate(daysAhead) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Add Task Form Submit
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskInput.value.trim();
        if (!title) return;

        const newTask = {
          id: 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          title: title,
          priority: prioritySelect.value,
          category: categorySelect.value,
          dueDate: dueDateInput.value,
          completed: false,
          favorite: false,
          createdAt: Date.now()
        };

        tasks.unshift(newTask);
        saveTasks();
        render();

        taskInput.value = '';
        dueDateInput.value = '';
        showToast('Task added successfully!', 'success');
      });
    }

    // Live Search Input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        render();
      });
    }

    // View Filter Tabs (All, Active, Completed, Starred)
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.tab;
        render();
      });
    });

    // Category Filter Dropdown
    if (filterCategorySelect) {
      filterCategorySelect.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        render();
      });
    }

    // Sort Dropdown
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        render();
      });
    }

    // Clear Completed Button
    if (btnClearCompleted) {
      btnClearCompleted.addEventListener('click', () => {
        const completedCount = tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
          showToast('No completed tasks to clear', 'info');
          return;
        }

        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        render();
        showToast(`Cleared ${completedCount} completed task(s)`, 'success');
      });
    }

    // Edit Form Modal Submit & Close
    if (editForm) {
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = editTaskId.value;
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.title = editTitle.value.trim();
          task.priority = editPriority.value;
          task.category = editCategory.value;
          task.dueDate = editDueDate.value;
          saveTasks();
          render();
          closeEditModal();
          showToast('Task updated successfully!', 'success');
        }
      });
    }

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeEditModal);
    if (btnCancelModal) btnCancelModal.addEventListener('click', closeEditModal);
    if (editModal) {
      editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
      });
    }

    // Welcome Modal Event Listeners
    if (btnCloseWelcome) btnCloseWelcome.addEventListener('click', closeWelcomeModal);
    if (btnStartWelcome) btnStartWelcome.addEventListener('click', () => {
      closeWelcomeModal();
      showToast('Welcome! Let\'s get productive 🚀', 'success');
    });
    if (welcomeModal) {
      welcomeModal.addEventListener('click', (e) => {
        if (e.target === welcomeModal) closeWelcomeModal();
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (editModal && editModal.classList.contains('active')) closeEditModal();
        if (welcomeModal && welcomeModal.classList.contains('active')) closeWelcomeModal();
      }
    });
  }

  // Filter & Sort Tasks Logic
  function getFilteredAndSortedTasks() {
    return tasks.filter(task => {
      // Status Filter
      if (currentFilter === 'active' && task.completed) return false;
      if (currentFilter === 'completed' && !task.completed) return false;
      if (currentFilter === 'starred' && !task.favorite) return false;

      // Category Filter
      if (currentCategory !== 'all' && task.category !== currentCategory) return false;

      // Search Query
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery)) return false;

      return true;
    }).sort((a, b) => {
      // Sorting Logic
      if (currentSort === 'created-desc') return b.createdAt - a.createdAt;
      if (currentSort === 'created-asc') return a.createdAt - b.createdAt;
      
      if (currentSort === 'due-date') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      if (currentSort === 'priority') {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }

      return 0;
    });
  }

  // Main Render Function
  function render() {
    updateAnalytics();

    const filteredTasks = getFilteredAndSortedTasks();

    if (filteredTasks.length === 0) {
      taskList.innerHTML = '';
      emptyState.style.display = 'flex';
      
      if (searchQuery) {
        emptyStateText.textContent = `No tasks match your search "${searchQuery}".`;
      } else if (currentFilter === 'completed') {
        emptyStateText.textContent = 'You haven\'t completed any tasks yet. Keep pushing!';
      } else if (currentFilter === 'starred') {
        emptyStateText.textContent = 'No starred tasks found. Star tasks to highlight your top priorities.';
      } else {
        emptyStateText.textContent = 'Your task list is empty! Enjoy your day or add a new goal above.';
      }

      return;
    }

    emptyState.style.display = 'none';
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
      const taskCard = createTaskElement(task);
      taskList.appendChild(taskCard);
    });
  }

  // Create Task DOM Node
  function createTaskElement(task) {
    const card = document.createElement('div');
    card.className = `task-card ${task.completed ? 'completed' : ''}`;
    card.dataset.id = task.id;

    const categoryNames = {
      work: 'Work',
      personal: 'Personal',
      fitness: 'Fitness',
      study: 'Study',
      ideas: 'Ideas'
    };

    // Format Due Date
    let dueDateFormatted = '';
    let isOverdue = false;
    if (task.dueDate) {
      const todayStr = new Date().toISOString().split('T')[0];
      if (task.dueDate === todayStr) {
        dueDateFormatted = 'Today';
      } else {
        const d = new Date(task.dueDate + 'T00:00:00');
        dueDateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (task.dueDate < todayStr && !task.completed) {
          isOverdue = true;
        }
      }
    }

    card.innerHTML = `
      <label class="custom-checkbox" title="Toggle Complete">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="checkmark"></span>
      </label>

      <button class="btn-star ${task.favorite ? 'active' : ''}" title="Star Task">★</button>

      <div class="task-content">
        <div class="task-header-row">
          <span class="task-title">${escapeHTML(task.title)}</span>
          <div class="task-tags">
            <span class="tag-badge priority-${task.priority}">${task.priority}</span>
            <span class="category-pill">${categoryNames[task.category] || task.category}</span>
          </div>
        </div>
        
        ${task.dueDate ? `
          <div class="task-meta">
            <span class="due-date ${isOverdue ? 'overdue' : ''}">
              ${isOverdue ? 'Overdue: ' : 'Due '}${dueDateFormatted}
            </span>
          </div>
        ` : ''}
      </div>

      <div class="task-actions">
        <button class="action-btn edit" title="Edit Task">Edit</button>
        <button class="action-btn delete" title="Delete Task">Delete</button>
      </div>
    `;

    // Checkbox Event
    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      render();
      if (task.completed) {
        showToast('Task completed!', 'success');
      }
    });

    // Star/Favorite Event
    const starBtn = card.querySelector('.btn-star');
    starBtn.addEventListener('click', () => {
      task.favorite = !task.favorite;
      saveTasks();
      render();
      showToast(task.favorite ? 'Task starred!' : 'Task unstarred', 'info');
    });

    // Edit Event
    const editBtn = card.querySelector('.action-btn.edit');
    editBtn.addEventListener('click', () => openEditModal(task));

    // Delete Event
    const deleteBtn = card.querySelector('.action-btn.delete');
    deleteBtn.addEventListener('click', () => {
      card.classList.add('deleting');
      setTimeout(() => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        render();
        showToast('Task deleted', 'danger');
      }, 250);
    });

    return card;
  }

  // Open Edit Modal
  function openEditModal(task) {
    if (!editModal) return;
    editTaskId.value = task.id;
    editTitle.value = task.title;
    editPriority.value = task.priority;
    editCategory.value = task.category;
    editDueDate.value = task.dueDate || '';

    editModal.classList.add('active');
    editTitle.focus();
  }

  // Close Edit Modal
  function closeEditModal() {
    if (editModal) editModal.classList.remove('active');
  }

  // Update Progress & Statistics Analytics
  function updateAnalytics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    if (statTotal) statTotal.textContent = total;
    if (statActive) statActive.textContent = active;
    if (statCompleted) statCompleted.textContent = completed;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    if (progressFill) progressFill.style.width = `${percentage}%`;
  }

  // Toast Notification Helper (Text Only)
  function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    toast.innerHTML = `<span>${escapeHTML(message)}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // HTML XSS Escaper Helper
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});
