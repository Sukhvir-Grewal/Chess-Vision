var odd = document.querySelectorAll(".odd");
var even = document.querySelectorAll(".even");
var timer = document.querySelector(".time");
var start = document.querySelector(".start");
var boxes = document.querySelectorAll(".box");
var RandomBox = document.querySelector(".RandomBox");
var checkbox = document.querySelector(".checkbox");
var toggleHidden = document.querySelectorAll(".toggle-hidden");
var threeTwoOne = document.querySelector(".three-two-one");
var randomNumberForRightTop = document.querySelector(
    ".random-number-for-right-top"
);
var currentScoreInDiv = document.querySelector(".current-score");
var currentScoreInMainDiv = document.querySelector(".current-score-main");
var timeUp = document.querySelector(".timeUp");

// Audio Files
var countdown = document.querySelector("#countdown");
var tenSeconds = document.querySelector("#tenseconds");

var boardNumbers = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "g1",
    "g2",
    "g3",
    "g4",
    "g5",
    "g6",
    "g7",
    "g8",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "h7",
    "h8",
];
var randomBoardNumbers;
var checkboxCounter = 0;
var currentScore = 0;
var bestScore = 0;
var enableClicks = true;
var rightSideBoxes = [7, 15, 23, 31, 39, 47, 55, 63];

//Static HTMLfor wrong answer logo and correct answer logo
{
    var wrongAnswerLogo = `
    <div class="wrong-answer">
        <div class="line-1">
            <div class="line-2"></div>
        </div>
    </div>
`;

    var rightAnswerLogo = `
    <div class="right-answer">
        <div class="right-line-1"></div>
        <div class="right-line-2"></div>
    </div>
`;

    var streakTick = `
    <div class="streak-icons">
        <div class="steak-tick-icon">
            <div class="steak-tick-icon-line-1"></div>
            <div class="steak-tick-icon-line-2"></div>
        </div>
        <span></span>
        </div>
`;
    var streakCross = `
    <div class="streak-icons">
        <div class="steak-cross-icon">
            <div class="steak-cross-icon-line-1">
                <div class="steak-cross-icon-line-2"></div>
            </div>
        </div>
        <span></span>
    </div>
`;
}

currentScoreInMainDiv.innerHTML = currentScore;
// This code is for coloring the game board------
odd.forEach((odd) => {
    odd.style.backgroundColor = "#779954";
    odd.style.color = "#E9EDCC";
});
even.forEach((even) => {
    even.style.backgroundColor = "#E9EDCC";
    even.style.color = "#779954";
});
// ----------------------------------------------

// By clicking on checkBox this block of code will
// remove all the letters and numbers from the boxes
checkbox.addEventListener("click", () => {
    if (checkboxCounter % 2 === 0) {
        toggleHidden.forEach((e) => {
            e.style.display = "none";
        });
    } else {
        toggleHidden.forEach((e) => {
            e.style.display = "block";
        });
    }
    checkboxCounter += 1;
});

// This will start at the timer for 30 seconds
start.addEventListener("click", startButtonListener);

// This portion will get the random value to be shown on the board
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (enableClicks) {
            if (box.getAttribute("value") === randomBoardNumbers.string) {
                // Increasing the winning score and saving the highest score and the best score variable
                currentScoreInDiv.innerHTML = ++currentScore;
                if (bestScore < currentScore) bestScore = currentScore;

                var correctAudio = new Audio("./sounds/correct.mp3");
                correctAudio.play();

                var savePreviousHtml = box.innerHTML;
                box.innerHTML = savePreviousHtml + rightAnswerLogo;

                // Adjusting position to send it to the corner
                if (rightSideBoxes.includes(index)) {
                    document.querySelector(".right-answer").style.top = "0px";
                    document.querySelector(".right-answer").style.left = "45px";
                } else if (index < 8) {
                    document.querySelector(".right-answer").style.top = "10px";
                }

                setTimeout(() => {
                    box.innerHTML = savePreviousHtml;
                }, 100);
                appendStreak(box);
            } else {
                var inCorrectAudio = new Audio("./sounds/incorrect.mp3");
                inCorrectAudio.play();

                var savePreviousHtml = box.innerHTML;
                box.innerHTML = savePreviousHtml + wrongAnswerLogo;

                // Adjusting position to send it to the corner
                if (rightSideBoxes.includes(index)) {
                    document.querySelector(".wrong-answer").style.top = "0px";
                    document.querySelector(".wrong-answer").style.left = "45px";
                } else if (index < 8) {
                    document.querySelector(".wrong-answer").style.top = "10px";
                }

                setTimeout(() => {
                    box.innerHTML = savePreviousHtml;
                }, 100);
                appendStreak(box);
            }
            animationController();
        }
    });
});

function getRandomBoardNumber() {
    const number = Math.floor(Math.random() * 64);
    return {
        number: number,
        string: boardNumbers[number],
    };
}

function appendStreak(box) {
    if (box.getAttribute("value") === randomBoardNumbers.string) {
        var prevHtmlForEndContainer =
            document.querySelector(".after-start-end");
        prevHtmlForEndContainer.innerHTML += streakTick;
        var allStreakIcons = document.querySelectorAll(".streak-icons");

        allStreakIcons[allStreakIcons.length - 1].querySelector(
            "span"
        ).innerHTML = randomBoardNumbers.string;
        allStreakIcons[allStreakIcons.length - 1].querySelector(
            "span"
        ).style.color = "#9cc96f";
    } else {
        var prevHtmlForEndContainer =
            document.querySelector(".after-start-end");
        prevHtmlForEndContainer.innerHTML += streakCross;
        var allStreakIcons = document.querySelectorAll(".streak-icons");

        allStreakIcons[allStreakIcons.length - 1].querySelector(
            "span"
        ).innerHTML = randomBoardNumbers.string;
        allStreakIcons[allStreakIcons.length - 1].querySelector(
            "span"
        ).style.color = "red";
    }
}

function animationController() {
    threeTwoOne.classList.remove("fade");
    randomBoardNumbers = getRandomBoardNumber();
    threeTwoOne.innerHTML = randomBoardNumbers.string;
    randomNumberForRightTop.innerHTML = randomBoardNumbers.string;

    // Add the "fade" class after a short delay
    setTimeout(function () {
        threeTwoOne.classList.add("fade");
    }, 10);
}

function UnClearContainer() {
    document.querySelector(".outer-top-round-section").style.display = "block";
    document.querySelector(".top-round-section").style.display = "block";
    document.querySelector(".middle-content").style.display = "block";
    document.querySelector(".end-section").style.display = "block";

    randomNumberForRightTop.innerHTML = "";

    document.querySelector(".after-start-top").classList.add("hidden");
    document.querySelector(".sidebar-container").classList.add("hidden");
    currentScoreInMainDiv.innerHTML = bestScore;
}

function clearContainer() {
    document.querySelector(".outer-top-round-section").style.display = "none";
    document.querySelector(".top-round-section").style.display = "none";
    document.querySelector(".middle-content").style.display = "none";
    document.querySelector(".end-section").style.display = "none";

    document.querySelector(".after-start-top").classList.remove("hidden");
    document.querySelector(".sidebar-container").classList.remove("hidden");
    document.querySelector(".after-start-end").classList.remove("hidden");
}

function clearStreakContainer() {
    document.querySelector(".after-start-end").innerHTML = "";
    document.querySelector(".after-start-end").classList.add("hidden");
}

function startButtonListener() {
    currentScore = 0;
    // enableClicks = true;
    currentScoreInDiv.innerHTML = currentScore;

    // Clearing the previous content
    clearContainer();

    var time = 30;
    var timeTTO = 3;
    var degree = 90;

    threeTwoOne.innerHTML = timeTTO;
    countdown.play();
    var TTOTiming = setInterval(() => {
        timeTTO--;
        timeTTO !== 0
            ? (threeTwoOne.innerHTML = timeTTO)
            : (threeTwoOne.innerHTML = "GO!");

        // This part will run the 3 2 1 timer and the 30 sec timer
        if (timeTTO <= 0) {
            setTimeout(() => {
                threeTwoOne.classList.add("fade");

                boxes.forEach((box) => {
                    box.style.cursor = "pointer";
                });

                randomBoardNumbers = getRandomBoardNumber();
                threeTwoOne.innerHTML = randomBoardNumbers.string;
                randomNumberForRightTop.innerHTML = randomBoardNumbers.string;
            }, 500);
            clearInterval(TTOTiming);
            enableClicks = true;
            var Timing = setInterval(() => {
                if (time <= 10) timer.style.color = "red";

                if (time === 10) tenSeconds.play();
                document.querySelector(
                    ".clock-stick"
                ).style.rotate = `${degree}deg`;
                time >= 10
                    ? (timer.innerHTML = `0:${time}`)
                    : (timer.innerHTML = `0:0${time}`);
                time--;
                degree += 90;
                if (time < 0) {
                    clearInterval(Timing);
                    enableClicks = false;
                    boxes.forEach((box) => {
                        box.style.cursor = "auto";
                    });
                    threeTwoOne.classList.remove("fade");
                    threeTwoOne.innerHTML = "";
                    timeUp.style.display = "block";
                    timeUp.classList.add("blink");
                    setTimeout(() => {
                        timeUp.style.display = "none";
                    }, 1000);

                    setTimeout(() => {
                        clearStreakContainer();
                        UnClearContainer();
                    }, 1000);
                }
            }, 1000);
        }
    }, 700);
}
