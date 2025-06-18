const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");
const totalCount = document.getElementById("total-count");

// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Safely handle localStorage operations
function getLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error writing to localStorage:', error);
        alert('Could not save tasks. Storage might be full.');
        return false;
    }
}

// Sanitize input to prevent XSS
function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.textContent;
}

function loadTasks() {
    listContainer.innerHTML = '<div class="loading">Loading tasks...</div>';
    
    setTimeout(() => {
        const savedTasks = getLocalStorage('tasks');
        listContainer.innerHTML = '';
        savedTasks.forEach(taskData => {
            createTaskElement(taskData.text, taskData.completed);
        });
        updateCounts();
    }, 300); // Simulated loading delay for better UX
}

function saveTasks() {
    const tasks = Array.from(listContainer.children).map(li => ({
        text: li.querySelector('label span').textContent,
        completed: li.querySelector('input[type="checkbox"]').checked
    }));
    return setLocalStorage('tasks', tasks);
}

function updateCounts() {
    try {
        // Only count actual task items, not the empty message
        const taskItems = Array.from(listContainer.children).filter(child => child.tagName.toLowerCase() === 'li');
        const total = taskItems.length;
        const completed = taskItems.filter(li => li.querySelector('input[type="checkbox"]').checked).length;
        const pending = total - completed;

        completedCount.textContent = completed;
        pendingCount.textContent = pending;
        totalCount.textContent = total;
    } catch (error) {
        console.error('Error updating counts:', error);
        // Set default values if counting fails
        completedCount.textContent = '0';
        pendingCount.textContent = '0';
        totalCount.textContent = '0';
    }
}

// Add event delegation for all task interactions
listContainer.addEventListener('click', function(e) {
    const target = e.target;
    const li = target.closest('li');
    
    if (!li) return; // Click was not on a task item
      // Handle delete button clicks
    if (target.classList.contains('delete-btn')) {
        try {
            li.classList.add('fade-out');
            setTimeout(() => {
                li.remove();
                
                // Check if this was the last task
                if (listContainer.children.length === 0) {
                    listContainer.innerHTML = '<p class="empty-message">No tasks yet. Add a new task above!</p>';
                }
                
                updateCounts();
                saveTasks();
            }, 300);
        } catch (error) {
            console.error('Error deleting task:', error);
            // Remove the task immediately if animation fails
            li.remove();
            updateCounts();
            saveTasks();
        }
    }
    
    // Handle edit button clicks
    if (target.classList.contains('edit-btn')) {
        const taskSpan = li.querySelector('label span');
        const oldText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldText;
        input.className = 'edit-input';
        
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== oldText) {
                taskSpan.textContent = sanitizeInput(newText);
                saveTasks();
            } else {
                taskSpan.textContent = oldText;
            }
            input.remove();
            taskSpan.style.display = '';
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });

        taskSpan.style.display = 'none';
        taskSpan.parentNode.insertBefore(input, taskSpan);
        input.focus();
    }
});

function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement("li");
    
    li.innerHTML = `
        <label>
            <input type="checkbox" ${isCompleted ? 'checked' : ''}>
            <span>${sanitizeInput(taskText)}</span>
        </label>
        <div class="button-container">
            <button type="button" class="delete-btn" aria-label="Delete task">Delete</button>
            <button type="button" class="edit-btn" aria-label="Edit task">Edit</button>
        </div>
    `;

    if (isCompleted) {
        li.classList.add("completed");
    }

    // Remove empty message if it exists
    const emptyMessage = listContainer.querySelector('.empty-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }

    listContainer.appendChild(li);
    updateCounts();
}

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        inputBox.classList.add('error');
        setTimeout(() => inputBox.classList.remove('error'), 500);
        return;
    }

    if (task.length > 100) {
        alert("Task is too long. Please keep it under 100 characters.");
        return;
    }

    createTaskElement(task);
    inputBox.value = "";
    saveTasks();
}

// Add event listeners
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});

// Add event delegation for checkboxes
listContainer.addEventListener('change', function(e) {
    const target = e.target;
    if (target.type === 'checkbox') {
        const li = target.closest('li');
        if (li) {
            li.classList.toggle('completed', target.checked);
            updateCounts();
            saveTasks();
        }
    }
});

// Handle errors globally
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    alert('Something went wrong. Please try refreshing the page.');
});
