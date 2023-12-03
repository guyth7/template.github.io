// Check if there's a color option in local storage
let mainColors = localStorage.getItem("color_option");

// If there's a color item in local storage
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove active class from all colors list items
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");

    // Add active class to element with data-color === local storage item
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check if Random Local Storage is not Empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === 'true') {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === 'true') {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Click on toggle settings to toggle the settings box
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
//Loop on All List Item
colorsLi.forEach(li => {
  //Click on Every List Item
  li.addEventListener("click", (e) => {

    //Set Coloron Root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    //Set Color on Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span => {
  //Click on Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select landing page element
let landingPage = document.querySelector(".landing-page");

// Get array of images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function to randomize images
function randomizeImgs() {
  if (backgroundOption === true) {
    clearInterval(backgroundInterval);
    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change background image URL
      landingPage.style.backgroundImage = `url("images/${imgsArray[randomNumber]}")`;
    }, 1000);
  }
}
randomizeImgs();


// Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function() {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // window scrollTop
  let windowScrollTop = this.pageYOffset;
  console.log(windowScrollTop);
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img =>{
  img.addEventListener("click",(e) =>{
    // Create Overlay Element
    let overlay = document.createElement("div");
    //Add Class To Overlay
    overlay.className = "popup-overlay";
    //Append Overlay To The Body
    document.body.appendChild(overlay);
    // Create The Popup
    let popupBox = document.createElement("div");
    //Add Class To the Popup Box
    popupBox.className = "popup-box";
    if(img.alt !== null){
      //Create Heading
      let imgHeading = document.createElement("h3");
      // Create Text for Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To The Heading
      imgHeading.appendChild(imgText);
      //Append the Heading To The popup Box
      popupBox.appendChild(imgHeading);
    }
    // Create The Image
    let popupImage = document.createElement("img");
    //set Image Source
    popupImage.src = img.src;
    //Add Image To Popup Box
    popupBox.appendChild(popupImage);
    //Append The Popup Box to Body
    document.body.appendChild(popupBox);
    // Create The Clsoe Span
    let closeButton = document.createElement("span");
    // Create The close Button Text
    let closeButtonText = document.createTextNode("X");
    //Append Text to close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To Close Button
    closeButton.className = "close-button";
    // Add Close Button To The Box
    popupBox.appendChild(closeButton);
  });
});


// Close Popup
document.addEventListener("click",function(e){
  if(e.target.className === 'close-button'){
    // Remove The Current Popup
    e.target.parentNode.remove();
    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});


// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Bullets
const allLinks = document.querySelectorAll(".links a");

function  scrollToSomewhere(element){
  element.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


//Handle Active State
function handleActive(ev){
  //Remove Active Class All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
    element.classList.remove("active");
  });
  //Add Active Class On Self
  ev.target.classList.add("active");
}


let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");
if(bulletLocalItem !== null){
  bulletSpan.forEach(span =>{
    span.classList.remove("active");
  });
  if(bulletLocalItem === "block"){
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else{
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletSpan.forEach(span =>{
  span.addEventListener("click", (e) =>{
    if(span.dataset.display === "show"){
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else{
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option","none");
    }
    handleActive(e);
  });
});


//Reset Button
document.querySelector(".reset-options").onclick = function(){
  localStorage.clear();  
  //localStorage.removeItem("color_option");
  //localStorage.removeItem("background_color");
  //localStorage.removeItem("reset-options");
  window.location.reload();
};


// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){
  //stop propagation
  e.stopPropagation();
  //toggle class "menu-active" on Button
  this.classList.toggle("menu-active");
  // toggle class "open" on links
  tLinks.classList.toggle("open");
};

//click anywhere outside menu and toggle button
document.addEventListener("click", (e) =>{
  if(e.target !== toggleBtn && e.target !== tLinks){
    //check if menu is open
    if(tLinks.classList.contains("open")){
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

//stop propagation on menu
tLinks.onclick = function(e){
  e.stopPropagation();
}