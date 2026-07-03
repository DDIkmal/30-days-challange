// DAY 2: TO-DO LIST
// Goal: Add task, Mark as done, delete task

// 1. Add element input, button "Add" and container list from HTML
const input = document.querySelector('input')
const Add = document.querySelector('button');
const container = document.querySelector('.container');

// 2. Blank array to store tasks
let tasks = [];
// every task is an object, example: { text: "Learn JS", done: false }

// 3. Create function render() that:
//    - Empties the container list (innerHTML = '')
//    - Loops through the tasks array (forEach/map)
//    - For each task, creates a new <li> element and inserts it into the container
//    - Adds a "Delete" button and a checkbox for every <li>
function render(){
    // Empty the container first
    container.innerHTML = '';
    
    // Loop through tasks and create <li> for each task
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Add checkbox for each task
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // Set the checkbox state based on task.done
        checkbox.checked = task.done;
        // Add index data attribute to the checkbox to identify which task to toggle
        checkbox.dataset.index = index;

        li.prepend(checkbox);
        // Add event listener to checkbox to toggle task.donea 
        checkbox.addEventListener('change', (e) => {
            task.done = !task.done;
            render();
        })
        if (task.done) li.style.textDecoration = 'line-through';
        li.style.textAlign = 'left'
        

        // Add delete button
        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.dataset.index = index; // add index data attribute to the delete button to identify which task to delete
        li.appendChild(del);
        // Add event listener to delete button
        del.addEventListener('click', (e) => {
            
            tasks.splice(index, 1);
            render();
            
        });
        

        // Append the <li> to the container
        container.appendChild(li);
    });
};

// 4. Add event listener to the "Add" button
Add.addEventListener('click', (e) => {
    e.preventDefault();// Prevent form submission

    const text = input.value;

    // Check if the input is not empty
    if (text) {
        // Add the new task to the tasks array
        tasks.push({ text, done: false });
        
        input.value = '';
        render();
    }
});

//