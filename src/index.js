"use strict";

import "./style.css";

/* variables globales */

/* récupération de la src de l'img à modifier*/
let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');


/* 3 images possibles de portes ouvertes + fermée*/
let botDoorPath = "./images/robot.svg";
let beachDoorPath = "./images/beach.svg";
let spaceDoorPath = "./images/space.svg";
let closedDoorPath = "./images/closed_door.svg";


/* variables pour les fonctions */
let startButton = document.getElementById('start');
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;

const isClicked = door => {
  if (door.src == closedDoorPath) {
    return false;
  } else {
    return true;
  };
};

const isBot = door => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  };
};

const gameOver = status => {
  if (status === 'Victoire !') {
    startButton.innerHTML = 'Vous avez gagné ! Rejouer ?';
  } else {
    startButton.innerHTML = 'Vous avez perdu ! Réessayer ?';
  };
  currentlyPlaying = false;
};

const playDoor = door => {
  numClosedDoors--;

  if (numClosedDoors === 0) {
    gameOver('Victoire !');
  } else if (isBot(door)) {
    gameOver('Défaite');
  };
};

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);

  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  };
};


/* ouverture de porte avec image en fond*/
door1.onclick = () => {
  if (currentlyPlaying && !isClicked(door1)) {
    door1.src = openDoor1;
    playDoor(door1);
  };
};

door2.onclick = () => {
  if (currentlyPlaying && !isClicked(door2)) {
    door2.src = openDoor2;
    playDoor(door2);
  };
};

door3.onclick = () => {
  if (currentlyPlaying && !isClicked(door3)) {
    door3.src = openDoor3;
    playDoor(door3);
  };
};


/* reset */
const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Bonne chance !';
  randomChoreDoorGenerator();
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  };
};

startRound();