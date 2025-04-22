
const buttonElement = document.querySelector(".fullWindow");
const container = document.querySelector(".container");
const wheel = document.querySelector(".wheel");
const overlay = document.querySelector(".overlay");
const canvas = document.querySelector("#my-canvas");
const popup = document.querySelector(".popup");
const title = document.querySelector(".title");
const button = document.querySelector(".spinBtn");
const description = document.querySelector(".description");

// Improved shuffle function with Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length, randomIndex;


  
  // While there remain elements to shuffle
  while (currentIndex > 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], 
      array[currentIndex]
    ];
  }

  return array;
}

function spin() {
  wheell.play();
  wheel.classList.add("disable-fun");
  button.classList.add("disable-fun");
  
  let selectItem = "";
  
  // Define rotation values for each of the 8 segments
  // Each segment is 45 degrees (360 / 8), and we add multiple full rotations
  // for a satisfying spin effect (1800 degrees = 5 full rotations + segment offset)

  // Rotation values for each segment - adding 6-8 full rotations (2160-2880 degrees)
  // plus the offset for each specific segment
  const segment1 = shuffle([2160 + 0, 2520 + 0, 2880 + 0]);     // Customer First
  const segment2 = shuffle([2160 + 45, 2520 + 45, 2880 + 45]);  // Resilience
  const segment3 = shuffle([2160 + 90, 2520 + 90, 2880 + 90]);  // Trust
  const segment4 = shuffle([2160 + 135, 2520 + 135, 2880 + 135]); // Innovation
  const segment5 = shuffle([2160 + 180, 2520 + 180, 2880 + 180]); // Service Excellence
  const segment6 = shuffle([2160 + 225, 2520 + 225, 2880 + 225]); // Development
  const segment7 = shuffle([2160 + 270, 2520 + 270, 2880 + 270]); // Sustainability
  const segment8 = shuffle([2160 + 315, 2520 + 315, 2880 + 315]); // Community

  // Combine all segment rotations and shuffle to pick a random one
  let results = shuffle([
    segment1[0], segment2[0], segment3[0], segment4[0],
    segment5[0], segment6[0], segment7[0], segment8[0]
  ]);
  
  // Select the random result from the array
  const selectedRotation = results[0];
  
  // Determine which segment was selected based on the rotation value
  // We need to normalize the rotation by removing complete rotations (modulo 360)
  // and then determine which 45-degree segment it falls into
  const normalizedRotation = selectedRotation % 360;
  const segmentIndex = Math.floor(normalizedRotation / 45);
  
  // Map the segment index to the corresponding value
  const segmentValues = [
    "Customer First",     // Segment 1
    "Community",         // Segment 2
    "Sustainability",    // Segment 3
    "Development",       // Segment 4
    "Service Excellence",// Segment 5
    "Innovation",        // Segment 6
    "Trust",             // Segment 7
    "Resilience"         // Segment 8
  ];
  
  selectItem = segmentValues[segmentIndex];
  
  // Apply the rotation to the wheel
  wheel.style.setProperty("transition", "all ease 6s");
  wheel.style.transform = "rotate(" + selectedRotation + "deg)";
  wheel.classList.remove("animate");
  
  setTimeout(() => {
    wheel.classList.add("animate");
  }, 6000);

  // Show the results after the wheel stops spinning
  let my_position_interval = setTimeout(() => {
    // Play sound and show overlay
    applause.play();
    wheel.classList.remove("disable-fun");
    button.classList.remove("disable-fun");

    overlay.classList.add("active");
    popup.classList.add("active");
    title.innerText = `${selectItem}`;
    // description.innerHTML = `<p>You've landed on <strong>${selectItem}</strong>!</p>`;

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

  // Reset the wheel position after showing the result
  setTimeout(() => {
    wheel.style.setProperty("transition", "initial");
    wheel.style.transform = "rotate(0deg)";
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


