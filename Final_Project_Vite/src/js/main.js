import { userSchema, todoSchema, validate } from "./schema.js";
import { addTodo, postUser } from "./state.js";
import { 
    renderErrors,
    renderRegisterOutput,
    renderTodoList,
    setupTodoActions,
} from "./dom.js";

/* ---------- 1. Registro ---------- */
const registerForm = document.querySelector("#registerForm");
const registerOutput = document.querySelector("#registerOutput");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm));
    const { data, errors } = validate(userSchema, formData);

    console.log("FORMDATA:", formData)

    if (errors) {
        renderErrors(registerForm, errors);
    } else {
        renderErrors(registerForm); // limpia
        renderRegisterOutput(registerOutput, data);
        postUser(data);
        registerForm.reset();
    }
});

/* ---------- 2. Todo App ---------- */
const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector("#todoList");

function refreshTodos() {
    renderTodoList(todoList);
}
refreshTodos();
setupTodoActions(todoList, refreshTodos);

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(todoForm));
    const { data, errors } = validate(todoSchema, formData);

    if (errors) {
        renderErrors(todoForm, errors);
    } else {
        addTodo(data);
        renderErrors(todoForm);
        todoForm.reset();
        refreshTodos();
    }
});

const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const icon = document.getElementById('icon');

toggleThemeBtn.addEventListener('click', () => {
    const body = document.body;
    const currentBgColor = body.style.backgroundColor;

    if (currentBgColor === 'rgb(255, 255, 255)' || currentBgColor === '#FFFFFF') {
        body.style.backgroundColor = 'rgb(34, 34, 34)'; // Dark theme
        toggleThemeBtn.style.backgroundColor = 'rgb(255, 255, 255)';
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-moon");
    } else {
        body.style.backgroundColor = 'rgb(255, 255, 255)'; // Light theme
        icon.classList.remove("bi-moon");
        icon.classList.add("bi-moon-fill");
    }
});
