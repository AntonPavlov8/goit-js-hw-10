import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const userInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

userInput.addEventListener(
  'input',
  debounce(e => {
    if (!userInput.value.trim()) {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    }
    const input = e.target.value.trim();

    if (input) {
      fetchCountries(input)
        .then(data => {
          const x = data.length;
          if (x > 10) {
            console.log('10+');
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (x > 1 && x < 11) {
            console.log('1-10');
            const fragment = document.createDocumentFragment();
            data.forEach(country => {
              const li = document.createElement('li');
              li.className = 'listItem';
              li.innerHTML = `
            <img src="${country.flags.png}">
            ${country.name.common}`;
              fragment.appendChild(li);
            });
            countryInfo.innerHTML = '';
            countryList.innerHTML = '';
            countryList.append(fragment);
          } else if (x === 1) {
            console.log('1');
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            const country = data[0];
            let languages = '';
            for (key in country.languages) {
              languages = languages + country.languages[key] + ', ';
            }
            languages = languages.slice(0, languages.length - 2);
            countryInfo.innerHTML = `

            <p class="countryName">
            <img class="flag" src="${country.flags.png}"/>
            ${country.name.official}</p>
            <p class="info"><b>Capital:</b> ${country.capital}</p>
            <p class="info"><b>Population:</b> ${country.population}</p>
            <p class="info"><b>Languages:</b> ${languages}</p>
            `;
          }
        })
        .catch(er => {
          console.log('err');
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
  }, DEBOUNCE_DELAY)
);
