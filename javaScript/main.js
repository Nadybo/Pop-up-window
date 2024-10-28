document.getElementById("popupButton").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
});

document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

// Закрытие поп-апа при клике вне его
window.onclick = function (event) {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
}

const messagesContent = document.querySelector('.messages-content');
const messageInput = document.querySelector('.message-input');
const messageSubmit = document.querySelector('.message-submit');
const fakeMessages = [
    'Hi',
    'Bye',
    ':)'
];
let fakeIndex = 0;

function updateScrollbar() {
    messagesContent.scrollTop = messagesContent.scrollHeight;
}

function setDate(messageElement) {
    const d = new Date();
    const m = d.getMinutes();
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.innerText = `${d.getHours()}:${m < 10 ? '0' : ''}${m}`;
    messageElement.appendChild(timestamp);
}

function insertMessage() {
    const msg = messageInput.value.trim();
    if (msg === '') return;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'message-personal');
    messageElement.innerText = msg;
    messagesContent.appendChild(messageElement);
    setDate(messageElement);
    messageInput.value = ''; // Очищаем поле ввода
    updateScrollbar();

    // Выводим сообщение в консоль для отладки
    console.log("User  message sent:", msg);

    setTimeout(fakeMessage, 1000 + Math.random() * 20000);
}

function fakeMessage() {
    // Проверяем, если поле ввода не пустое
    if (messageInput.value !== '') return;

    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'loading', 'new');
    loadingMessage.innerHTML = '<figure class="avatar"><img src="popup_img.png" /></figure><span></span>';
    messagesContent.appendChild(loadingMessage);
    updateScrollbar();

    setTimeout(() => {
        loadingMessage.remove();
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'new');
        messageElement.innerHTML = `<figure class="avatar"><img src="popup_img.png" /></figure>${fakeMessages[fakeIndex]}`;
        messagesContent.appendChild(messageElement);
        setDate(messageElement);
        updateScrollbar();

        // Выводим сообщение в консоль для отладки
        console.log("Bot message sent:", fakeMessages[fakeIndex]);
        fakeIndex = (fakeIndex + 1) % fakeMessages.length;
    }, 1000 + Math.random() * 20000);
}

messageSubmit.addEventListener('click', insertMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        insertMessage();
        e.preventDefault();
    }
});

// Инициализация прокрутки при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateScrollbar();
    setTimeout(fakeMessage, 100);
});