let scene, camera, renderer;
let life = 100;
let time = 180;

function startGame() {
  localStorage.setItem("nick", nick.value);
  document.getElementById("lobby").style.display = "none";
  document.getElementById("hud").style.display = "block";
  init();
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202020);

  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  for (let i = 0; i < 5; i++) spawnBot(scene);

  setInterval(() => {
    time--;
    document.getElementById("time").innerText = time;
    if (time <= 0) alert("Fim da partida");
  }, 1000);

  animate();
}

let lastShot = 0;
function shoot() {
  const weapon = weapons[currentWeapon];
  if (Date.now() - lastShot < weapon.fireRate) return;
  lastShot = Date.now();

  playSound(weapon.sound);

  const ray = new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2(0, 0), camera);
  const hits = ray.intersectObjects(bots);

  if (hits.length) {
    hits[0].object.life -= weapon.damage;
    if (hits[0].object.life <= 0) {
      scene.remove(hits[0].object);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  move(camera);
  updateBots(camera);
  renderer.render(scene, camera);
}