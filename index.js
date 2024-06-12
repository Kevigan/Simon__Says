var solutionArray = [];
var solutionIndex = 0;
var level = solutionIndex + 1;
var gameHasStarted = false;
var isGameOver = false;

$("body").keypress(function () {
    if (gameHasStarted === false) {
        gameHasStarted = true;
        addRandomClass();
    }
    if (isGameOver) {
        solutionArray = [];
        solutionIndex = 0;
        level = solutionIndex + 1;
        isGameOver = false;
        $("h1").text("Level " + level);
        setTimeout(function () {
            addRandomClass();
        }, 2000);
    }
});

function addRandomClass() {
    var classes = ["#yellow", "#green", "#blue", "#red"];

    var newClass = classes[Math.floor(Math.random() * classes.length)];
    $(newClass).addClass("gamePressed");
    playSound(newClass);
    setTimeout(function () {
        $(newClass).removeClass("gamePressed");
    }, 100);

    $("h1").text("Level " + level);

    solutionArray.push(newClass);
}

function playSound(classToPlaySound) {
    var audio;
    switch (classToPlaySound) {
        case "#yellow":
            audio = new Audio("./sounds/yellow.mp3");
            break;
        case "#green":
            audio = new Audio("./sounds/green.mp3");
            break;
        case "#blue":
            audio = new Audio("./sounds/blue.mp3");
            break;
        case "#red":
            audio = new Audio("./sounds/red.mp3");
            break;
        case "wrong":
            audio = new Audio("./sounds/wrong.mp3");
            break;

        default: console.log("no class to play!");
    }
    audio.play();

}

function checkInput(input) {
    if (input === solutionArray[solutionIndex]) {
        $(input).removeClass(input);
        $(input).addClass("pressed");
        playSound(input);
        solutionIndex++;
        setTimeout(function () {
            $(input).removeClass("pressed");
            $(input).addClass(input);
        }, 100);
        if (solutionIndex === solutionArray.length) {
            setTimeout(function () {
                solutionIndex = 0;
                level++;
                addRandomClass();
            }, 2000);
        }
    } else {
        if (!isGameOver) {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 100);
            isGameOver = true;
            $("h1").text("Game Over! Press any key to restart!");
        }
    }
}

$("#yellow").on("click", (function () {
    checkInput("#yellow");
}));

$("#blue").on("click", (function () {
    checkInput("#blue");
}));

$("#green").on("click", (function () {
    checkInput("#green");
}));

$("#red").on("click", (function () {
    checkInput("#red");
}));