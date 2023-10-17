document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form');
    const tableBody = document.getElementById('table-body');
  
    fetch('http://localhost:3000/dogs')
      .then((response) => response.json())
      .then((dogs) => {
        dogs.forEach((dog) => renderDog(dog));
      });
  
    dogForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const dogId = dogForm.dataset.id; 
      const dogData = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value,
      };
  
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dogData),
      })
        .then((response) => response.json())
        .then((updatedDog) => {
          
          tableBody.innerHTML = '';
          fetch('http://localhost:3000/dogs')
            .then((response) => response.json())
            .then((dogs) => {
              dogs.forEach((dog) => renderDog(dog));
            });
     
          dogForm.reset();
        });
    });
  
    function renderDog(dog) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button></td>
      `;
      
      row.querySelector('button').addEventListener('click', () => {
        dogForm.dataset.id = dog.id;
        dogForm.name.value = dog.name;
        dogForm.breed.value = dog.breed;
        dogForm.sex.value = dog.sex;
      });
  
      tableBody.appendChild(row);
    }
  });