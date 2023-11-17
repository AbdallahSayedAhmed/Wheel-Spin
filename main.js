const buttonElement = document.querySelector(".fullWindow");
const container = document.querySelector(".container");
const wheel = document.querySelector(".wheel");
const overlay = document.querySelector(".overlay");
const canvas = document.querySelector("#my-canvas");
const popup = document.querySelector(".popup");
const title = document.querySelector(".title");
const button = document.querySelector(".spinBtn");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function spin() {
  wheell.play();
  wheel.classList.add("disable-fun");
  button.classList.add("disable-fun");
  // const container = document.querySelector(".container");
  let selectItem = "";

  let iT_Manager = shuffle([2110, 2520, 2880]); //1800, 2160, 2520
  let chief_Executive_Officer = shuffle([2088, 2448, 2808]);
  let human_Resource_Manager = shuffle([2016, 2376, 2736]);
  let chief_Information_Officer = shuffle([1944, 2304, 2664]);
  let head_of_corporate_Communications = shuffle([1872, 2232, 2592]);

  let results = shuffle([
    iT_Manager[0],
    chief_Executive_Officer[0],
    human_Resource_Manager[0],
    chief_Information_Officer[0],
    head_of_corporate_Communications[0],
  ]);

  if (iT_Manager.includes(results[0])) selectItem = "It Manager";
  if (chief_Executive_Officer.includes(results[0]))
    selectItem = "Chief Executive Officer";
  if (human_Resource_Manager.includes(results[0]))
    selectItem = "Human Resource Manager";
  if (chief_Information_Officer.includes(results[0]))
    selectItem = "Chief Information Officer";
  if (head_of_corporate_Communications.includes(results[0]))
    selectItem = "Head of corporate Communications";

  wheel.style.setProperty("transition", "all ease 6s");
  wheel.style.transform = "rotate(" + results[0] + "deg)";
  wheel.classList.remove("animate");

  setTimeout(() => {
    wheel.classList.add("animate");
  }, 6000);

  my_position_interval = setTimeout(() => {
    // alert
    applause.play();
    wheel.classList.remove("disable-fun");
    button.classList.remove("disable-fun");

    overlay.classList.add("active");
    popup.classList.add("active");
    title.innerText = `${selectItem} position.`;

    canvas.style.display = "block";
    var confettiSettings = { target: "my-canvas" };
    var confetti = new ConfettiGenerator(confettiSettings);

    confetti.render();
  }, 6500);

  // Set another timeout to stop the confetti after 5 seconds
  setTimeout(() => {
    applause.pause();
    overlay.classList.remove("active");
    popup.classList.remove("active");
    canvas.style.display = "none";
  }, 11500);

  setTimeout(() => {
    wheel.style.setProperty("transition", "initial");
    wheel.style.transform = "rotate(90deg)";
  }, 7000);
}

function removeOverlay() {
  applause.pause();
  overlay.classList.remove("active");
  popup.classList.remove("active");
  canvas.style.display = "none";
}

function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullscreenElement ||
    document.msFullscreenElement ||
    document.oFullscreenElement
  );
}
//##################################

function fullWindowMood() {
  if (getFullscreenElement()) {
    buttonElement.innerText = "Full Screen Mode";
    document.exitFullscreen();
  } else {
    buttonElement.style.visibility = "hidden";
    buttonElement.innerText = "Exit Full Screen Mode";
    document.documentElement.requestFullscreen().catch(console.log);
  }
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    if (buttonElement.style.visibility === "visible") {
      buttonElement.style.visibility = "hidden";
      buttonElement.innerText = "Exit Full Screen Mode";
    }
  } else {
    buttonElement.style.visibility = "visible";
    buttonElement.innerText = "Full Screen Mode";
  }
});

if (!document.fullscreenElement) {
  document.addEventListener("dblclick", () => {
    buttonElement.style.visibility = "visible";
  });
}
