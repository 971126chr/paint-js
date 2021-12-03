const canvas = document.getElementById("jsCanvas");
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "white"; //이미지 저장 시 투명으로 저장 됨
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function startPainting(event) {  
    if (event.which != 1) {
        return false;
    } else {
        painting = true;
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        // console.log("creating path in ", x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        // console.log("creating line in ", x, y);
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault(); //마우스 우클릭 시 저장하기 안 뜨게
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function handleSaveClick() {
    const image = canvas.toDataURL(); //png가 jpeg보다 화질이 좋고, 기본 값이 png라 따로 image/jpeg처럼 지정 안 해줘도 된다.
    //console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    //console.log(link);
    link.click();
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); 
//array.from으로 colors를 array 형태로 만들어준뒤 forEach로 color를 event를 갖게 만들어줬다. forEach가 가진 color라는 이름은 아무거나 해도 상관없다.

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}