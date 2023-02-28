
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
let select = document.getElementById('course-select');
select.addEventListener('change', courseSelect);

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
            })
            }
        })
    })


    
    renderAPI(correctHoles);
    };

// select tee functions end

// populate API portion of card functions

async function renderAPI(correctHoles) {
    // declarations 
    let frontHoles = document.getElementById('front-holes');
    let frontYardage = document.getElementById('front-yardage');
    let frontPar = document.getElementById('front-par');
    let frontHandicap = document.getElementById('front-handicap');
    let backHoles = document.getElementById('back-holes');
    let backYardage = document.getElementById('back-yardage');
    let backPar = document.getElementById('back-par');
    let backHandicap = document.getElementById('back-handicap');
    

    let frontHolesHTML = `<th scope="col">Hole</th>`
    let frontYardageHTML= `<th scope="row">Yardage</th>`
    let frontParHTML = `<th scope="row">Par</th>`
    let frontHandicapHTML = `<th scope="row">Handicap</th>`
    let backHolesHTML = `<th scope="col">Hole</th>`
    let backYardageHTML = `<th scope="row">Yardage</th>`
    let backParHTML = `<th scope="row">Par</th>`
    let backHandicapHTML = `<th scope="row">Handicap</th>`
    let outYardage = 0;
    let inYardage = 0;
    let totalYardage = 0;
    let outPar = 0;
    let inPar = 0;
    let totalPar = 0;
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
            outYardage += correctHoles[i].yardage;
            outPar += correctHoles[i].par
            totalYardage += correctHoles[i].yardage
            totalPar += correctHoles[i].par
        } else {
            backHolesHTML += `<th scope="col">${i + 1}</th>`
            backYardageHTML += `<td>${correctHoles[i].yardage}</td>`
            backParHTML += `<td>${correctHoles[i].par}</td>`
            backHandicapHTML += `<td>${correctHoles[i].handicap}</td>`
            inYardage += correctHoles[i].yardage;
            inPar += correctHoles[i].par
            totalYardage += correctHoles[i].yardage
            totalPar += correctHoles[i].par
        }
    }
    frontHoles.innerHTML = frontHolesHTML + `<th scope="col">Out</th>`;
    frontYardage.innerHTML = frontYardageHTML + `<td>${outYardage}</td>`;
    frontPar.innerHTML = frontParHTML + `<td>${outPar}</td>`;
    frontHandicap.innerHTML = frontHandicapHTML + `<td></td>`;
    backHoles.innerHTML = backHolesHTML + `<th scope="col">In</th><th scope="col">Total</th>`;
    backYardage.innerHTML = backYardageHTML + `<td>${inYardage}</td><td>${totalYardage}</td>`;
    backPar.innerHTML = backParHTML + `<td>${inPar}</td><td>${totalPar}</td>`;
    backHandicap.innerHTML = backHandicapHTML + `<td></td><td></td>`;

}
  

// populate API portion of card functions end

// populate Players portion of card
let frontBody = document.getElementById('front-body');
let backBody = document.getElementById('back-body');
class Player {
    constructor(id, scores, playerNum) {
        this.name = `<input id="${playerNum + 'Input'}" class="player-input form-control" type="text" placeholder="Name" onchange="updateName(this)">`;
        this.id = id;
        this.scores = scores;
        this.playerNum = playerNum;
        this.frontHTML = '';
        this.backHTML = '';
    }
}

function renderPlayers() {
    frontBody.innerHTML = '';
    backBody.innerHTML = '';
    players.forEach(player => {
        let playerOut = 0;
        let playerIn = 0;
        let playerTotal = 0;
        player.frontHTML = `<tr><th id="${player.playerNum + 'name'}" class="player-score" scope="row">${player.name}</th>`
        player.backHTML = `<tr><th id="${player.playerNum + 'name'}" class="player-score" scope="row">${player.name}</th>`
        for (let i = 0; i < 18; i++) {
            if (i < 9) {
                player.frontHTML +=  `<td id="s${i + 1}" class="player-score"><input id="${player.playerNum + String(i)}" class="number-input form-control" type="number" value="${player.scores[i]}" onchange="addScore(this)"></td>`;
                playerOut += player.scores[i];
                playerTotal += player.scores[i];
            } else {
                player.backHTML += `<td id="s${i + 1}" class="player-score"><input id="${player.playerNum + String(i)}" class="number-input form-control" type="number" value="${player.scores[i]}" onchange="addScore(this)"></td>`;
                playerIn += player.scores[i];
                playerTotal += player.scores[i];
            }
        } 
        player.frontHTML += `<td id="${player.playerNum}out">${playerOut}</td></tr>`;
        player.backHTML += `<td id="${player.playerNum}in">${playerIn}</td><td id="${player.playerNum}total">${playerTotal}</td></tr>`;
    })
    players.forEach(player => {
        frontBody.innerHTML += player.frontHTML;
        backBody.innerHTML += player.backHTML;
    })
            
}





// populate Players portion of card end


// action functions
let player1;
let player2;
let player3;
let player4;
let players = [];



function addPlayer() {
    let newId = Math.random().toString(36).slice(2);
    if (player1 === undefined) {
        player1 = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p1');
        players.push(player1)
    } else if (player2 === undefined) {
        player2 = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p2');
        players.push(player2)
    }else if (player3 === undefined) {
        player3 = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p3');
        players.push(player3)
    } else if (player4 === undefined) {
        player4 = new Player(newId, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 'p4');
        players.push(player4)
    }
   console.log(players);
   
    renderPlayers()
}

function addScore(object,) {
    let index = Number(object.id.split('').splice(2,2).join(''))
    if (object.id[1] === '1') player1.scores[index] = Number(object.value);
    if (object.id[1] === '2') player2.scores[index] = Number(object.value);
    if (object.id[1] === '3') player3.scores[index] = Number(object.value);
    if (object.id[1] === '4') player4.scores[index] = Number(object.value);
    renderPlayers();
}

// action functions end
function updateName(object) {
    if (object.id === 'p1Input') player1.name = object.value;
    if (object.id === 'p2Input') player2.name = object.value;
    if (object.id === 'p3Input') player3.name = object.value;
    if (object.id === 'p4Input') player4.name = object.value;
    renderPlayers()
}

function reset() {
    const teeTitle = document.getElementById('tee-title');
    const courseTitle = document.getElementById('course-title');
    teeTitle.innerHTML = '';
    courseTitle.innerHTML = `<select class="form-control" id="course-select">
    <option value="initial">--Select a Course--</option>
    <option value="Thanksgiving Point">Thanksgiving Point</option>
    <option value="Fox Hollow">Fox Hollow</option>
    <option value="Spanish Oaks">Spanish Oaks</option>
</select>`;
    url = ''
    teeHTML = `
        <select class="form-control" id="tee-select" onchange="teeSelect(this.id)">
            <option value="initial">--Select a Tee Box--</option>
        `; 
    document.getElementById('front-title').style.display = 'none';
    document.getElementById('back-title').style.display = 'none';
    let frontHoles = document.getElementById('front-holes');
    let frontYardage = document.getElementById('front-yardage');
    let frontPar = document.getElementById('front-par');
    let frontHandicap = document.getElementById('front-handicap');
    let backHoles = document.getElementById('back-holes');
    let backYardage = document.getElementById('back-yardage');
    let backPar = document.getElementById('back-par');
    let backHandicap = document.getElementById('back-handicap');
    frontHoles.innerHTML = '';
    frontYardage.innerHTML = '';
    frontPar.innerHTML = '';
    frontHandicap.innerHTML = '';
    backHoles.innerHTML = '';
    backYardage.innerHTML = '';
    backPar.innerHTML = '';
    backHandicap.innerHTML = '';
    frontBody.innerHTML = '';
    backBody.innerHTML = '';
    players = [];
    player1 = undefined;
    player2 = undefined;
    player3 = undefined;
    player4 = undefined;
    select = document.getElementById('course-select');
    select.addEventListener('change', courseSelect);
}







   