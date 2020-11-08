'use strict';
const homePageHtml = async() => {
    console.log('home page')
    let TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 150 - Math.random() * 100;

        if (this.isDeleting) { delta /= 4; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 1000;
        }

        if (this.isDeleting && i == that.toRotate.length - 1) {
            clearTimeout(fancytimeout)
        } else {
            fancytimeout = setTimeout(function() {
                that.tick();
            }, delta);
        }
    };
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }


}


const aboutHtml = async() => {
    const main = document.getElementById('main');
    if (members != null) {
        members.get()
            .then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    let img = doc.data().profilePic
                    console.log('this is img', img)
                    let imgE = document.getElementsByTagName('img')[0]
                    imgE.setAttribute('src', img)
                    console.log(imgE)
                })
            })
            .catch((error) => {
                console.log("Error getting countries:", error);
            });
        console.log('about')
    }
}

const formHtml = async() => {
    console.log('hobbies')
}

let fancytimeout = null
let members = null

window.onload = function() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    var database = firebase.firestore();
    members = database.collection("Members");
    let messageRef = firebase.database().ref('my-first-single-database-app')
    document.getElementById('contactForm').addEventListener('submit', submitForm)

    new fullScroll({
        displayDots: true,
        dotsPosition: 'left',
        animateTime: 0.7,
        animateFunction: 'ease',
        routes: [
            { path: 'section1', section: homePageHtml },
            { path: 'section2', section: aboutMeHtml },
            { path: 'section3', section: aboutHtml },
            { path: 'section4', section: formHtml }

        ],
        onselectionchange: function() {
            console.log("clearing timer")
            clearTimeout(fancytimeout)
        }
    });
};