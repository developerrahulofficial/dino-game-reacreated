import * as THREE from "three";
import {
  playerModel1,
  playerModel2,
  playerModel3,
  playerModelJump,
  playerDefaultPosition,
  playerModel1low,
  playerModel2low,
  playerModel3low,
} from "./loader.js";
import { scene } from "./app.js";
export let playerHitboxMesh, playerHitboxGeo, playerHitboxMat;

//export let mixer;

export const player = () => {
  scene.add(playerModel1);
  scene.add(playerModel2);
  scene.add(playerModel3);
  scene.add(playerModel1low);
  scene.add(playerModel2low);
  scene.add(playerModel3low);
  scene.add(playerModelJump);
  // player hitbox
  playerHitboxGeo = new THREE.BoxGeometry(3, 4, 3);
  playerHitboxMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0,
    transparent: true,
  });
  playerHitboxMesh = new THREE.Mesh(playerHitboxGeo, playerHitboxMat);
  playerHitboxMesh.position.set(
    playerDefaultPosition.x,
    8,
    playerDefaultPosition.z
  );
  scene.add(playerHitboxMesh);
};
