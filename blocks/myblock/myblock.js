/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
export default function decorate(block) {
  block.textContent = 'Hello from myblock';
  function displayTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });
    let timeDiv1 = document.getElementById('time1');
    if (!timeDiv1) {
      timeDiv1 = document.createElement('div');
      timeDiv1.id = 'time1';
      block.appendChild(timeDiv1);
    }
    timeDiv1.textContent = `Current AU time: ${timeString}`;

    const timeString2 = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    let timeDiv2 = document.getElementById('time2');
    if (!timeDiv2) {
      timeDiv2 = document.createElement('div');
      timeDiv2.id = 'time2';
      block.appendChild(timeDiv2);
    }
    timeDiv2.textContent = `Current IN time: ${timeString2}`;
  }

  setInterval(displayTime, 1000);

  const weatherButton = document.createElement('button');
  weatherButton.id = 'weather-click';
  block.appendChild(weatherButton);
  weatherButton.textContent = 'Click me';

  weatherButton.addEventListener('click', (e) => {
    weatherButton.disabled = true;
    console.log('clicked');
    fetch('https://sn8083.github.io/api/au.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Create filter dropdown
        const filterDiv = document.createElement('div');
        const filterLabel = document.createElement('label');
        filterLabel.textContent = 'Filter by Admin Name: ';
        const filterSelect = document.createElement('select');
        filterSelect.id = 'adminFilter';
        filterSelect.innerHTML = '<option value="">All</option>';
        const adminNames = [...new Set(data.map((item) => item.admin_name))];
        adminNames.forEach((adminName) => {
          const option = document.createElement('option');
          option.value = adminName;
          option.textContent = adminName;
          filterSelect.appendChild(option);
        });
        filterDiv.appendChild(filterLabel);
        filterDiv.appendChild(filterSelect);
        weatherButton.after(filterDiv);

        // Create search field
        const searchDiv = document.createElement('div');
        const searchLabel = document.createElement('label');
        searchLabel.textContent = 'Search: ';
        const searchInput = document.createElement('input');
        searchInput.id = 'searchInput';
        searchInput.type = 'text';
        searchDiv.appendChild(searchLabel);
        searchDiv.appendChild(searchInput);
        weatherButton.after(searchDiv);

        searchInput.addEventListener('input', () => {
          const query = searchInput.value.toLowerCase();
          const suggestions = data.filter((item) => item.city.toLowerCase().includes(query));
          showSuggestions(suggestions);
          filterResults(suggestions);
        });

        function showSuggestions(suggestions) {
          let suggestionDiv = document.getElementById('suggestions');
          if (!suggestionDiv) {
            suggestionDiv = document.createElement('div');
            suggestionDiv.id = 'suggestions';
            searchDiv.appendChild(suggestionDiv);
          }
          suggestionDiv.innerHTML = '';
          suggestions.forEach((suggestion) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = suggestion.city;
            suggestionItem.addEventListener('click', () => {
              searchInput.value = suggestion.city;
              suggestionDiv.innerHTML = '';
              filterResults([suggestion]);
            });
            suggestionDiv.appendChild(suggestionItem);
          });
        }

        function filterResults(filteredData) {
          const cards = cardRowDiv.getElementsByClassName('column');
          for (const card of cards) {
            const city = card.querySelector('.cardDetails h3').textContent;
            if (filteredData.some((item) => item.city === city)) {
              card.style.display = '';
              card.classList.remove('fade-in'); // Remove animation class
              void card.offsetWidth; // Trigger reflow
              card.classList.add('fade-in');
            } else {
              card.style.display = 'none';
            }
          }
        }

        let cardRowDiv = document.createElement('div');
        cardRowDiv.className = 'row';
        data.forEach((element) => {
          const cardDiv = document.createElement('div');
          cardDiv.className = 'column';
          cardDiv.dataset.adminName = element.admin_name;
          const imageElement = document.createElement('img');
          imageElement.src = mapsSvg[element.admin_name];
          imageElement.style.width = '100%';
          cardDiv.appendChild(imageElement);
          const div = document.createElement('div');
          div.className = 'cardDetails';
          div.innerHTML += `<h3 class="city">${element.city}</h3>`;
          div.innerHTML += `<p class="lat">${element.lat}</p>`;
          div.innerHTML += `<p class="lng">${element.lng}</p>`;
          div.innerHTML += `<p class="state">${element.admin_name}</p>`;
          cardDiv.appendChild(div);
          cardDiv.classList.add('fade-in'); // Add animation class
          cardDiv.addEventListener('click', (e) => {
            openModal(e);
          });
          cardRowDiv.appendChild(cardDiv);
        });
        filterSelect.after(cardRowDiv);
        filterSelect.addEventListener('change', () => {
          const selectedAdminName = filterSelect.value;
          for (const card of cards) {
            if (selectedAdminName === '' || card.dataset.adminName === selectedAdminName) {
              card.style.display = '';
              card.classList.remove('fade-in'); // Remove animation class
              void card.offsetWidth; // Trigger reflow
              card.classList.add('fade-in');
            } else {
              card.style.display = 'none';
            }
          }
        });
      })
      .catch((error) => console.error('Error fetching Cities:', error));
  });
}

const mapsSvg = {
  'New South Wales': 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-NSW.svg',
  Victoria: 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-VIC.svg',
  Queensland: 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-QLD.svg',
  'South Australia': 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-SA.svg',
  'Western Australia': 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-WA.svg',
  Tasmania: 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-TAS.svg',
  'Australian Capital Territory': 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-ACT.svg',
  'Northern Territory': 'https://www.bingle.com.au/etc.clientlibs/suncorp-clientlibs/styles/bingle/sg_bingle/resources/img/Icon-NT.svg',
};
