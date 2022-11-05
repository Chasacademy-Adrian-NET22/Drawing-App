window.addEventListener("load", () => {
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousedown", startPainting);
  window.addEventListener("mouseup", stopPainting);
  window.addEventListener("mousemove", sketch);
});

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};

let coord = {
  x: 0,
  y: 0,
};

let paint = false;

const startPainting = (e) => {
  //console.log(e)
  paint = true;
  getPosition(e);
};

const getPosition = (e) => {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;
};

const stopPainting = () => {
  paint = false;
};

let lineWidth = 5;
let colour = "black";

let sketch = (e) => {
  if (paint) {
    ctx.beginPath();

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = colour;

    ctx.moveTo(coord.x, coord.y);
    getPosition(e);
    ctx.lineTo(coord.x, coord.y);

    ctx.stroke();
  }
};

const colours = document.querySelectorAll('.colours .colour');

colours.forEach((singleColour) => {
    
    singleColour.addEventListener('click', () => {
        colour = singleColour.getAttribute("colour");
        
    });
});

const tools = document.querySelectorAll(".tools .tool");

tools.forEach((tool) => {
    tool.addEventListener("click", () => {
        switch (tool.getAttribute("tool")) {
            
            case "pencil":
                lineWidth = 5;
                colour = "black";
                break;
            case "clear":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                lineWidth = 5;
                colour = "black";
                break;
            case "eraser":
                lineWidth = 20;
                colour = "white";
                break;
            default:
                lineWidth = 5;
                colour = "black"
        }
    });
});
