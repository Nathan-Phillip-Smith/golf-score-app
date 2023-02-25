
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

function teeSelect(clickedId) {
    // populates tee title then calls populate passing it the tee color
    const teeTitle = document.getElementById('tee-title');
    let color = document.getElementById(clickedId).value
    teeTitle.innerHTML = "Tee Box: " + document.getElementById(clickedId).value; 
    populate(color);
    };

// select tee functions end

// populate card functions

async function populate(teeColor) {
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
            if (box.teeColorType === teeColor) {
                correctHoles.push(box)
            }
        })
    })
    // loop through correctholes and fill in card
    console.log(correctHoles)
    console.log(teeColor)
    for (let i = 0; i < correctHoles.length; i++) {
        let hole = correctHoles[i]
        let position = i + 1;
        let yardage = document.getElementById(`y${position}`);
        let par = document.getElementById(`p${position}`);
        let handicap = document.getElementById(`h${position}`);
        yardage.innerHTML = hole.yards;
        par.innerHTML = hole.par;
        handicap.innerHTML = hole.hcp;
    }
    document.getElementById(`hout`).innerHTML = '';
    document.getElementById(`hin`).innerHTML = '';
    document.getElementById(`htotal`).innerHTML = '';
    calcOut();
    calcIn();
    calcTotal();
}

// populate card functions end

// calculate functions

async function calcOut(){
    let totaly = 0
    let totalp = 0
    let totalpl1 = 0
    let totalpl2 = 0
    let totalpl3 = 0
    let totalpl4 = 0
    for (let i = 0; i < 9; i++) {
        let position = i + 1;
        let yardage = document.getElementById(`y${position}`);
        let par = document.getElementById(`p${position}`);
        let player1 = document.getElementById(`pl1${position}`);
        let player2 = document.getElementById(`pl2${position}`);
        let player3 = document.getElementById(`pl3${position}`);
        let player4 = document.getElementById(`pl4${position}`);
        totaly += Number(yardage.innerHTML);
        totalp += Number(par.innerHTML);
        totalpl1 += Number(player1.value);
        totalpl2 += Number(player2.value);
        totalpl3 += Number(player3.value);
        totalpl4 += Number(player4.value);
    }
    document.getElementById(`yout`).innerHTML = totaly;
    document.getElementById(`pout`).innerHTML = totalp;
    if(totalpl1 !== 0){document.getElementById(`pl1out`).innerHTML = totalpl1;}
    if(totalpl2 !== 0){document.getElementById(`pl2out`).innerHTML = totalpl2;}
    if(totalpl3 !== 0){document.getElementById(`pl3out`).innerHTML = totalpl3;}
    if(totalpl4 !== 0){document.getElementById(`pl4out`).innerHTML = totalpl4;} 
}

async function calcIn(){
    let totaly = 0
    let totalp = 0
    let totalpl1 = 0
    let totalpl2 = 0
    let totalpl3 = 0
    let totalpl4 = 0
    for (let i = 9; i < 18; i++) {
        let position = i + 1;
        let yardage = document.getElementById(`y${position}`);
        let par = document.getElementById(`p${position}`);
        let player1 = document.getElementById(`pl1${position}`);
        let player2 = document.getElementById(`pl2${position}`);
        let player3 = document.getElementById(`pl3${position}`);
        let player4 = document.getElementById(`pl4${position}`);
        totaly += Number(yardage.innerHTML);
        totalp += Number(par.innerHTML);
        totalpl1 += Number(player1.value);
        totalpl2 += Number(player2.value);
        totalpl3 += Number(player3.value);
        totalpl4 += Number(player4.value);
    }
    document.getElementById(`yin`).innerHTML = totaly;
    document.getElementById(`pin`).innerHTML = totalp;
    if(totalpl1 !== 0){document.getElementById(`pl1in`).innerHTML = totalpl1;}
    if(totalpl2 !== 0){document.getElementById(`pl2in`).innerHTML = totalpl2;}
    if(totalpl3 !== 0){document.getElementById(`pl3in`).innerHTML = totalpl3;}
    if(totalpl4 !== 0){document.getElementById(`pl4in`).innerHTML = totalpl4;} 
    
    
}

async function calcTotal(){
    let totaly = 0
    let totalp = 0
    let totalpl1 = 0
    let totalpl2 = 0
    let totalpl3 = 0
    let totalpl4 = 0
    for (let i = 0; i < 18; i++) {
        let position = i + 1;
        let yardage = document.getElementById(`y${position}`);
        let par = document.getElementById(`p${position}`);
        let player1 = document.getElementById(`pl1${position}`);
        let player2 = document.getElementById(`pl2${position}`);
        let player3 = document.getElementById(`pl3${position}`);
        let player4 = document.getElementById(`pl4${position}`);
        totaly += Number(yardage.innerHTML);
        totalp += Number(par.innerHTML);
        totalpl1 += Number(player1.value);
        totalpl2 += Number(player2.value);
        totalpl3 += Number(player3.value);
        totalpl4 += Number(player4.value);
    }
    document.getElementById(`ytotal`).innerHTML = totaly;
    document.getElementById(`ptotal`).innerHTML = totalp;
    if(totalpl1 !== 0){document.getElementById(`pl1total`).innerHTML = totalpl1;}
    if(totalpl2 !== 0){document.getElementById(`pl2total`).innerHTML = totalpl2;}
    if(totalpl3 !== 0){document.getElementById(`pl3total`).innerHTML = totalpl3;}
    if(totalpl4 !== 0){document.getElementById(`pl4total`).innerHTML = totalpl4;} 
    
}

// calculate functions end

// action functions

function addPlayer(clickedId) {
    let player = document.getElementById(clickedId + 't')
    let name = document.getElementById(clickedId).value
    player.innerHTML = name;
    player.classList.remove('player-score')
}

function addScore() {
    calcIn();
    calcOut();
    calcTotal();

}

// action functions end






   