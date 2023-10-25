import * as THREE from "three";

import "./../css/app.scss";

import Stats from "stats.js";
import {
  loader,
  playerDefaultPosition,
  playerModelJump,
  playerModel1,
  playerModel2,
  playerModel3,
} from "./loader.js";
import { moving } from "./moving.js";
import { player, playerHitboxMesh } from "./player.js";
import { enemySpawner, enemies } from "./enemies.js";
import { Environment } from "./environment.js";
import {
  backMusicController,
  jumpMusicController,
  coinMusicController,
  collisionMusicController,
} from "./sounds.js";

export let camera, scene, renderer, controls;
export let light;
export let canvas = document.querySelector("#gameCanvas");
export let mainLoaded = 0;
export let add = () => {
  if (mainLoaded < 20) mainLoaded++;
};

export let collissionDetected = false;
export let scoreValue = 0;
export let low = false;
export let isJump = false;
export let frame = 0;

setTimeout(() => {
  if (mainLoaded < 20) mainLoaded = 20;
}, 4000);
let scoreValueDisplay = document.querySelector("#scoreValue");

// GLOBAL STATES
let isPlaying = false;
let isCollapsed = false;

// global vars
let collapsedScreen = document.querySelector("#collapsedScreen");
let collapsedScreenScore = document.querySelector("#finalScore");
let collapsedScreenButton = document.querySelector("#restartButton");
collapsedScreenButton.addEventListener("click", () => {
  reset();
  collapsedScreen.style.display = "none";
});

let startScreen = document.querySelector(".startMenu");
let buttonStart = document.querySelector(".startGameButton");

let loadingBar = document.querySelector("#loadingBarValue");
let stopLoadingObjectsLoop = true;

// let stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
//document.body.appendChild(stats.dom);

const init = () => {
  // init all required environment

  // check for the highest score in the localstorage
  let bestValue = localStorage.getItem("score")
    ? localStorage.getItem("score")
    : "00000";
  // check how many 0 to add before to always have 5 digits
  document.querySelector("#bestValue").innerHTML = `${
    bestValue.length === 1
      ? "0000"
      : bestValue.length === 2
      ? "000"
      : bestValue.length === 3
      ? "00"
      : bestValue.length === 4
      ? "0"
      : ""
  }${bestValue}
`;

  // init camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    500
  );
  camera.position.set(
    12.812632627090226,
    15.972268469235177,
    -9.39261128834728
  );
  camera.rotation.set(
    -2.496329585729413,
    0.6314816254240349,
    2.723419319960275
  );

  // create scene
  scene = new THREE.Scene();

  // lights
  let DLight = new THREE.DirectionalLight(0xc19a4b, 0.5);
  let DLightTargetObject = new THREE.Object3D();
  DLight.position.set(-40, 60, -120);
  DLight.target = DLightTargetObject;
  DLightTargetObject.position.set(10, 2, 10);
  DLight.castShadow = true;
  DLight.shadow.radius = 2;
  // create shadows on objects
  DLight.castShadow = true;
  DLight.shadow.radius = 5;
  DLight.shadow.mapSize.width = 1024 * 1;
  DLight.shadow.mapSize.height = 1024 * 1;
  DLight.shadow.camera.scale.y = 10;
  DLight.shadow.camera.scale.x = 20;
  DLight.shadow.camera.near = 0;
  DLight.shadow.camera.far = 200;
  // ambient light(everywhere)
  let ALight = new THREE.AmbientLight(0xccb5ac, 1);

  scene.add(ALight);
  scene.add(DLightTargetObject);
  scene.add(DLight);

  // add fog
  scene.fog = new THREE.Fog(0xe7b251, 1, 125);

  // scene background color(environment)
  scene.background = new THREE.Color(0xe7b251);

  loader(); // all objects loaders

  renderer = new THREE.WebGLRenderer({
    antialias: true, // better quality
    canvas: canvas, // render to existing canvas
  });

  renderer.shadowMap.enabled = true; // enable shadows
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.BasicShadowMap;

  // just for testing

  // on window resize
  window.addEventListener("resize", onWindowResize, false);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// handle keypress
const keyPressedHandler = (e) => {
  // duck
  if (e.code === "KeyS" || e.code === "ArrowDown") {
    if (isJump || playerModel1.position.x > 9) return;
    isJump = false;
    // hit box
    playerHitboxMesh.scale.y = 0.6;
    playerHitboxMesh.position.y = 5;

    low = true;

    // jump
  } else if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") {
    if (isJump || low || playerModel1.position.x > 9) return;

    jumpMusicController.play(); // jump sound

    isJump = true;

    playerHitboxMesh.position.y = 13;
    playerModelJump.position.y = 11;

    playerModel1.visible = false;
    playerModel2.visible = false;
    playerModel3.visible = false;
    playerModelJump.visible = true;

    // reset position y not to fly
    setTimeout(() => {
      playerHitboxMesh.position.y = 8;
      playerModelJump.position.y = 5;
      isJump = false;
    }, 500);
  }
};
// realease the key press
const keyUpHandler = (e) => {
  if (e.code === "KeyS" || e.code === "ArrowDown") {
    setTimeout(() => {
      playerHitboxMesh.position.y = 8;
      playerHitboxMesh.scale.y = 1;
      low = false;
    }, 100);
  }
};
// for collision detection
let eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

// function to reset game after the collision
const reset = () => {
  isJump = false; // if collision was in the air

  eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()); // reset the hitbox
  enemies.length = 0; // clean enemies array

  scene.children = scene.children.filter((one) => one.name !== "enemy"); // left only not enemy children

  playerHitboxMesh.position.set(
    playerDefaultPosition.x,
    8,
    playerDefaultPosition.z
  );

  scoreValue = 0; // reset score value

  // check if there is a highscore from the localstorage
  let bestValue = localStorage.getItem("score")
    ? localStorage.getItem("score")
    : "00000";

  // add 0 at the beginning to have always 5 digits
  document.querySelector("#bestValue").innerHTML = `${
    bestValue.length === 1
      ? "0000"
      : bestValue.length === 2
      ? "000"
      : bestValue.length === 3
      ? "00"
      : bestValue.length === 4
      ? "0"
      : ""
  }${bestValue}`;
  // if there is a hi score in localstorage grab it and if not set value to 0

  // reset global state
  isCollapsed = false;
  isPlaying = true;

  renderer.render(scene, camera);

  // new initial respawn
  enemySpawner({ x: -150 });
  enemySpawner({ x: -210 });
  enemySpawner({ x: -260 });
  enemySpawner({ x: -310 });
  // restart the music
  backMusicController.play();
};

// main animate function ( game loop )
const animate = () => {
  requestAnimationFrame(animate);

  frame++;

  // stats.begin();

  if (!isPlaying || isCollapsed) return;

  // check + movement for all the elements
  moving();

  // update the score
  scoreValueDisplay.innerHTML = `${
    scoreValue.toFixed(0).length === 1
      ? "0000"
      : scoreValue.toFixed(0).length === 2
      ? "000"
      : scoreValue.toFixed(0).length === 3
      ? "00"
      : scoreValue.toFixed(0).length === 4
      ? "0"
      : ""
  }${scoreValue.toFixed(0)}`;
  scoreValue += 0.3;

  if (
    (scoreValue.toFixed(0) * 1) % 100 === 0 &&
    scoreValue.toFixed(0) * 1 !== 0
  )
    coinMusicController.play(); // coin sound on every 100 points

  // collision check
  if (enemies.length) {
    enemies.map((e) => {
      let pBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      pBox.setFromObject(playerHitboxMesh); // from the player
      eBox.setFromObject(e.one ? e.one : e); // from the current enemy

      if (eBox.intersectsBox(pBox)) {
        // pause back music and play hit sound
        backMusicController.pause();
        collisionMusicController.play();
        // display collapsedScreen
        collapsedScreen.style.display = "block";
        collapsedScreenScore.innerHTML = `Score:${scoreValue.toFixed(0)}`;

        // change state
        isCollapsed = true;
        isPlaying = false;

        // get score from the localStorage
        let score = localStorage.getItem("score");

        // if there is a value and that value is less than current
        if (score * 1 < scoreValue) {
          localStorage.setItem("score", scoreValue.toFixed(0));
        }
      }
    });
  }

  renderer.render(scene, camera);

  // stats.end();
};

// to start the game( menu )
buttonStart.addEventListener("click", () => {
  startScreen.style.display = "none";
  isPlaying = true;

  backMusicController.play();

  // spawn the enemies
  enemySpawner({ x: -150 });
  enemySpawner({ x: -210 });
  enemySpawner({ x: -260 });
  enemySpawner({ x: -310 });
});

// key events
document.addEventListener("keydown", keyPressedHandler);
document.addEventListener("keyup", keyUpHandler);

// function(loop) to check if all objects was loaded and then start the game
const loadingObjects = () => {
  if (!stopLoadingObjectsLoop) return;

  loadingBar.style.width = `${mainLoaded * 5.3}%`; // loading bar fullfill based on number of objects loaded

  if (mainLoaded === 20) {
    // replace loading bar with start button
    buttonStart.style.display = "block";
    document.querySelector("#loadingBarValue").style.display = "none";

    // init environment
    Environment();

    // init player
    player();

    // stop current loop
    stopLoadingObjectsLoop = false;
  }
  requestAnimationFrame(loadingObjects);
};

loadingObjects(); // start check loop
init(); // init scene
animate(); // start game loop (blocked before all objects are loaded)
