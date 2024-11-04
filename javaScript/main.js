const popupButton = document.getElementById("popupButton");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const overlay = document.createElement('div');

overlay.classList.add('overlay'); 
document.body.appendChild(overlay);

function openPopup() {
    popup.style.display = "block";
    overlay.style.display = "block";
}

function closePopupFunc() {
    popup.style.display = "none";
    overlay.style.display = "none";
}

popupButton.addEventListener("click", openPopup);
closePopup.addEventListener("click", closePopupFunc);
overlay.addEventListener("click", closePopupFunc);

window.addEventListener("click", (event) => {
    if (event.target === overlay) {
        closePopupFunc();
    }
});

// Элементы чата
const messagesContent = document.querySelector('.messages-content');
const messageInput = document.querySelector('.message-input');
const messageSubmit = document.querySelector('.message-submit');
const loadingMessageText = 'Загрузка...';

function updateScrollbar() {
    messagesContent.scrollTop = messagesContent.scrollHeight;
}

//временной метки для сообщения
function setDate(messageElement) {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.innerText = `${hours}:${minutes}`;
    messageElement.appendChild(timestamp);
}

// User messages
function insertMessage() {
    const msg = messageInput.value.trim();
    if (!msg) return;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'message-personal');
    messageElement.innerText = msg;
    messagesContent.appendChild(messageElement);
    setDate(messageElement);
    messageInput.value = '';
    updateScrollbar();

    console.log("User message sent:", msg);
    sendPostRequest(msg);
}

//bot messages
function displayBotResponse(responseText) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'new');
    messageElement.innerHTML = responseText;
    messagesContent.appendChild(messageElement);
    setDate(messageElement);
    updateScrollbar();

    console.log("Bot message received:", responseText);
}

//POST-запрос
function sendPostRequest(userMessage) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://92.63.192.119:8080");
    xhr.setRequestHeader("Content-Type", "application/json");

    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'loading', 'new');
    loadingMessage.innerHTML = loadingMessageText;
    messagesContent.appendChild(loadingMessage);
    updateScrollbar();

    const data = JSON.stringify({ message: userMessage });
    xhr.onload = function() {
        if (xhr.status === 200) {
            loadingMessage.remove();
            const response = JSON.parse(xhr.responseText);
            displayBotResponse(response.reply);
        } else {
            loadingMessage.remove();
            displayBotResponse("Ошибка сервера, попробуйте позже.");
        }
    };
    xhr.send(data);
}

messageSubmit.addEventListener('click', insertMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        insertMessage();
        e.preventDefault();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateScrollbar();
});
