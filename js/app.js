const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const messageCreate = document.getElementById('message-create')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')


// ? check

let todos = JSON.parse(localStorage.getItem(`list`))?JSON.parse(localStorage.getItem(`list`)):[];
console.log(todos);
//? get todos

if(todos.length ){
    showTodos
}
//! setTodos to localStorage

function setTodos(){
    localStorage.setItem('list', JSON.stringify(todos))
}

//! time 

function getTime (){
    const now = new Date()
    const date = now.getDate()<10 ? "0" +now.getDate() : now.getDate()
    const month = now.getMonth()<10 ?`0` + (now.getMonth()+1):now.getMonth
    const year = now.getFullYear()

    const hour = now.getHours()<10 ? "0" + now.getHours() : now.getHours()
    const minute = now.getMinutes()<10 ? "0" + now.getMinutes() : now.getMinutes()
    const secund = now.getSeconds()<10 ? "0" + now.getSeconds() : now.getSeconds()
    const monhts = [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`
    ]
    const month_title = now.getMonth()
    fullDay.textContent = `${date} ${monhts[month_title]},${year}`
    hourEl.textContent= hour
    minuteEl.textContent = minute
    secondEl.textContent = secund
    return `${hour}:${minute}, ${date}.${month}.${year}`
}
setInterval(getTime,1000)

//! end of time


// ! show todos 

function showTodos (){
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ""
    todos.forEach((item,i) => {
        listGroupTodo.innerHTML+=`
        <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between">
          <span class="listText">${item.text}</span>
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <input type="checkbox" name="checkbox" id="checkbox">
            <img src="./img/edit.svg" alt="" width="25" height="25">
            <img onclick=(deleteTodo(${i})) src="./img/delete.svg" alt="" width="25" height="25">
          </div>
        </li> 
        `
    })
}


// ! end of show todos

// checkbox checked


//end of checkbox checked






// ! reuzebol qayta foydalanuvchi function

function showMessage(where, message){
    document.getElementById(`${where}`).textContent = message;

    setTimeout(() => {
        messageCreate.textContent = ``
    },2500)
}
// ! end of reuzebol 




// ! Get todos
formCreate.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = formCreate[`input-create`].value.trim()
    formCreate.reset()
    if(todoText.length) {
        todos.push({
            text:todoText,
            time:getTime(),
            comleted:false,
            checked:false
        })
        setTodos()
        showTodos ()
        // console.log(todos);
    }else{
       showMessage(`message-create`, `Please, Enter some todo`)
    }

})
// ! delet todo
function deleteTodo(id) {
    const deletedTodo = todos.filter((item, i) => {
        return i !== id
    })
    todos = deletedTodo
    setTodos()
    showTodos()
}
// ! end of delete todo


// ! comleted todo
function setCompleted(id){
    const setCompletedTodos = todos.map((item, i) =>{
        if(id == i){
            return{...item,comleted:item.comleted == true ? false : true}
        }else{
            return {...item}
        }
    })
    todos= setCompletedTodos
    setTodos()
    showTodos()
}