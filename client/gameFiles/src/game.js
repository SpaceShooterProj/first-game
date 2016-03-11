var renderer, stage, players = [], sounds = [];
function init() {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 800);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 600);
  SpaceShooter.settings.width = w;
  SpaceShooter.settings.height = h;
  renderer = new PIXI.autoDetectRenderer(w, h);
  stage = new PIXI.Container(0x000000);
  stage.updateLayersOrder = function () {
    stage.children.sort(function(a,b) {
      a.zIndex = a.zIndex || 11; // 0-10 is for backgrounds
      b.zIndex = b.zIndex || 11; // 0-10 is for backgrounds
      return a.zIndex - b.zIndex
    });
  };
  document.getElementById('game').innerHTML = '';
  document.getElementById('game').appendChild(renderer.view);
  var level = new SpaceShooter.Level1();
  level.start();
  SpaceShooter.level = level;
  stage.updateLayersOrder();
  requestAnimationFrame(update);
  var playerShip = new SpaceShooter.Ship();
  playerShip.init();
  playerShip.add();
  var id = 0;
  var player = {
    id: id,
    ship: playerShip,
    score: 0
  };
  playerShip.playerId = id;
  players.push(player);
  InitializeShipActions(players);
}
function exit() {
  renderer = null, stage = null, players = [], sounds = [];
}
function update(time) {
  requestAnimationFrame(update);
  SpaceShooter.update(time);
  TWEEN.update(time);
  renderer.render(stage);
}
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
function clone(obj) {
  var copy;
  if (null == obj || "object" != typeof obj) return obj;
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }
  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy obj! Its type isn't supported.");
}
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
    j = Math.floor( Math.random() * ( i + 1 ) );
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};
window.performance = window.performance || {};
performance.now = (function() {
  return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() { return new Date().getTime(); };
})();
var InitializeShipActions = function(players) {
  var wPress = false, aPress = false, sPress = false, dPress = false, shooting = false;
  window.onkeypress = function(event) {
    var char = String.fromCharCode(event.keyCode || event.charCode);
    // console.log('|'+char+'|'+event.keyCode+'|'+event.charCode);
    if (char === 'w') {
      wPress = true;
      players[0].ship.decelerateYSpeed = false;
    }
    if (char === 'a') {
      aPress = true;
      players[0].ship.decelerateXSpeed = false;
    }
    if (char === 's') {
      sPress = true;
      players[0].ship.decelerateYSpeed = false;
    }
    if (char === 'd') {
      dPress = true;
      players[0].ship.decelerateXSpeed = false;
    }
    if (char === ' ') {
      players[0].ship.shooting = true;
    }
  }
  window.onkeyup = function(event) {
    var char = String.fromCharCode(event.keyCode || event.charCode);
    // console.log('|'+char+'|'+event.keyCode+'|'+event.charCode);
    if (char === 'W') {
      wPress = false;
      players[0].ship.decelerateYSpeed = true;
    }
    if (char === 'A') {
      aPress = false;
      players[0].ship.decelerateXSpeed = true;
    }
    if (char === 'S') {
      sPress = false;
      players[0].ship.decelerateYSpeed = true;
    }
    if (char === 'D') {
      dPress = false;
      players[0].ship.decelerateXSpeed = true;
    }
    if (char === ' ') {
      players[0].ship.shooting = false;
    }
  }
  // Acceleration
  var accelerationSpeed = 100; // Milliseconds
  window.setInterval(function() {
    if (wPress) {
      players[0].ship.speed.y -= players[0].ship.accelerationYSpeed;
      if (Math.abs(players[0].ship.speed.y) > players[0].ship.maxSpeedY) players[0].ship.speed.y = -players[0].ship.maxSpeedY;
      players[0].ship.setSpeed(players[0].ship.speed.x, players[0].ship.speed.y);
    }
    if (aPress) {
      players[0].ship.speed.x -= players[0].ship.accelerationXSpeed;
      if (Math.abs(players[0].ship.speed.x) > players[0].ship.maxSpeed) players[0].ship.speed.x = -players[0].ship.maxSpeed;
      players[0].ship.setSpeed(players[0].ship.speed.x, players[0].ship.speed.y);
    }
    if (sPress) {
      players[0].ship.speed.y += players[0].ship.accelerationYSpeed;
      if (Math.abs(players[0].ship.speed.y) > players[0].ship.maxSpeedY) players[0].ship.speed.y = players[0].ship.maxSpeed;
      players[0].ship.setSpeed(players[0].ship.speed.x, players[0].ship.speed.y);
    }
    if (dPress) {
      players[0].ship.speed.x += players[0].ship.accelerationXSpeed;
      if (Math.abs(players[0].ship.speed.x) > players[0].ship.maxSpeed) players[0].ship.speed.x = players[0].ship.maxSpeed;
      players[0].ship.setSpeed(players[0].ship.speed.x, players[0].ship.speed.y);
    }
  }, accelerationSpeed);
  // Deceleration
  var decelerationSpeed = 100; // Milliseconds
  window.setInterval(function() {
    if (Math.abs(players[0].ship.speed.x) > 0 && players[0].ship.decelerateXSpeed && players[0].ship.speed.x > 0) players[0].ship.speed.x -= players[0].ship.decelerationXSpeed;
    if (Math.abs(players[0].ship.speed.x) > 0 && players[0].ship.decelerateXSpeed && players[0].ship.speed.x < 0) players[0].ship.speed.x += players[0].ship.decelerationXSpeed;
    if (Math.abs(players[0].ship.speed.y) > 0 && players[0].ship.decelerateYSpeed && players[0].ship.speed.y > 0) players[0].ship.speed.y -=  players[0].ship.decelerationYSpeed;
    if (Math.abs(players[0].ship.speed.y) > 0 && players[0].ship.decelerateYSpeed && players[0].ship.speed.y < 0) players[0].ship.speed.y +=  players[0].ship.decelerationYSpeed;
  }, decelerationSpeed);
};

setTimeout(function() {init()}, 1000);
