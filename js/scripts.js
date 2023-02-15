let pokemonRepository = (function () {
  let pokemonList = [];
  // TODO: change back to 150 items when necessary
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';
  let modalContainer = document.querySelector('#modal-container');

  // typeof check on what's given back by API
  // push single item to pokemonList array
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

  // get and return all items of pokemonList array
  function getAll() {
    return pokemonList;
  };

  // create and append
  function addListItem(item) {
    // grab outer ul element
    let list = document.querySelector('.pokemon-list');

    // create li and button elements
    let listItem = document.createElement('li');
    let itemButton = document.createElement('button');

    // add button class and button inner text
    itemButton.classList.add('list-item__button');
    itemButton.innerText = item.name;

    // call event handler
    addEl(itemButton, item);

    // append both, li to ul and button to li
    list.appendChild(listItem);
    listItem.appendChild(itemButton);
  };

  // event handler on button
  function addEl (itemButton, item) {
    if (itemButton) {
      itemButton.addEventListener('click', function() {
        showDetails(item);
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
        console.log(pokemon);
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (event) {
      console.error(event);
    });
  };

  // ADD EXERCISE MODAL HERE
  // TODO: figure out how to hand in an image
  function showModal(name, height, img) {

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('div');
    nameElement.innerText = name;

    let heightElement = document.createElement('div');
    heightElement.innerText = height;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', img);
    imageElement.setAttribute('width', '100');
    imageElement.setAttribute('height', '100');

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  };

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  };

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('todo pokename', 'todo pokeheight', 'todo pokeimage');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  // console.log pokemon details at button click
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  };

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails
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