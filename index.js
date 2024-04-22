const form = document.getElementById('form')
const input = document.getElementById('input')
const tasks = document.getElementById('tasks')
const tasksJSON = JSON.parse(localStorage.getItem('todos'))

function add_task(task)
{
  let taskText = input.value
  
  if(task)
  {
    taskText = task.text
  }

  if(taskText)
  {
    const taskElement = document.createElement('li');
    
    if(task && task.completed)
    {
      taskElement.classList.add('completed')
    }

    taskElement.innerText = taskText
    
    taskElement.addEventListener('click', () =>
    {
      taskElement.classList.toggle('completed')
      update_list()
    })
    
    taskElement.addEventListener('contextmenu', (event) =>
    {
      event.preventDefault()
      taskElement.remove()
      update_list()
    })

    tasks.appendChild(taskElement)

    input.value = ''

    update_list()
  }
}

function update_list()
{
  taskElement = document.querySelectorAll('li')

  const tasks = []

  taskElement.forEach(taskElement =>
  {
    tasks.push({
        text: taskElement.innerText,
        completed: taskElement.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


if (tasksJSON)
{
  tasksJSON.forEach(task => add_task(task))
}

form.addEventListener('submit', (event) =>
{
    event.preventDefault()
    add_task()
})


