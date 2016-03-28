import "babel-polyfill";
import {getColors, parse} from "./deps";
import * as router from "./router";

const $form = document.querySelector(".input");
const $input = document.querySelector(".input input");
const $table = document.querySelector(".colors table");
const $data = document.querySelector(".data");
const $color = document.querySelector(".color");
const $rest = document.querySelector(".rest");
const $links = document.querySelector(".links");
const linkAbout = '<a href="#about">What is this?</a>';
const linkBack = '<a href="#input">Colorify some text</a>';

const colorify = str => {
  let colors = getColors(str, true);
  let html = parse(colors);
  $table.innerHTML = html;
  $rest.textContent = colors.rest.length ? "+" + colors.rest : "";
}

const clickListener = e => {
  let $target = e.target;
  let color = $target.dataset.color;
  $color.textContent = color;
}

const hoverDataListener = e => {
  $data.classList.toggle("left");
}

const submitListener = e => {
  e.preventDefault();
  let text = $input.value;

  if(text.length) {
    router.go("colors", text);
  }
}

const checkTableContentsRoute = str => {
  colorify(str);
}

const emptyColorRoute = () => {
  $color.textContent = "";
}

const inputRoute = () => {
  $input.value = "";
  $input.focus();
}

const leaveInputRoute = mode => {
  if(mode !== "input") {
    $input.blur();
  }
}

const linksRoute = mode => {
  let html;

  switch(mode) {
    case "input":
      html = linkAbout;
      break;
    case "colors":
      html = linkAbout + " | " + linkBack;
      break;
    case "about":
      html = linkBack;
      break;
  }

  $links.innerHTML = html;
}

const init = () => {
  $form.addEventListener("submit", submitListener);
  $table.addEventListener("click", clickListener);
  $data.addEventListener("mouseenter", hoverDataListener);

  router.addListener("colors", checkTableContentsRoute);
  router.addListener("colors", emptyColorRoute);
  router.addListener("input", inputRoute);
  router.addListener("*", linksRoute);
  router.addListener("*", leaveInputRoute);
}

init();
