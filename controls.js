const keys = {};
let aiming = false;

window.addEventListener("keydown", e => {
  keys[e.code] = true;

  if (e.code === "Digit1") switchWeapon(primaryWeapon);
  if (e.code === "Digit2") switchWeapon(secondaryWeapon);
});

window.addEventListener("keyup", e => keys[e.code] = false);

window.addEventListener("mousedown", e => {
  if (e.button === 0) shoot();      // tiro
  if (e.button === 2) aiming = true; // mira
});

window.addEventListener("mouseup", e => {
  if (e.button === 2) aiming = false;
});

// Mobile
document.getElementById("fire").addEventListener("touchstart", shoot);

function move(camera) {
  const speed = aiming ? 0.05 : 0.1;
  if (keys["KeyW"]) camera.position.z -= speed;
  if (keys["KeyS"]) camera.position.z += speed;
  if (keys["KeyA"]) camera.position.x -= speed;
  if (keys["KeyD"]) camera.position.x += speed;
}

function switchWeapon(w) {
  currentWeapon = w;
  document.getElementById("weapon").innerText = weapons[w].name;
}