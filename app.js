

const socket = io("wss://detbaredejligt.com");


socket.on('message', message => {

    document.getElementById('mate').innerText = message;
})