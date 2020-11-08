function submitForm(e) {

    e.preventDefault()
        //get value
    let name1 = getInputVal('name');
    let email = getInputVal('email');
    let message = getInputVal('message');
    getMessageRef(name1, email, message)
    document.querySelector('.alert').style.display = 'block';
    document.getElementById('contactForm').reset()
    setTimeout(hideNotifyMess, 2000);

}

const hideNotifyMess = () => {
    document.querySelector('.alert').style.display = 'none';
}

function getInputVal(id) {
    return document.getElementById(id).value
}
//get message ref
function getMessageRef(name, email, message) {
    let messageRef = firebase.database().ref('my-first-single-database-app')
    let newMessageRef = messageRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message
    })
}