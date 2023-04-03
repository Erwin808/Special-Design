// check if there is color in local sotage

const mainColor = localStorage.getItem("color_option");

if (mainColor) {
  document.documentElement.style.setProperty(
    "--main-color",
    mainColor
  );
  document.querySelectorAll(".colors-list li").forEach(e => {
    e.classList.remove("active")

    if (e.dataset.color === mainColor) {
      e.classList.add("active")
    }
  })

}

// check if the random checked

// Background random

const randomBackEl = document.querySelectorAll(".random-backgrounds span");

let backgroundOption = true;

let backgroundInterval;

const backgroundLocalItem = localStorage.getItem("background_option")


if (backgroundLocalItem) {
  randomBackEl.forEach(span => {
    span.classList.remove("active")
  })
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active")
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active")
  }
}

// Toggle spin class on icon
document.querySelector(".con i").onclick = function () {
  this.classList.toggle("fa-spin");
  
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch colors

const colorsList = document.querySelectorAll(".option-box li");

colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
    e.target.dataset.color
    );
    
    localStorage.setItem("color_option", e.target.dataset.color);
    
    handleActive(e);
  });
});

// Random backgrounds


randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    
    handleActive(e);
    
    if (e.target.dataset.background === "yes") {
      backgroundOption = true
      randomizeImgs();
      localStorage.setItem("background_option", true)
    } else {
      backgroundOption = false
    clearInterval(backgroundInterval)
    localStorage.setItem("background_option", false)
    }
  });

});


let lanPag = document.querySelector(".landing-page");

let imgs = [1, 2, 3, 4, 5, 6, 7, 8];


function randomizeImgs () {
  if (backgroundOption === true) {
    
    backgroundInterval = setInterval(() => {
      
      let RanNum = Math.floor(Math.random() * imgs.length)
      lanPag.style.backgroundImage = `url("img/${imgs[RanNum]}.jpg")`
    }, 10000)
  }
}

randomizeImgs();




// Select skill selectors

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  
  // Skill offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  
  // Skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  
  // Window Height
  let windowHeight = this.innerHeight;
  
  // window Scroll Top
  let windowScroolTop = this.pageYOffset;
  
  if (windowScroolTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
    
    allSkills.forEach(skill => {
      
      skill.style.width = skill.dataset.progress;
      
    })
  }
};

// creat popup for the images

let ourgallery = document.querySelectorAll(".gallery .images-box img")

ourgallery.forEach(img => {
  
  img.addEventListener("click", e => {
    
    let popupOverlay = document.createElement("div")
    
    popupOverlay.className = "popup-overlay"
    
    document.body.append(popupOverlay)
    
    let popupBox = document.createElement("div")
    
    popupBox.className = "popup-box"
    
    if (img.alt) {
      
      let imgHeader = document.createElement("h3")
      
      imgHeader.textContent = img.alt
      
      popupBox.append(imgHeader)
    }
    
    let popupImg = document.createElement("img")
    
    popupImg.src = img.src
    
    popupBox.append(popupImg)
    
    popupOverlay.append(popupBox)
    
  })
});

document.addEventListener("click", e => {
  
  if (e.target.className === "popup-overlay") {
    
    document.querySelector(".popup-overlay").remove()
  }
  if (document.querySelector(".list").classList.contains("open")) {  // ????    ??????    ???????
    document.querySelector(".list").classList.contains("open")
  }
})

// Select All Bullets

const allBullits = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll("ul li");

// Hide bullets

const showBullets = document.querySelectorAll(".show-bullets span")


const showBulletsLocalItem = localStorage.getItem("show_bullets")

if (showBulletsLocalItem) {
  showBullets.forEach(span => {
    span.classList.remove("active")
  })
  if (showBulletsLocalItem === "true") {
    document.querySelector(".nav-bullets").style.display = "block";
    document.querySelector(".show-bullets .yes").classList.add("active");
  } else {
    document.querySelector(".nav-bullets").style.display = "none";
    document.querySelector(".show-bullets .no").classList.add("active");
  }
}

// Hide Bullets

showBullets.forEach((span) => {
  span.addEventListener("click", (e) => {
  
    handleActive(e);

    if (e.target.dataset.bullets === "yes") {
      document.querySelector(".nav-bullets").style.display = "block"
      localStorage.setItem("show_bullets", true)
    } else {
      document.querySelector(".nav-bullets").style.display = "none"
      localStorage.setItem("show_bullets", false)
    }
  });
  
});
// Select All Links

function scrollSomeWhere (ele) {
  
  ele.forEach(e => {
    
    e.addEventListener("click", (e) => {
      
      e.preventDefault();
      
      document.querySelector(e.target.dataset.section).scrollIntoView({
        
        behavior: "smooth"
        
      });
      
    });
    
  });
}


scrollSomeWhere(allBullits);
scrollSomeWhere(allLinks);

// Handle Active Class Of Self

function handleActive (e) {
  
  e.target.parentElement.querySelectorAll(".active").forEach(e => {
    e.classList.remove("active")
  })
  
  e.target.classList.add("active")
}

// Reset Options

let resetOpt = document.querySelector(".settings-box .reset-options");

resetOpt.addEventListener("click", e => {
  localStorage.removeItem("color_option")
  localStorage.removeItem("background_option")
  localStorage.removeItem("show_bullets")

  window.location.reload()
});

// Open Toggle menu

let ToggleMenu = document.querySelector("header .toggle-menu");
let ul = document.querySelector("header ul");

ToggleMenu.addEventListener("click", e => {

  e.stopPropagation()

  ul.classList.toggle("open")

  ToggleMenu.classList.toggle("menu-active")
  // if (document.querySelector(".open")) {
  //   ul.addEventListener("click", e => {
  //     body.classList.remove("open")
  //   })
  // }

  // body.addEventListener

});


document.onclick = function (e) {
  if (e.target !== ToggleMenu && e.target !== ul) {
    if (ul.classList.contains("open")) {
      
      ul.classList.remove("open")

      ToggleMenu.classList.toggle("menu-active")

    }
  }
};

ul.onclick = e => {
  e.stopPropagation()
}