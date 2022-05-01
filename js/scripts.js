/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

/* Piano JS */

let time;               //counts the number of chord to do in the game
let myInterval = null;  //gets the value of the setInterval function
const nbNote = 7;       //number of notes (do, re, mi, fa, sol, la, si)
let rNote = [];         //array of random notes
let memNote = [];       //array to keep in memory rNote[]

/* Event function for the button start when it is clicked on */
button_play.addEventListener("click", () => {
    if(myInterval != null){     //The game is still playing
        if(memNote != null) {   //memNote has been initialized (avoid errors)
            resetTile(memNote[0], memNote[1], memNote[2]); //calls the reset
        }       
        clearInterval(myInterval)   //Clear the interval to avoid conflicts and restart it
    }
    time = 10;    
    myInterval = setInterval(playChord, 4000)   //Start the new interval and call playChord every 4 seconds
})

/* Function getRandomNote which return an array of random String notes */
function getRandomNote() {    
    let note = [];  //array for the potential random values
    let i = 0;      //iterator
    while(i < 3){   //we want to create 3 notes     
        note[i] = switchNote(); //calls switchNote to get the value of the note
        while(i == 1 && note[i] == note[i-1]){  //when i = 1, we do not want that note[0] = note[1] so we call switchNote until it is different
            note[i] = switchNote();
        }
        while(i == 2 && (note[i] == note[i-1] || note[i] == note[i-2])){ //when i = 2, we do not want that note[0] = note[2] nor note[1] = note[2] so we call switchNote until it is different
            note[i] = switchNote();
        }
        i++;  //iterates i           
    }
    return note;
}

/* Function switchNote which handles the random function Math.random and put it in a switch to return the String associated to a note  */
function switchNote() {
    let idNote = Math.floor(Math.random() * nbNote);    //Randomizer from 0 to 6 which gives 7 different values
    //Each value is then related to a note and returned
    switch (idNote) {
        case 0:
            return "do";
        case 1:
            return "re";
        case 2:
            return "mi";
        case 3:
            return "faBis"; //Called faBis because of some conflicts with css bootstrap classes
        case 4:
            return "sol";
        case 5:
            return "la";
        case 6:
            return "si";
        default:
            console.log("Error");
            return null;
    }
}

/* Function playChord who calls the other functions and handles the game (is called every 4 seconds with setInterval) */
function playChord() {
    //Tiles are already reseted at the beginning of the game so for every other time the function is called, we reset the tiles before displaying new tiles
    if(time < 10){
        resetTile(memNote[0], memNote[1], memNote[2]); //We use the array who keeps in mind the 3 last notes to reset the tiles
    }       
    rNote = getRandomNote();    //Gets the random notes in rNote
    memNote = rNote;            //Copy the random notes in rNote
    note(rNote[0],rNote[1],rNote[2]);   //Displays the chord on the music sheet and on the piano
    
    if(time == 0){  //The game is over, we can reset the tiles and clear our interval
        resetTile(memNote[0], memNote[1], memNote[2]);
        clearInterval(myInterval);        
    }
    time-- //Decreasing the time: our number of chords to be done decreases every 4 seconds
}

/* Function note which displays the chord on the music sheet and on the piano thanks to the input of randomized String notes */
function note(first, second, third) {
    //I changed the class of every note and every tile to make the color and position changes
    first_note.className = `note ${first}`;
    second_note.className = `note ${second}`;
    third_note.className = `note ${third}`;
    //Need to get the tile in a variable before changing its class
    first_tile = document.getElementById(`tiles_${first}`);
    first_tile.className = `white ${first} active`;
    second_tile = document.getElementById(`tiles_${second}`);
    second_tile.className = `white ${second} active`;
    third_tile = document.getElementById(`tiles_${third}`);
    third_tile.className = `white ${third} active`;
}

/* Function resetTile which gives back the original appearance of our tiles */
function resetTile(first, second, third) {
    first_tile = document.getElementById(`tiles_${first}`);
    first_tile.className = `white ${first}`;
    second_tile = document.getElementById(`tiles_${second}`);
    second_tile.className = `white ${second}`;
    third_tile = document.getElementById(`tiles_${third}`);
    third_tile.className = `white ${third}`;
}
