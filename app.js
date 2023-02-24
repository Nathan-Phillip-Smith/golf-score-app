
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
    const teeTitle = document.getElementById('tee-title');
    teeTitle.innerHTML = "Tee Box: " + document.getElementById(clickedId).value; 
    populate();
    let color = clickedId;
    return color;
    };

// select tee functions end

// populate card functions

async function populate() {
    let course;
    try {
        course = await loadCourse();
    }catch (error) {
        console.log(`ERROR: ${error}`);
    }

    // loop through holes and add info to each dom section
    course.data.holes.forEach(hole => {
        hole.teeBoxes.forEach(box => {
            if (box.teeColorType === color) {
                
            }
        })

    })


}

// populate card functions end









// action functions

function addPlayer() {

}

function addScore() {

}

// action functions end






   