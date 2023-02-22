let pokemonRepository = (function () {

  // empty array for incoming data
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30'; // TODO: change back to 150 items when necessary

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

  // adapt exercise modal to project modal
  function showModal(item) {

    pokemonRepository.loadDetails(item).then(function () {

      // grab modal-content to empty it
      let modalContent = $('.modal-content');
      // grab modal header, modal body elements via jquery
      let modalHeader = $('.modal-header');
      let modalBody = $('.modal-body');

      modalContent.val('');

      // create elements inside modal header
      let nameElement = $('<h2 class="headline-secondary">' + item.name + '</h2>');
      let closeButtonElement = $('<button type="button" class="close modal-close" data-dismiss="modal" aria-label="Close"></button>');
      let ariaButton = $('<span aria-hidden="true">' + '&times;' + '</span>');

      // create elements inside modal body
      let pokeLogo = $('<img class="poke-logo">').attr('src', 'img/svg-pokemon-logo.png');
      let nameDetail = $('<div class="modal-item__text">' + 'Name: ' + item.name + '</div>');
      let heightElement = $('<div class="modal-item__text">' + 'Height: ' + item.height + '</div>');
      let imageElement = $('<img class="modal-item__img">').attr('src', item.imageUrl);

      // loop over pokeTypes
      let pokeTypes = '';

      for (let i = 0; i < item.types.length; i++) {
        pokeTypes += item.types[i].type.name;
        if (i + 1 !== item.types.length) {
          pokeTypes += ', ';
        }
      };

      let typesElement = $('<div class="modal-item__types">' + 'Types: ' + pokeTypes + '</div>');

      modalHeader.append(nameElement);
      modalHeader.append(closeButtonElement);
      closeButtonElement.append(ariaButton);

      modalBody.append(pokeLogo);
      modalBody.append(nameDetail);
      modalBody.append(heightElement);
      modalBody.append(typesElement);
      modalBody.append(imageElement);
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