/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// create game variables
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

// generate random number (lewat console)
//dice = Math.floor(Math.random() * 6 + 1 );

// manipulate n read from the DOM
// use document object to access the DOM
// queryselector to select stuff
//document.querySelector('#current-' + activePlayer ).textContent = dice; // setter : set the value

// print fancy dice text with innerHTML
//document.querySelector('#current-' + activePlayer ).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent; // getter : get the value
//console.log(x);


// create function that will be called by addEventListener method, this is called callback function
// Callback function / extern function is the function that called by another function
//function btn() {
// Do something
//}

// set up event handler on the button
// anonymous function / intern function, a function that doesn't have a name, cannot be reused
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. random number
        var dice1 = Math.floor(Math.random() * 6 + 1 );
        var dice2 = Math.floor(Math.random() * 6 + 1 );

        // 2. display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';


        // change image in an img element
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. update the score IF the rolled number IS NOT a 1
        if (dice1 !== 1 && dice2 !== 1 ) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }


        // Challenge
        /*if (dice === 6 && lastDice ===6) {
            // playere lose their scores
            scores[activePlayer]= 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        lastDice = dice;*/
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore; // same w scores[activeplayer] = score[activeplayer] + roundscore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // declare variable for input
        var input = document.querySelector('.set-score').value;
        var winningScore;

        // 0, null, "", undefined are COERCED to FALSE and anything else is COERCED to TRUE
        if (input) {
            winningScore = input;
        } else {
            winningScore = 30;
        }

        // Check if player wins
        if (scores[activePlayer] >= winningScore ) {
            document.querySelector('#name-' + activePlayer).textContent = 'Hurray!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //next player, using ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //reset to zero
    roundScore = 0;

    //zero is visible by player tho
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //who's the active player ? -c-
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //-c- but we can simply use toggle :)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

// change css with queryselector
// hide the dice ! the dice is an class, to access it we use 'dot' then the class name
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

// another way to select elements by ID
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}
