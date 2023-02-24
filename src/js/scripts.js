/* eslint-disable func-names */
const pokemonRepository = (function () {
  // empty array for incoming data
  const pokemonList = [];
  // change limit to more items in case more are necessary
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';

  // typeof check on what's given back by API
  // push valid single item to pokemonList array
  function add(item) {
    if (typeof item === 'object' && 'name' in item && 'detailsUrl' in item) {
      pokemonList.push(item);
    } else {
      /* eslint-disable no-console */
      console.log('Nope, not a valid Poke.');
      /* eslint-disable no-console */
    }
  }

  // get all items, return all items within pokemonList array
  function getAll() {
    return pokemonList;
  }

  // show Bootstrap modal; (only here) jQuery is used for the exercise
  function showModal(item) {
    pokemonRepository.loadDetails(item).then(() => {
      // grab modal-content to empty it
      const modalContent = $('.modal-content');
      // grab modal header, modal body
      const modalHeader = $('.modal-header');
      const modalBody = $('.modal-body');

      // empty modal header, modal body
      modalHeader.empty();
      modalBody.empty();

      modalContent.val('');

      // create elements inside modal header
      const closeButtonElement = $(
        `<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>`
      );
      const ariaButton = $(`<span aria-hidden="true">X</span>`);

      // create elements inside modal body
      const pokeIllu = $(`<div class="modal-body__img-wrapper"></div>`);
      const pokeLogo = $(`<img class="modal-header__logo">`).attr(
        'src',
        'src/img/svg-pokemon-logo.png'
      );
      const pokeImage = $(`<img class="modal-item__img" alt="">`).attr(
        'src',
        item.imageUrl
      );

      const pokeDetails = $(`<div class="modal-body__details-wrapper"></div>`);
      const pokeName = $(
        `<h2 class="modal-body__headline headline-secondary">${item.name}</h2>`
      );
      const pokeHeight = $(
        `<p class="modal-body__item--height"><b>Height: </b>${item.height}</p>`
      );

      // loop over pokeTypes
      let pokeTypes = '';

      for (let i = 0; i < item.types.length; i += 1) {
        pokeTypes += item.types[i].type.name;
        if (i + 1 !== item.types.length) {
          pokeTypes += ', ';
        }
      }

      // create element for pokeTypes
      const typesElement = $(
        `<p class="modal-body__item--types"><b>Types: </b>${pokeTypes}</p>`
      );

      // append all
      modalHeader.append(pokeLogo);
      modalHeader.append(closeButtonElement);
      closeButtonElement.append(ariaButton);

      modalBody.append(pokeIllu);
      modalBody.append(pokeDetails);
      pokeIllu.append(pokeImage);
      pokeDetails.append(pokeName);
      pokeDetails.append(pokeHeight);
      pokeDetails.append(typesElement);
    });
  }

  // event handler on button
  function clickForDetails(itemButton, item) {
    if (itemButton) {
      itemButton.addEventListener('click', () => {
        showModal(item);
      });
      /* eslint-disable no-console */
      console.log('yes, i work');
      /* eslint-disable no-console */
    } else {
      /* eslint-disable no-console */
      console.log('nope, somethings off');
      /* eslint-disable no-console */
    }
  }

  // create and append elements
  function addListItem(item) {
    // grab outer ul element
    const list = document.querySelector('.list-item-wrapper');

    // create li and button elements
    const listItem = document.createElement('li');
    const itemButton = document.createElement('button');

    // add class to li
    listItem.classList.add('group-list-item');
    listItem.classList.add('col-sm-6');
    listItem.classList.add('col-md-4');

    // add class, attributes, inner text to button
    itemButton.classList.add('btn');
    itemButton.classList.add('btn-primary');
    itemButton.type = 'button';
    itemButton.setAttribute('data-toggle', 'modal');
    itemButton.setAttribute('data-target', '#exampleModal');
    itemButton.innerText = item.name;

    // append both, li to ul and button to li
    list.appendChild(listItem);
    listItem.appendChild(itemButton);

    // call event handler on button
    clickForDetails(itemButton, item);
  }

  // fetch data from the API
  // add fetched items to pokemonList
  // use detailsUrl to load detailed data
  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((event) => {
        /* eslint-disable no-console */
        console.error(event);
        /* eslint-disable no-console */
      });
  }

  // fetch details
  /* eslint-disable no-param-reassign */
  function loadDetails(item) {
    const url = item.detailsUrl;

    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch((event) => {
        /* eslint-disable no-console */
        console.error(event);
        /* eslint-disable no-console */
      });
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showModal,
  };
})();

// loadList
// if success, getAll which is the pokemonList
// for each item, add item to pokemonList
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
