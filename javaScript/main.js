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
const fakeMessages = ['Hi', 'Bye', ':)'];
let fakeIndex = 0;

// Прокрутка до последнего сообщения
function updateScrollbar() {
    messagesContent.scrollTop = messagesContent.scrollHeight;
}

// Установка временной метки для сообщения
function setDate(messageElement) {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.innerText = `${hours}:${minutes}`;
    messageElement.appendChild(timestamp);
}

// Отправка пользовательского сообщения
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

    setTimeout(fakeMessage, 1000 + Math.random() * 2000);
}

// Отправка сообщения от бота
function fakeMessage() {
    if (messageInput.value) return;

    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'loading', 'new');
    loadingMessage.innerHTML = '<span></span>';
    messagesContent.appendChild(loadingMessage);
    updateScrollbar();

    setTimeout(() => {
        loadingMessage.remove();

        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'new');
        messageElement.innerHTML = `${fakeMessages[fakeIndex]}`;
        messagesContent.appendChild(messageElement);
        setDate(messageElement);
        updateScrollbar();

        console.log("Bot message sent:", fakeMessages[fakeIndex]);
        fakeIndex = (fakeIndex + 1) % fakeMessages.length;
    }, 1000 + Math.random() * 2000);
}


// Обработчики событий для отправки сообщений
messageSubmit.addEventListener('click', insertMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        insertMessage();
        e.preventDefault();
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    updateScrollbar();
    setTimeout(fakeMessage, 100);
});
