var gQuests = [
    { id: 1, opts: ['Tinkerbel is crying', 'Tinkerbel is laughing', 'Tinkerbel is choking'], correctOptIndex: 1, currImg: '<img src="img/img1.jpg">' },
    { id: 2, opts: ['Mini and Miki are dancing', 'Mini and Miki are singing', 'Mini and Miki are fighting'], correctOptIndex: 0, currImg: '<img src="img/img2.png">' },
    { id: 3, opts: ['The boy is orange', 'The boy is pink', 'The boy is grey',], correctOptIndex: 2, currImg: '<img src="img/img3.jpg">' }
];
var gCurrQuestIdx;
var gScore;

function initGame() {
    gCurrQuestIdx = 0;
    gScore = 100;
    
    var elSum = document.querySelector('.summery');
    var elReet = document.querySelector('.reset');
    elSum.innerHTML = '';
    elReet.innerHTML = '';

    renderQuest();
}

function renderQuest() {

    var elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = gQuests[gCurrQuestIdx].currImg;


    var quest1 = document.querySelector('.answer1');
    quest1.innerHTML = gQuests[gCurrQuestIdx].opts[0];

    var quest2 = document.querySelector('.answer2');
    quest2.innerHTML = gQuests[gCurrQuestIdx].opts[1];

    var quest3 = document.querySelector('.answer3');
    quest3.innerHTML = gQuests[gCurrQuestIdx].opts[2];


}


function checkAnswer(elOpt, optIdx) {
    console.log(elOpt);

    // If user is right
    if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
        gCurrQuestIdx++
        if (gCurrQuestIdx < gQuests.length) {
            renderQuest();
        } else {
            // handle Victory
            handleGameOver();
        }

    } else {
        elOpt.classList.add('wrong');
        setTimeout(function () { elOpt.classList.remove('wrong'); }, 1000);
        gScore -= 5;

    }

}

function handleGameOver() {
    var elSum = document.querySelector('.summery');
    console.log(elSum);

    elSum.innerHTML = '<h2>Your score is: ' + gScore + ' </h2>'
    var elReet = document.querySelector('.reset');
    elReet.innerHTML = ''

}
