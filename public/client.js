const socket = io()
let name1;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message__area')

do{
    name1 = prompt('Please enter your name:')

}while(!name1)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name1,
        message: message.trim()
    }

    //Append
    appendMessage(msg, 'outgo')
    textarea.value=''
    scrollToBottom()

    //Send to server
    socket.emit('message', msg)
}


function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')


    let markup = `
        <h6>${msg.user}</h6>
        <p>${msg.message}</p>
        `

        mainDiv.innerHTML = markup
        messagearea.appendChild(mainDiv)
}


//Receive messages

socket.on('message', (msg) => {
    appendMessage(msg, 'incom')
    scrollToBottom()
})

function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}