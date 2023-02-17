# Pokémon Checker

### What is this about?
This Pokémon Checker App was build as a task for Achievement 1 in [Career Foundry's Full-Stack Web Development Program](https://careerfoundry.com/en/courses/become-a-web-developer/). <br>
It is a responsive web application, build with HTML, CSS and JavaScript, that fetches data from the [PokéAPI](https://pokeapi.co/). <br>

### Requirements

- responsiveness
- no given styling
- given HTML: Pokémon List Container and Modal Container
- HTML to display the fetched Pokémons as list items needs to be generated dynamically, depending on amount of items fetched
- while clicking on one of the generated Pokémon list items, a modal needs to open with additional information to that specific Pokémon
- modal elements are also generated dynamically

### Sources
- [PokéAPI documentation](https://pokeapi.co/docs/v2)
- [PokéAPI Pokémon list, with name and Url to detailed Pokémon](https://pokeapi.co/api/v2/pokemon/?limit=150)
- [PokéAPI example of a detailed Pokémon](https://pokeapi.co/api/v2/pokemon/1/)

### Tools
- Visual Studio Code
- GitHub / [Pokémon Checker on GitHub Pages](https://ellypirelly.github.io/simple-pokedex-app/)
- HTML, CSS, JavaScript
- for the sake of this exercise: Polyfills
  - [Polyfill for promises](https://github.com/taylorhakes/promise-polyfill) with this [min.js](https://raw.githubusercontent.com/taylorhakes/promise-polyfill/master/dist/polyfill.min.js)
  - [Polyfill for fetch](https://github.com/github/fetch) with this [js file](https://github.com/github/fetch/releases/download/v3.0.0/fetch.umd.js)
- [Visual Studio Extension Code "Live Server"](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### How to run this?
At time of writing, there's no npm packages or a build workflow present
- clone the repo
- `cd` into project
- if on Visual Studio Code, install "Live Server" extension, go to bottom menu and click "Go Live": <br>
![Visual Studio Code Screenhot Go Live](img/screenshot-golive.png) <br>
- this is going to open the Pokémon Checker on localhost http://127.0.0.1:5500/
