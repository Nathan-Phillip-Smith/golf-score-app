
// pull from api function

async function loadCourse() {
    return (await fetch(url)).json();
};
// pull from api function end

// select course functions

const point = 'http://uxcobra.com/golfapi/course11819.txt';
const hollow = 'http://uxcobra.com/golfapi/course18300.txt';
const oaks = 'http://uxcobra.com/golfapi/course19002.txt';
let url;
const select = document.getElementById('course-select');
select.addEventListener('change', courseSelect) ;

function courseSelect() {
    // calls correct api then populates title and calls getTee function
    const courseTitle = document.getElementById('course-title');
    courseTitle.innerHTML = select.value; 
    if (select.value === 'Thanksgiving Point') url = point;
    else if (select.value === 'Fox Hollow') url = hollow;
    else if (select.value === 'Spanish Oaks') url = oaks;
    getTee();
};

// select course functions end

// select tee functions

let teeHTML = `
<select class="form-control" id="tee-select" onchange="teeSelect(this.id)">
    <option value="initial">--Select a Tee Box--</option>
`; 

async function getTee(){
    // populates tee selection box from api
    let course;
    try {
        course = await loadCourse();
    }catch (error) {
        console.log(`ERROR: ${error}`);
    };
    console.log(course.data.holes);
    console.log(course.data.holes[0].teeBoxes);
    course.data.holes[0].teeBoxes.forEach(tee => {
        if (tee.teeColorType !== null) {
            teeHTML += `<option value="${tee.teeColorType}">${tee.teeColorType}</option>`
        };
    });
    teeHTML += `</select>`;
    document.getElementById('tee-title').innerHTML = teeHTML;
};

async function teeSelect(clickedId) {
    // populates tee title then calls populate passing it the tee color
    const teeTitle = document.getElementById('tee-title');
    let color = document.getElementById(clickedId).value
    teeTitle.innerHTML = "Tee Box: " + document.getElementById(clickedId).value; 


 
    let course;
    try {
        course = await loadCourse();
    }catch (error) {
        console.log(`ERROR: ${error}`);
    }
    // loop through holes and create and array of correct teeboxes
    let correctHoles = []
    course.data.holes.forEach(hole => {
        hole.teeBoxes.forEach(box => {
            if (box.teeColorType === color) {
                correctHoles.push({
                    id: box.courseHoleId,
                    name: '',
                    yardage: box.yards,
                    par: box.par,
                    handicap: box.hcp,
                    player1: 0,
                    player2: 0,
                    player3: 0,
                    player4: 0
            })
            }
        })
    })



    render(correctHoles);
    };

// select tee functions end

// populate card functions

async function render(correctHoles) {
    // declarations 
    let frontHoles = document.getElementById('front-holes');
    let frontYardage = document.getElementById('front-yardage');
    let frontPar = document.getElementById('front-par');
    let frontHandicap = document.getElementById('front-handicap');
    let frontPlayer1 = document.getElementById('front-player1');
    let frontPlayer2 = document.getElementById('front-player2');
    let frontPlayer3 = document.getElementById('front-player3');
    let frontPlayer4 = document.getElementById('front-player4');
    let backHoles = document.getElementById('back-holes');
    let backYardage = document.getElementById('back-yardage');
    let backPar = document.getElementById('back-par');
    let backHandicap = document.getElementById('back-handicap');
    let backPlayer1 = document.getElementById('back-player1');
    let backPlayer2 = document.getElementById('back-player2');
    let backPlayer3 = document.getElementById('back-player3');
    let backPlayer4 = document.getElementById('back-player4');

    let frontHolesHTML = `<th scope="col">Hole</th>`
    let frontYardageHTML= `<th scope="row">Yardage</th>`
    let frontParHTML = `<th scope="row">Par</th>`
    let frontHandicapHTML = `<th scope="row">Handicap</th>`
    let frontPlayer1HTML = `<th class="player-score" id="player1t" scope="row"><input id="player1" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let frontPlayer2HTML = `<th class="player-score" id="player2t" scope="row"><input id="player2" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let frontPlayer3HTML = `<th class="player-score" id="player3t" scope="row"><input id="player3" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let frontPlayer4HTML = `<th class="player-score" id="player4t" scope="row"><input id="player4" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let backHolesHTML = `<th scope="col">Hole</th>`
    let backYardageHTML = `<th scope="row">Yardage</th>`
    let backParHTML = `<th scope="row">Par</th>`
    let backHandicapHTML = `<th scope="row">Handicap</th>`
    let backPlayer1HTML = `<th class="player-score" id="player11t" scope="row"><input id="player11" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let backPlayer2HTML = `<th class="player-score" id="player12t" scope="row"><input id="player12" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let backPlayer3HTML = `<th class="player-score" id="player13t" scope="row"><input id="player13" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let backPlayer4HTML = `<th class="player-score" id="player14t" scope="row"><input id="player14" class="player-input form-control" type="text" placeholder="Name" onchange="addPlayer(this.id)"></th>`
    let outYardage = 0;
    let inYardage = 0;
    let totalYardage = 0;
    let outPar = 0;
    let inPar = 0;
    let totalPar = 0;
    let outPlayer1 = 0;
    let inPlayer1 = 0;
    let totalPlayer1 = 0;
    let outPlayer2 = 0;
    let inPlayer2 = 0;
    let totalPlayer2 = 0;
    let outPlayer3 = 0;
    let inPlayer3 = 0;
    let totalPlayer3 = 0;
    let outPlayer4 = 0;
    let inPlayer4 = 0;
    let totalPlayer4 = 0;
    // declarations end
    document.getElementById('front-title').style.display = 'initial';
    document.getElementById('back-title').style.display = 'initial';

    let course;
    try {
        course = await loadCourse();
    }catch (error) {
        console.log(`ERROR: ${error}`);
    }
    
    // loop through correctHoles and build out the card
    console.log(correctHoles)
    for (let i = 0; i < correctHoles.length; i++) {
        if (i < 9) {
            frontHolesHTML += `<th scope="col">${i + 1}</th>`
            frontYardageHTML += `<td>${correctHoles[i].yardage}</td>`
            frontParHTML += `<td>${correctHoles[i].par}</td>`
            frontHandicapHTML += `<td>${correctHoles[i].handicap}</td>`
            frontPlayer1HTML += `<td>${correctHoles[i].player1}</td>`
            frontPlayer2HTML += `<td>${correctHoles[i].player2}</td>`
            frontPlayer3HTML += `<td>${correctHoles[i].player3}</td>`
            frontPlayer4HTML += `<td>${correctHoles[i].player4}</td>`
            outYardage += correctHoles[i].yardage;
            outPar += correctHoles[i].par
            outPlayer1 += correctHoles[i].player1
            totalYardage += correctHoles[i].yardage
            totalPar += correctHoles[i].par
            totalPlayer1 += correctHoles[i].player1
        } else {
            backHolesHTML += `<th scope="col">${i + 1}</th>`
            backYardageHTML += `<td>${correctHoles[i].yardage}</td>`
            backParHTML += `<td>${correctHoles[i].par}</td>`
            backHandicapHTML += `<td>${correctHoles[i].handicap}</td>`
            backPlayer1HTML += `<td>${correctHoles[i].player1}</td>`
            backPlayer2HTML += `<td>${correctHoles[i].player2}</td>`
            backPlayer3HTML += `<td>${correctHoles[i].player3}</td>`
            backPlayer4HTML += `<td>${correctHoles[i].player4}</td>`
            inYardage += correctHoles[i].yardage;
            inPar += correctHoles[i].par
            inPlayer1 += correctHoles[i].player1
            totalYardage += correctHoles[i].yardage
            totalPar += correctHoles[i].par
            totalPlayer1 += correctHoles[i].player1
        }
    }
    frontHoles.innerHTML = frontHolesHTML + `<th scope="col">Out</th>`;
    frontYardage.innerHTML = frontYardageHTML + `<td>${outYardage}</td>`;
    frontPar.innerHTML = frontParHTML + `<td>${outPar}</td>`;
    frontHandicap.innerHTML = frontHandicapHTML + `<td></td>`;
    frontPlayer1.innerHTML = frontPlayer1HTML + `<td>${outPlayer1}</td>`;
    frontPlayer2.innerHTML = frontPlayer2HTML + `<td>${outPlayer2}</td>`;
    frontPlayer3.innerHTML = frontPlayer3HTML + `<td>${outPlayer3}</td>`;
    frontPlayer4.innerHTML = frontPlayer4HTML + `<td>${outPlayer4}</td>`;
    backHoles.innerHTML = backHolesHTML + `<th scope="col">In</th><th scope="col">Total</th>`;
    backYardage.innerHTML = backYardageHTML + `<td>${inYardage}</td><td>${totalYardage}</td>`;
    backPar.innerHTML = backParHTML + `<td>${inPar}</td><td>${totalPar}</td>`;
    backHandicap.innerHTML = backHandicapHTML + `<td></td><td></td>`;
    backPlayer1.innerHTML = backPlayer1HTML + `<td>${inPlayer1}</td><td>${totalPlayer1}</td>`;
    backPlayer2.innerHTML = backPlayer2HTML + `<td>${inPlayer2}</td><td>${totalPlayer2}</td>`;
    backPlayer3.innerHTML = backPlayer3HTML + `<td>${inPlayer3}</td><td>${totalPlayer3}</td>`;
    backPlayer4.innerHTML = backPlayer4HTML + `<td>${inPlayer4}</td><td>${totalPlayer4}</td>`;


}
  

// populate card functions end


























































// calculate functions

async function calcOut(){
   
}

async function calcIn(){
   
    
}

async function calcTotal(){
   
}

// calculate functions end

// action functions

function addPlayer(clickedId) {
    
}

function addScore() {
  

}

// action functions end


// if (document.getelementbyid(player2t) !== undefined){
    // create player 2
    // same for player 3 and 4






   