const display = document.getElementById("display");
const keys = document.querySelector(".keys");

keys.addEventListener("click", e => {
  if (!e.target.matches("button")) return;

  const key = e.target.dataset.key;

  if (key) append(key);
});

document.getElementById("equals").onclick = calculate;
document.getElementById("clear").onclick = clear;
document.getElementById("back").onclick = backspace;

function append(value) {
  display.value += value;
}

function clear() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = Function(`return ${display.value}`)();
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

/* keyboard support */
document.addEventListener("keydown", e => {
  if ("0123456789+-*/.".includes(e.key)) append(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clear();
});


// mouse-reactive background
const glow = document.querySelector(".glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("touchmove", e => {
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
});

function animateGlow() {
  currentX += (mouseX - currentX) * 0.08;
  currentY += (mouseY - currentY) * 0.08;

  glow.style.transform = `translate(${currentX - window.innerWidth / 2}px, ${currentY - window.innerHeight / 2}px)`;

  requestAnimationFrame(animateGlow);
}

animateGlow();
