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
    let list = document.querySelector('.pokemon-list');

    // create li and button elements
    let listItem = document.createElement('li');
    let itemButton = document.createElement('button');

    // add class to li
    listItem.classList.add('group-list-item', 'list-item');

    // add class, attributes, inner text to button
    itemButton.classList.add('btn', 'btn-primary', 'list-item__button');
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

      // modal - grab only present HTML element via jquery
      let modalContainer = $('.modal-content');

      // empty element
      modalContainer.empty();

      modalContainer.val('');
      // modalContainer.innerHTML = '';

      // create modal header, modal body, modal footer elements via jquery
      let modalHeader = $('<div class="modal-header"></div>');
      let modalBody = $('<div class="modal-body"></div>');
      let modalFooter = $('<div class="modal-footer"></div>');

      // create elements inside modal header
      let nameElement = $('<h2 class="headline-secondary">' + item.name + '</h2>');
      let closeButtonElement = $('<button type="button" class="close modal-close" data-dismiss="modal" aria-label="Close">Close</button>');
      // closeButtonElement.on('click', hideModal);
      let ariaButton = $('<span aria-hidden="true">' + '&times;' + '</span>');

      // create elements inside modal body
      let pokeLogo = $('<img class="poke-logo">').attr('src', 'img/svg-pokemon-logo.png');
      let nameDetail = $('<div class="modal-item__text">' + 'Name: ' + item.name + '</div>');
      let heightElement = $('<div class="modal-item__text">' + 'Height: ' + item.height + '</div>');
      let imageElement = $('<img class="modal-item__img">').attr('src', item.imageUrl);

      // create elements inside modal footer
      let closeButtonFooterOne = $('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
      let closeButtonFooterTwo = $('<button type="button" class="btn btn-primary">Save changes</button>')

      // let modal = $('<div class="modal"></div>');
      // let modal = document.createElement('div');
      // modal.classList.add('modal');
      // let closeButtonElement = document.createElement('button');
      // closeButtonElement.classList.add('modal-close');
      // closeButtonElement.innerText = 'Close';
      // closeButtonElement.addEventListener('click', hideModal);
      // let pokeLogo = document.createElement('img');
      // pokeLogo.src = 'img/svg-pokemon-logo.png';
      // pokeLogo.classList.add('poke-logo');
      // let imageElement = document.createElement('img');
      // imageElement.setAttribute('src', item.imageUrl);
      // imageElement.classList.add('modal-item__img');
      // let nameElement = document.createElement('h2');
      // nameElement.classList.add('headline-secondary');
      // nameElement.innerText = 'Name: ' + item.name;
      // let heightElement = document.createElement('div');
      // heightElement.classList.add('modal-item__text');
      // heightElement.innerText = 'Height: ' + item.height;

      // loop over pokeTypes
      let pokeTypes = '';

      for (let i = 0; i < item.types.length; i++) {
        pokeTypes += item.types[i].type.name;
        if (i + 1 !== item.types.length) {
          pokeTypes += ', ';
        }
      };

      let typesElement = $('<div class="modal-item__types">' + 'Types: ' + pokeTypes + '</div>');

      // let typesElement = document.createElement('div');
      // typesElement.classList.add('modal-item__types');
      // typesElement.innerText = 'Types: ' + pokeTypes;

      // bring everything together
      modalContainer.append(modalHeader);
      modalContainer.append(modalBody);
      modalContainer.append(modalFooter);

      modalHeader.append(nameElement);
      modalHeader.append(closeButtonElement);
      closeButtonElement.append(ariaButton);

      modalBody.append(pokeLogo);
      modalBody.append(nameDetail);
      modalBody.append(heightElement);
      modalBody.append(typesElement);
      modalBody.append(imageElement);

      modalFooter.append(closeButtonFooterOne);
      modalFooter.append(closeButtonFooterTwo);

      // modalContainer.appendChild(modal);
      // modal.appendChild(pokeLogo);
      // modal.appendChild(nameElement);
      // modal.appendChild(heightElement);
      // modal.appendChild(typesElement);
      // modal.appendChild(imageElement);
      // modal.appendChild(closeButtonElement);

      // modalContainer.classList.add('is-visible');

      // function hideModal() {
      //   modalContainer.classList.remove('is-visible');
      // };

      // window.addEventListener('keydown', (e) => {
      //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      //     hideModal();
      //   }
      // });

      // modalContainer.addEventListener('click', (e) => {
      //   let target = e.target;
      //   if (target === modalContainer) {
      //     hideModal();
      //   }
      // });

      // document.querySelector('button').addEventListener('click', () => {
      //   showModal();
      // });
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