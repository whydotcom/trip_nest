// This makes the search update as the user types in the input field
document.getElementById('search-bar').addEventListener('input', searchCountries);

// This function fetches data from tripnest.json and finds any country names that include the input text
function searchCountries() {
  // Grabs what the user typed and makes it lowercase to match data more easily
  const input = document.getElementById('search-bar').value.toLowerCase();

  // This is where the search results will be shown
  const recommendationDiv = document.getElementById('recommendations');
  recommendationDiv.innerHTML = ''; // Clear previous results

    // If the input is empty, stop the function here and show nothing
    if (input.trim() === '') {
        return;
      }

  // Fetch the data from the JSON file
  fetch('tripnest.json')
    .then(response => response.json())
    .then(data => {
      // Looks through all the countries and keeps any that include the text typed by the user
      const matchedCountries = data.countries.filter(countries =>
        countries.name.toLowerCase().includes(input)
      );

      // If any matching countries were found, show their info
      if (matchedCountries.length > 0) {
        matchedCountries.forEach(countries => {

          // Show the country name
          recommendationDiv.innerHTML += `<h2>${countries.name}</h2>`;
   

          // Show the image (limited width so it's not too big)
          recommendationDiv.innerHTML += `<img src="${countries.imagesrc}" alt="${countries.name}" style="max-width: 200px;">`;

          // Show the description text
          recommendationDiv.innerHTML += `<p><strong>Description:</strong> ${countries.description}</p>`;
        });
      } else {
        // If nothing matched, tell the user
        recommendationDiv.innerHTML = 'No matches found.';
      }
    })
    .catch(error => {
      // Show error in case something goes wrong with the fetch
      console.error('Error:', error);
      recommendationDiv.innerHTML = 'An error occurred while fetching data.';
    });
}
