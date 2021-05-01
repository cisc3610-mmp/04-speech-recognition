document.addEventListener('DOMContentLoaded', init);

let canvas, ctx, output;
let fruits, apple, banana, peach, kiwi, orange;
let appleImg, bananaImg, peachImg, kiwiImg, orangeImg;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    loadFruitImages();
    defineFruits();
    displayWords();

    output = document.getElementById('output');

    speakButton = document.getElementById('speak');
    speakButton.addEventListener('click', toggleSpeak);
}

function loadFruitImages()
{
    appleImg = new Image();
    appleImg.src = 'assets/images/apple.png';

    bananaImg = new Image();
    bananaImg.src = 'assets/images/banana.png';

    peachImg = new Image();
    peachImg.src = 'assets/images/peach.png';

    kiwiImg = new Image();
    kiwiImg.src = 'assets/images/kiwi.png';

    orangeImg = new Image();
    orangeImg.src = 'assets/images/orange.png';
}

function defineFruits()
{
    apple = {
        name: 'Apple',
        x: canvas.width / 2,
        y: (canvas.height / 2) - 100,
        img: appleImg
    };
    
    banana = {
        name: 'Banana',
        x: canvas.width / 2,
        y: (canvas.height / 2) - 50,
        img: bananaImg
    };
    
    peach = {
        name: 'Peach',
        x: canvas.width / 2,
        y: (canvas.height / 2),
        img: peachImg
    };
    
    kiwi = {
        name: 'Kiwi',
        x: canvas.width / 2,
        y: (canvas.height / 2) + 50,
        img: kiwiImg
    };
    
    orange = {
        name: 'Orange',
        x: canvas.width / 2,
        y: (canvas.height / 2) + 100,
        img: orangeImg
    };

    fruits = {
        'apple': apple,
        'banana': banana,
        'peach': peach,
        'kiwi': kiwi,
        'orange': orange
    }
}

function displayWords()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '50px serif';
    ctx.textAlign = 'center';
    ctx.fillText(apple.name, apple.x, apple.y);
    ctx.fillText(banana.name, banana.x, banana.y);
    ctx.fillText(peach.name, peach.x, peach.y);
    ctx.fillText(kiwi.name, kiwi.x, kiwi.y);
    ctx.fillText(orange.name, orange.x, orange.y);
}

function toggleSpeak(e)
{
    text = e.target.textContent;
    if(text === 'Speak')
    {
        e.target.textContent = 'Stop';
        recognition.start();
    }
    else if(text === 'Stop')
    {
        e.target.textContent = 'Speak';
        recognition.abort();
    }
}

recognition.onresult = (e) =>
{
    res = e.results[0][0].transcript.toLowerCase();
    if(res == 'about')
    {
        copyright = 'Ricky Chon, Copyright 2021';
        output.textContent = copyright;
        textToSpeech(copyright);
    }
    else if(res == 'help')
    {
        help = 'Say a name of the object on the screen. Say about, to hear about the program.';
        output.textContent = help;
        textToSpeech(help);
    }
    else if(fruits[res] != undefined)
    {
        fruit = `Displaying ${res} on the screen...`
        displayFruit(fruits[res]);
        output.textContent = fruit;
        textToSpeech(fruit);
    }
    else
    {
        nomatch = "What you said didn't match anything.";
        output.textContent = nomatch;
        textToSpeech(nomatch);
        displayWords();
    }
}

function displayFruit(fruit)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(fruit.name, canvas.width / 2, canvas.height / 2 - 50);
    ctx.drawImage(fruit.img, (canvas.width / 2) - 150, canvas.height / 2, 266, 237);
}

function textToSpeech(text)
{
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

recognition.onspeechend = () => recognition.stop();

recognition.onerror = (e) => console.error(`Error occurred in recognition: ${e.error}`);