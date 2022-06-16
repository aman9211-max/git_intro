let socket = io();


let boomBtn = document.getElementById('boom');

boomBtn.onclick = function() {
    socket.emit('boom');
}