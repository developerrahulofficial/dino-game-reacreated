import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { add, scene } from "./app.js";
import { music } from "./sounds.js";

export let enemyObjbottom = null;
export let enemyObjTopOne = null;
export let enemyObjTopTwo = null;
export let enemyObjTopThree = null;
export let firstM = null;
export let runningFloor = null;
export let runningFloor1 = null;
export let bigTreeObject = null;
export let cactusObject = null;
export let playerModel1;
export let playerModel2;
export let playerModel3;
export let playerModel1low;
export let playerModel2low;
export let playerModel3low;
export let water = null;
export let water1 = null;
export let playerModelJump;
export const playerDefaultPosition = {
  x: 9,
  y: 1,
  z: 0,
};
let textureLoader = new THREE.TextureLoader();

export const loader = async () => {
  music(); //load sounds

  // player1
  new OBJLoader().load(
    "models/test/dino_1.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/test/dino_1.png`),
          });
        }
      });

      object.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
      object.scale.set(0.2, 0.2, 0.2);
      object.rotation.y = Math.PI / 1;
      object.rotation.x = -0.03;

      playerModel1 = object;
      playerModel1.position.x = 20;
    }, // check if loaded and add one for global check
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("error while loading player model ", error)
  );
  // player2
  new OBJLoader().load(
    "models/test/dino_2.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/test/dino_2.png`),
          });
        }
      });
      object.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
      object.scale.set(0.2, 0.2, 0.2);
      object.rotation.y = Math.PI / 1;

      object.visible = false;
      playerModel2 = object;
      playerModel2.position.x = 20;
    }, // check if loaded and add one for global check
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("error while loading player model ", error)
  );
  // player3
  new OBJLoader().load(
    "models/test/dino_3.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          // child.material = material;
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/test/dino_3.png`),
          });
        }
      });
      object.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
      object.scale.set(0.2, 0.2, 0.2);
      object.rotation.y = Math.PI / 1;
      object.rotation.x = 0.03;
      object.visible = false;
      playerModel3 = object;
      playerModel3.position.x = 20;
      // check if loaded and add one for global check
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("error while loading player model ", error)
  );

  // player1_low
  new OBJLoader().load(
    "models/test/dino_1_low.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          // child.material = material;
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/test/dino_1_low.png`),
          });
        }
      });

      object.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
      object.scale.set(0.2, 0.2, 0.2);
      object.rotation.y = Math.PI / 1;
      object.rotation.x = -0.03;
      object.visible = false;
      playerModel1low = object;
    }, // check if loaded and add one for global check
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("error while loading player model ", error)
  );
  // player2_low
  new OBJLoader().load(
    "models/test/dino_2_low.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          // child.material = material;
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/test/dino_2_low.png`),
          });
        }
      });

      object.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
      object.scale.set(0.2, 0.2, 0.2);
      object.rotation.y = Math.PI / 1;
      object.rotation.x = -0.03;
      object.visible = false;
      playerModel2low = object;
    }, // check if loaded and add one for global check
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("error while loading player model ", error)
  );
  // player3_low
  new OBJLoader().load(
    "models/test/dino_3_low.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          // child.material = material;
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/test/dino_3_low.png`),
          });
        }
      });

      object.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
      object.scale.set(0.2, 0.2, 0.2);
      object.rotation.y = Math.PI / 1;
      object.rotation.x = -0.03;
      object.visible = false;
      playerModel3low = object;
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("error while loading player model ", error)
  );
  // player jump
  new OBJLoader().load(
    "models/dinozaur-jump.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          // child.material = material;
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/dinozaur-jump.png`),
          });
        }
      });
      object.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
      object.scale.set(0.2, 0.2, 0.2);
      object.rotation.y = Math.PI / 1;
      object.visible = false;
      playerModelJump = object;
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("error while loading player model ", error)
  );
  // load a resource
  new OBJLoader().load(
    "models/twoCactusesv1.obj",
    (object) => {
      object.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/twoCactusesv1.png`),
          });
          node.castShadow = true;
          node.receiveShadow = false;
        }
      });
      enemyObjbottom = object;
    }, // check if loaded and add one for global check
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading twoCactuses => ", error)
  );
  // load a ptero
  new OBJLoader().load(
    "models/ptero/ptero-01.obj",
    (object) => {
      object.traverse(function (node) {
        if (node.isMesh)
          node.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/ptero/ptero-01.png`),
          });
      });

      enemyObjTopOne = object;
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading twoCactuses => ", error)
  );
  // load a ptero2
  new OBJLoader().load(
    "models/ptero/ptero-02.obj",
    (object) => {
      object.traverse(function (node) {
        if (node.isMesh)
          node.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/ptero/ptero-02.png`),
          });
      });

      //await scene.add(object);
      enemyObjTopTwo = object;
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading twoCactuses => ", error)
  );
  // load a ptero
  new OBJLoader().load(
    "models/ptero/ptero-03.obj",
    (object) => {
      object.traverse(function (node) {
        if (node.isMesh)
          node.material = new THREE.MeshPhongMaterial({
            map: textureLoader.load(`models/ptero/ptero-03.png`),
          });
      });
      enemyObjTopThree = object;
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading twoCactuses => ", error)
  );
  // running floor
  new OBJLoader().load(
    "models/floorgood.obj",
    (object) => {
      object.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: textureLoader.load(`models/floorgood.png`),
          });
          node.receiveShadow = true;
        }
      });

      object.position.set(-120, 1, -13);

      object.scale.set(8, 8, 8);
      object.rotation.y = Math.PI / 2;
      runningFloor = object;

      scene.add(object);

      runningFloor1 = runningFloor.clone();
      runningFloor1.position.set(-358, 1, -13);

      scene.add(runningFloor1);
    }, // called when loading is in progresses
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading floorRunning => ", error)
  );

  new OBJLoader().load(
    "models/water.obj",
    (object) => {
      object.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: textureLoader.load(`models/water.png`),
          });
          node.receiveShadow = true;
        }
      });

      object.position.set(-120, 1, 10);
      object.scale.set(10, 9, 8);
      water = object;
      scene.add(object);
      water1 = water.clone();
      water1.position.set(-358, 1, 10);
      scene.add(water1);
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading floorRunning => ", error)
  );

  new FBXLoader().load(
    "models/Mountain_1.fbx",
    (object) => {
      object.scale.set(0.8, 0.8, 0.8);
      object.position.set(-110, -10, 150);
      firstM = object;
      scene.add(object);
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading Mountain_1 => ", error)
  );

  new FBXLoader().load(
    "models/Cactus.fbx",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          // child.material = material;
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshBasicMaterial({ color: 0x088803 });
        }
      });
      object.scale.set(0.004, 0.004, 0.004);
      cactusObject = object;
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading cactus => ", error)
  );
  new OBJLoader().load(
    "models/bigTree.obj",
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          // child.material = material;
          child.castShadow = true;
          child.receiveShadow = false;
          child.material = new THREE.MeshBasicMaterial({
            map: textureLoader.load(`models/bigTree.png`),
          });
        }
      });
      object.scale.set(3, 3, 3);
      object.castShadow = true; //default is false
      object.receiveShadow = false;
      bigTreeObject = object;
    },
    (xhr) => (xhr.loaded / xhr.total) * 100 >= 100 && add(),
    (error) => console.log("An error while loading bigTree => ", error)
  );
};
