const bots = [];

function spawnBot(scene) {
  const bot = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  bot.position.set(Math.random() * 20 - 10, 1, Math.random() * 20 - 10);
  bot.life = 50;
  scene.add(bot);
  bots.push(bot);
}

function updateBots(camera) {
  bots.forEach(bot => {
    bot.lookAt(camera.position);
    bot.position.x += (camera.position.x - bot.position.x) * 0.002;
    bot.position.z += (camera.position.z - bot.position.z) * 0.002;
  });
} });
}