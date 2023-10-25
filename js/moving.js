import * as THREE from "three";
import { cactuses1, cactuses2, bigTrees } from "./environment.js";
import {
  runningFloor,
  runningFloor1,
  water,
  water1,
  firstM,
  playerModel1,
  playerModel2,
  playerModel3,
  playerModel1low,
  playerModel2low,
  playerModel3low,
  playerModelJump,
} from "./loader.js";
import { scoreValue, frame, isJump, low, scene } from "./app.js";
import { enemies, enemySpawner } from "./enemies.js";

let currentRunModel = "one";
let currentPteroModel = "one";
let cooler = 15000; // control the speed

const enemiesMove = () => {
  enemies.map((one) => {
    // check if cactus or ptero
    if (one.position) {
      // move
      one.position.x += 0.5 + scoreValue / cooler;

      // if not visible
      if (one.position.x > 25) {
        // remove from both scene and array s
        scene.remove(one);
        enemies.pop();

        enemySpawner(); // spawn new enemy
      }
    } else {
      // move
      one.one.position.x += 0.5 + scoreValue / cooler;
      one.two.position.x += 0.5 + scoreValue / cooler;
      one.three.position.x += 0.5 + scoreValue / cooler;

      // if not visible
      if (one.one.position.x > 25) {
        // remove from both scene and array
        scene.remove(one.one);
        scene.remove(one.two);
        scene.remove(one.three);
        enemies.pop();
        enemySpawner(); // spawn new enemy
      }
    }
  });
};

// initial decoration positions
let decorationsInitialPos = {
  bigtree0: -120,
  bigtree1: -155,
  bigtree2: -125,
  bigtree3: -111,
  cactuses10: -154,
  cactuses11: -102,
  cactuses20: -100,
  cactuses21: -123,
};

export const moving = () => {
  // TREES
  if (bigTrees[0]) {
    bigTrees[0].position.x += 0.09;
    if (bigTrees[0].position.x > 25) {
      bigTrees[0].position.x =
        decorationsInitialPos.cactuses21 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.bigtree0 = bigTrees[0].position.x;
      bigTrees[0].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }
  if (bigTrees[1]) {
    bigTrees[1].position.x += 0.09;
    if (bigTrees[1].position.x > 25) {
      bigTrees[1].position.x =
        decorationsInitialPos.bigtree0 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.bigtree1 = bigTrees[1].position.x;
      bigTrees[1].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }
  if (bigTrees[2]) {
    bigTrees[2].position.x += 0.09;
    if (bigTrees[2].position.x > 25) {
      bigTrees[2].position.x =
        decorationsInitialPos.bigtree1 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.bigtree2 = bigTrees[2].position.x;
      bigTrees[2].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }
  if (bigTrees[3]) {
    bigTrees[3].position.x += 0.09;
    if (bigTrees[3].position.x > 25) {
      bigTrees[3].position.x =
        decorationsInitialPos.bigtree2 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.bigtree3 = bigTrees[3].position.x;
      bigTrees[3].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }

  if (cactuses1[0]) {
    cactuses1[0].position.x += 0.09;
    if (cactuses1[0].position.x > 25) {
      cactuses1[0].position.x =
        decorationsInitialPos.bigtree3 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.cactuses10 = cactuses1[0].position.x;
      cactuses1[0].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }
  if (cactuses1[1]) {
    cactuses1[1].position.x += 0.09;
    if (cactuses1[1].position.x > 25) {
      cactuses1[1].position.x =
        decorationsInitialPos.cactuses10 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.cactuses11 = cactuses1[1].position.x;
      cactuses1[1].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }

  if (cactuses2[0]) {
    cactuses2[0].position.x += 0.09;
    if (cactuses2[0].position.x > 25) {
      cactuses2[0].position.x =
        decorationsInitialPos.cactuses11 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.cactuses20 = cactuses2[0].position.x;
      cactuses2[0].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }
  if (cactuses2[1]) {
    cactuses2[1].position.x += 0.09;
    if (cactuses2[1].position.x > 25) {
      cactuses2[1].position.x =
        decorationsInitialPos.cactuses20 - Math.random() * (-10 - -15) + -15;
      decorationsInitialPos.cactuses21 = cactuses2[0].position.x;
      cactuses2[1].rotation.y += Math.random() * (30 - 15) + 30;
    }
  }

  // floors
  if (runningFloor) {
    runningFloor.position.x > 130
      ? (runningFloor.position.x = -345)
      : (runningFloor.position.x += 0.5 + scoreValue / cooler);
  }
  if (runningFloor1) {
    runningFloor1.position.x > 130
      ? (runningFloor1.position.x = -345)
      : (runningFloor1.position.x += 0.5 + scoreValue / cooler);
  }

  // river
  if (water) {
    water.position.x > 130
      ? (water.position.x = -345)
      : (water.position.x += 0.5 + scoreValue / cooler);
  }
  if (water1) {
    water1.position.x > 130
      ? (water1.position.x = -345)
      : (water1.position.x += 0.5 + scoreValue / cooler);
  }

  // mountain
  if (firstM) {
    firstM.position.x > 111
      ? (firstM.position.x = -120)
      : (firstM.position.x += 0.07);
  }

  // changing models to have 'animation' effect
  if (
    playerModel1 &&
    playerModel2 &&
    playerModel3 &&
    frame % 5 === 0 &&
    !isJump
  ) {
    playerModelJump.visible = false;
    if (playerModel1.position.x > 9) {
      playerModel1.position.x -= 0.3 + scoreValue / cooler;
      playerModel2.position.x -= 0.3 + scoreValue / cooler;
      playerModel3.position.x -= 0.3 + scoreValue / cooler;
    }
    if (currentRunModel === "one") {
      if (low) {
        playerModel1.visible = false;
        playerModel2.visible = false;
        playerModel3.visible = false;

        playerModel1low.visible = false;
        playerModel2low.visible = true;
      } else {
        playerModel1low.visible = false;
        playerModel2low.visible = false;
        playerModel3low.visible = false;

        playerModel1.visible = false;
        playerModel2.visible = true;
      }
      currentRunModel = "two";
    } else if (currentRunModel === "two") {
      if (low) {
        playerModel1.visible = false;
        playerModel2.visible = false;
        playerModel3.visible = false;

        playerModel2low.visible = false;
        playerModel3low.visible = true;
      } else {
        playerModel1low.visible = false;
        playerModel2low.visible = false;
        playerModel3low.visible = false;

        playerModel2.visible = false;
        playerModel3.visible = true;
      }
      currentRunModel = "three";
    } else if (currentRunModel === "three") {
      if (low) {
        playerModel1.visible = false;
        playerModel2.visible = false;
        playerModel3.visible = false;

        playerModel3low.visible = false;
        playerModel2low.visible = true;
      } else {
        playerModel1low.visible = false;
        playerModel2low.visible = false;
        playerModel3low.visible = false;

        playerModel3.visible = false;
        playerModel2.visible = true;
      }
      currentRunModel = "four";
    } else {
      if (low) {
        playerModel1.visible = false;
        playerModel2.visible = false;
        playerModel3.visible = false;

        playerModel2low.visible = false;
        playerModel1low.visible = true;
      } else {
        playerModel1low.visible = false;
        playerModel2low.visible = false;
        playerModel3low.visible = false;

        playerModel2.visible = false;
        playerModel1.visible = true;
      }
      currentRunModel = "one";
    }
  }
  if (frame % 15 === 0) {
    if (currentPteroModel === "one") {
      enemies.map((one) => {
        if (one.one) {
          one.one.visible = false;
          one.two.visible = true;
        }
      });

      currentPteroModel = "two";
    } else if (currentPteroModel === "two") {
      enemies.map((one) => {
        if (one.two) {
          one.two.visible = false;
          one.three.visible = true;
        }
      });

      currentPteroModel = "three";
    } else if (currentPteroModel === "three") {
      enemies.map((one) => {
        if (one.three) {
          one.three.visible = false;
          one.two.visible = true;
        }
      });
      currentPteroModel = "four";
    } else {
      enemies.map((one) => {
        if (one.two) {
          one.two.visible = false;
          one.one.visible = true;
        }
      });

      currentPteroModel = "one";
    }
  }
  enemiesMove();
};
