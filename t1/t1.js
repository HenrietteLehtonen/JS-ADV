'use strict';

import {restaurantRow} from './components.js';
import {restaurantModal} from './components.js';
import {fetchData} from './fetchData.js';
import {apiURL} from './variables.js';

const kohde = document.querySelector('tbody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');
const sodexoBtn = document.querySelector('#sodexo-btn');
const compassBtn = document.querySelector('#compass-btn');
const resetoBtn = document.querySelector('#reset-btn');

// ------------- CLICK BTN ---------------

// sulje modaali
closeModal.addEventListener('click', () => {
  modaali.close();
});

// RAVINTOLALISTA

const haeRavintolat = async () => {
  // hakee ravintolat apinURLista
  return await fetchData(apiURL + '/api/v1/restaurants');
};

// ------- TEE RAVINTOLAT

const teeRavintolaLista = async (restaurants) => {
  kohde.innerHTML = '';

  // ------ BTN SODEXO & COMPASS & RESET -------

  sodexoBtn.addEventListener('click', () => {
    const filteredRest = restaurants.filter((restaurant) => {
      if (restaurant.company === 'Sodexo') {
        return true;
        //(restaurant) => return restaurant.company === 'Sodexo'
      }
    });
    teeRavintolaLista(filteredRest);
  });

  compassBtn.addEventListener('click', () => {
    const filteredRest = restaurants.filter((restaurant) => {
      if (restaurant.company === 'Compass Group') {
        return true;
      }
    });
    teeRavintolaLista(filteredRest);
  });

  resetoBtn.addEventListener('click', () => {
    return teeRavintolaLista(raflat);
  });

  // järjestää ravintolat aakkosjärjestykseen
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  console.log(restaurants);

  // --------- HAETAAN RAVINTOLAT ---------
  // for (const restaurant of restaurants)
  restaurants.forEach((restaurant) => {
    if (restaurant) {
      // destrukturointi
      const {name, address, _id, company, postalCode, city, phone} = restaurant;

      // ----------- RIVIT ravintoloille  -------------

      // tehdään rivi, joka kutsuu komponenttia restaurantROW(restaurant)
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

        korostetut.forEach((korostettu) => {
          korostettu.classList.remove('highlight');
        });

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
  });
};

const raflat = await haeRavintolat();
teeRavintolaLista(raflat);
