# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors, Lizard, Spock against the computer
- Maintain the state of the score after refreshing the browser

### Screenshot

![Game Screenshot](./images/Screenshot%20(1).png), (./images/Screenshot%20(2).png)


## My process

### Built with

- Semantic HTML5 markup ([`index.html`](index.html))
- CSS custom properties and responsive design ([`style/style.css`](style/style.css))
- Vanilla JavaScript ([`js/script.js`](js/script.js))
- Mobile-first workflow

### What I learned

- How to implement game logic for Rock, Paper, Scissors, Lizard, Spock in JavaScript
- Using localStorage to persist the score across browser refreshes
- Responsive design using Flexbox and media queries
- Creating and toggling modals with JavaScript and CSS

#### Example: Game logic snippet

```js
// js/script.js
const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const userWinResults = [
  'scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
  'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'
];
```

### Continued development

- Add animations for game transitions
- Improve accessibility (keyboard navigation, ARIA labels)
- Add sound effects for user interaction

### Useful resources

- [MDN Web Docs - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Tricks - Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Frontend Mentor Community](https://www.frontendmentor.io/community)