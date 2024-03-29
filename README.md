# Pokémon Checker

### What is this about?

This Pokémon Checker has been built as a task for Achievement 1 in [Career Foundry's Full-Stack Web Development Program](https://careerfoundry.com/en/courses/become-a-web-developer/). <br>
It is a small, responsive web application that fetches data from the external [PokéAPI](https://pokeapi.co/). <br>
Pokémon names are displayed as a list. <br>
Pokémon details are displayed via Modal.

![Screenshot of the Pokemon List](src/img/screenshots/screenshot-list.png)
![Screenshot of the Pokemon Modal](src/img/screenshots/screenshot-modal.png)

[Click here to see the website on GitHub pages](https://ellypirelly.github.io/cf-pokedex-app/)

### Project requirements

- mobile first (starting at 320px), responsive
- HTML, CSS and JavaScript from scratch
- Bootstrap (CSS, JS), Bootstrap's Navbar Component, Bootstrap's Modal Component
- [fetch Pokémon names and Pokémon detailed URLs of a list of Pokémons](https://pokeapi.co/api/v2/pokemon/?limit=150)
- [fetch Pokémon Details via detailed URL, example "bulbasaur"](https://pokeapi.co/api/v2/pokemon/1/)
- create and style a home page that displays fetched Pokémon names as a list `li` within a static `ul`
  - do not display (at time of writing) all 1279 available Pokémon names, but limit that request
  - in that list, dynamically create mandatory `li` and `button` elements for each item
  - click on `button` needs to open a Modal
- create and style a Modal, that displays fetched Pokémon Details
  - for this, use Bootstrap's Modal Component
  - Pokémon Details mandatory to display are: image, name, height, types
  - all needed HTML elements must be created dynamically
- use Polyfills for fetch and promises (browser support)
- properly format and lint all files with Prettier and ESLint
- properly PostCSS, autoprefix and minify all files (manually, no build workflow)

#### Detour to formatting and linting
As I am working with Visual Studio Code, I do not need Prettier. <br>
Visual Studio Code brings code formatting for HTML, CSS/SCSS and JavaScript out of the box. <br>
This is the reason why I deleted Prettier, ESLint and configs off of this project, after passing the final task. <br>
To achieve a common code formatting in colaborations, I've introduced an `.editorconfig` with a most global configuration.

### Languages, Libraries, Frameworks

- HTML
- CSS
- JavaScript
- Bootstrap (CSS and JS; jQuery)
- Polyfill for promises
- Polyfill for fetch

### Sources

- [PokéAPI documentation](https://pokeapi.co/docs/v2)
- [PokéAPI Pokémon list, with name and Url to detailed Pokémon information](https://pokeapi.co/api/v2/pokemon/?limit=150)
- [PokéAPI example of a detailed Pokémon](https://pokeapi.co/api/v2/pokemon/1/)
- [EditorConfig](editorconfig.org)
- [Projects using EditorConfig](https://github.com/editorconfig/editorconfig/wiki/Projects-Using-EditorConfig)
- [Download Plugins necessary to use EditorConfig in your IDE](https://editorconfig.org/#download)

### Tools, Extensions

- Visual Studio Code
- GitHub / [Pokémon Checker on GitHub Pages](https://ellypirelly.github.io/cf-pokedex-app/)
- [Visual Studio Code Extension "Live Server"](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Visual Studio Code Extension "EditorConfig"](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Visual Studio Code Extension "ESLint"](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Polyfill for promises](https://github.com/taylorhakes/promise-polyfill) with this [min.js](https://raw.githubusercontent.com/taylorhakes/promise-polyfill/master/dist/polyfill.min.js)
- [Polyfill for fetch](https://github.com/github/fetch) with this [js file](https://github.com/github/fetch/releases/download/v3.0.0/fetch.umd.js)
- [Bootstrap 4.3.1 via CDN](https://getbootstrap.com/docs/4.3/getting-started/introduction/#js)
- [jQuery min to replace jQuery slim](https://releases.jquery.com/)
- [PostCSS CSS Variables Playground](https://madlittlemods.github.io/postcss-css-variables/playground/)
- [Autoprefixer](http://autoprefixer.github.io/)
- [Minify CSS](https://www.toptal.com/developers/cssminifier)
- [Minify JS](https://www.toptal.com/developers/javascript-minifier)

### How to run this?

No build workflow.

- clone the repo
- `cd` into project
- if on Visual Studio Code, install "Live Server" extension, go to bottom menu and click "Go Live": <br>
  ![Visual Studio Code Screenhot Go Live](src/img/screenshots/screenshot-golive.png) <br>
- this is going to open the Pokémon Checker on localhost http://127.0.0.1:5500/

### Possible future TODO

- Pagination
- Loading Spinner
- Search
- ...
