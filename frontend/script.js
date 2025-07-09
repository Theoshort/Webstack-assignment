let staffData = [];

async function fetchStaff() {
  // Get staff info from your backend API
  const res = await fetch('http://127.0.0.1:5000/staff');
  const staff = await res.json();

  // Get randomuser.me data for photos (one photo per staff)
  const photosRes = await fetch(`https://randomuser.me/api/?results=${staff.length}`);
  const photosData = await photosRes.json();

  // Combine staff info with photos
  staffData = staff.map((person, i) => ({
    ...person,
    photo: photosData.results[i].picture.medium
  }));

  renderStaffCards(staffData);
}

function renderStaffCards(staffList) {
  const container = document.getElementById('staff-container');
  container.innerHTML = '';

  if (staffList.length === 0) {
    container.innerHTML = '<p>No matching staff found.</p>';
    return;
  }

  staffList.forEach(staff => {
    const card = document.createElement('div');
    card.className = 'col-md-4';

    card.innerHTML = `
      <div class="card h-100">
        <img src="${staff.photo}" class="card-img-top" alt="${staff.name}" />
        <div class="card-body">
          <h5 class="card-title">${staff.name}</h5>
          <p class="card-text"><strong>Title:</strong> ${staff.title}</p>
          <p class="card-text"><strong>Research Area:</strong> ${staff.area}</p>
          <p class="card-text"><strong>Email:</strong> ${staff.email}</p>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  const filtered = staffData.filter(person =>
    person.name.toLowerCase().includes(query) ||
    person.title.toLowerCase().includes(query) ||
    person.area.toLowerCase().includes(query)
  );

  renderStaffCards(filtered);
});

// Load data on page load
fetchStaff();
