let pokemonRepository = (function () {

  // empty array for incoming data
  let pokemonList = [];
  // change limit to more items in case more are necessary
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';

  // typeof check on what's given back by API
  // push valid single item to pokemonList array
  function add(item) {
    if (
      typeof item === 'object' &&
      'name' in item &&
      'detailsUrl' in item
    ) {
      pokemonList.push(item);
    } else {
      console.log('Nope, not a valid Poke.');
    }
  };

  // get all items, return all items within pokemonList array
  function getAll() {
    return pokemonList;
  };

  // create and append elements
  function addListItem(item) {
    // grab outer ul element
    let list = document.querySelector('.list-item-wrapper');

    // create li and button elements
    let listItem = document.createElement('li');
    let itemButton = document.createElement('button');

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
  };

  // event handler on button
  function clickForDetails (itemButton, item) {
    if (itemButton) {
      itemButton.addEventListener('click', function() {
        showModal(item);
      });
      console.log('yes, i work');
    } else {
      console.log('nope, something\s off');
    }
  };

  // fetch data from the API
  // add fetched items to pokemonList
  // use detailsUrl to load detailed data
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (event) {
      console.error(event);
    });
  };

  // fetch details
  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (event) {
      console.error(event);
    });
  };

  // show Bootstrap modal; (only here) jQuery is used for the exercise
  function showModal(item) {

    pokemonRepository.loadDetails(item).then(function () {

      // grab modal-content to empty it
      let modalContent = $('.modal-content');
      // grab modal header, modal body
      let modalHeader = $('.modal-header');
      let modalBody = $('.modal-body');

      // empty modal header, modal body
      modalHeader.empty();
      modalBody.empty();

      modalContent.val('');

      // create elements inside modal header
      let closeButtonElement = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>');
      let ariaButton = $('<span aria-hidden="true">' + 'X' + '</span>');

      // create elements inside modal body
      let pokeIllu = $('<div class="modal-body__img-wrapper"></div>')
      let pokeLogo = $('<img class="modal-header__logo">').attr('src', 'src/img/svg-pokemon-logo.png');
      let pokeImage = $('<img class="modal-item__img" alt="">').attr('src', item.imageUrl);

      let pokeDetails = $('<div class="modal-body__details-wrapper"></div>')
      let pokeName = $('<h2 class="modal-body__headline headline-secondary">' + item.name + '</h2>');
      let pokeHeight = $('<p class="modal-body__item--height">' + '<b>Height: </b>' + item.height + '</p>');

      // loop over pokeTypes
      let pokeTypes = '';

      for (let i = 0; i < item.types.length; i++) {
        pokeTypes += item.types[i].type.name;
        if (i + 1 !== item.types.length) {
          pokeTypes += ', ';
        }
      };

      // create element for pokeTypes
      let typesElement = $('<p class="modal-body__item--types">' + '<b>Types: </b>' + pokeTypes + '</p>');

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
  };

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showModal
  };

})();

// loadList
// if success, getAll which is the pokemonList
// for each item, add item to pokemonList
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});