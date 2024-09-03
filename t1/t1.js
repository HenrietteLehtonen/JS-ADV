'use strict';

import {restaurantRow} from './components.js';
import {restaurantModal} from './components.js';
import {fetchData} from './fetchData.js';
import {apiURL} from './variables.js';

const kohde = document.querySelector('tbody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', () => {
  modaali.close();
});
// closeModal.addEventListener('click', function () {
//   modaali.close();
// });

// async sulkeiden vasemmalle puolelle!

// RAVINTOLALISTA

const teeRavintolaLista = async () => {
  // hakee ravintolat apinURLista
  const restaurants = await fetchData(apiURL + '/api/v1/restaurants');

  // järjestää ravintolat aakkosjärjestykseen
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  console.log(restaurants);

  // --------- HAETAAN RAVINTOLAT ---------
  for (const restaurant of restaurants) {
    if (restaurant) {
      // destrukturointi
      const {name, address, _id, company, postalCode, city, phone} = restaurant;

      // ----------- RIVIT ravintoloille  -------------
      // tehdään rivi, joka kutsuu komponenttia restaurantROW(restaurant) parametrillä
      // --> lisätään HTML rivi
      const rivi = restaurantRow(restaurant);

      // -------- RIVI CLICK ------------
      rivi.addEventListener('click', async () => {
        // hae päivän ruokalista apiURL, kun klikataan tiettyä ravintolaa (+ endpoint)
        const menu = await fetchData(
          apiURL + `/api/v1/restaurants/daily/${_id}/fi`
        );
        console.log('Menu nouto: ', menu);

        // higlight riveille klikkauksesta
        const korostetut = document.querySelectorAll('.highlight');
        for (const korostettu of korostetut) {
          korostettu.classList.remove('highlight');
        }
        rivi.classList.add('highlight');

        // ---------- Tulostaa päivän ruokalista -------------
        // haetaan html komponenteista
        const ravintolaHTML = restaurantModal(restaurant, menu.courses);

        // modaali esiin klikkauksesta
        modaali.showModal();

        // tyhjennetään edellisen koodi, jos on
        info.innerHTML = '';
        // lisää HTML info
        info.insertAdjacentHTML('beforeend', ravintolaHTML);
      });

      kohde.append(rivi);
    }
  }
};

teeRavintolaLista();

const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  10
);

console.log(sum);
