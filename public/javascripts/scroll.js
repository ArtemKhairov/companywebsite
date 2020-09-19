// let id = ['menu', 'sorts', 'maps', 'footer'];

let menu = document.getElementById("menu");
let sorts = document.getElementById("sorts");
let maps = document.getElementById("maps");
let footer = document.getElementById("footer");

let menuBtn = document.getElementById("menu-btn");
let sortsBtn = document.getElementById("sorts-btn");
let mapsBtn = document.getElementById("maps-btn");
let footerBtn = document.getElementById("footer-btn");

// 
function handleMenu() {
  menu.scrollIntoView({ block: "start", behavior: "smooth" });
}

menuBtn.addEventListener('click', handleMenu);

// 
function handleSort() {
  sorts.scrollIntoView({ block: "start", behavior: "smooth" });
}

sortsBtn.addEventListener('click', handleSort);

// 
function handleMaps() {
  maps.scrollIntoView({ block: "start", behavior: "smooth" });
}

mapsBtn.addEventListener('click', handleMaps);

// 
function handleFooter() {
  footer.scrollIntoView({ block: "start", behavior: "smooth" });
}

footerBtn.addEventListener('click', handleFooter);