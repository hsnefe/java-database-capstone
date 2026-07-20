import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

document.addEventListener('DOMContentLoaded', () => {
  const addDocBtn = document.getElementById('addDocBtn');
  if (addDocBtn) {
    addDocBtn.addEventListener('click', () => openModal('addDoctor'));
  }

  document.getElementById('searchBar')?.addEventListener('input', filterDoctorsOnChange);
  document.getElementById('filterTime')?.addEventListener('change', filterDoctorsOnChange);
  document.getElementById('filterSpecialty')?.addEventListener('change', filterDoctorsOnChange);

  loadDoctorCards();
});

function loadDoctorCards() {
  getDoctors()
    .then((doctors) => {
      renderDoctorCards(doctors || []);
    })
    .catch((error) => {
      console.error('Failed to load doctor cards:', error);
      alert('Failed to load doctor cards');
    });
}

function filterDoctorsOnChange() {
  const searchValue = document.getElementById('searchBar').value.trim();
  const timeValue = document.getElementById('filterTime').value;
  const specialtyValue = document.getElementById('filterSpecialty').value;

  const name = searchValue.length > 0 ? searchValue : null;
  const time = timeValue.length > 0 ? timeValue : null;
  const specialty = specialtyValue.length > 0 ? specialtyValue : null;

  filterDoctors(name, time, specialty)
    .then((response) => {
      const doctors = response.doctors || [];
      if (doctors.length > 0) {
        renderDoctorCards(doctors);
      } else {
        document.getElementById('content').innerHTML =
          '<p>No doctors found with the given filters.</p>';
      }
    })
    .catch((error) => {
      console.error('Failed to filter doctors:', error);
      alert('Failed to filter doctors');
    });
}

function renderDoctorCards(doctors) {
  const content = document.getElementById('content');
  content.innerHTML = '';
  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    content.appendChild(card);
  });
}

window.adminAddDoctor = async function () {
  const name = document.getElementById('doctorName')?.value.trim();
  const email = document.getElementById('doctorEmail')?.value.trim();
  const phone = document.getElementById('doctorPhone')?.value.trim();
  const password = document.getElementById('doctorPassword')?.value.trim();
  const specialty = document.getElementById('specialization')?.value.trim();
  const availableTimes = Array.from(
    document.querySelectorAll('input[name="availability"]:checked')
  ).map((checkbox) => checkbox.value);

  if (!name || !email || !phone || !password || !specialty) {
    alert('Please fill in all fields.');
    return;
  }

  if (availableTimes.length === 0) {
    alert('Please select at least one availability slot.');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Session expired. Please log in again.');
    window.location.href = '/';
    return;
  }

  const doctor = { name, email, phone, password, specialty, availableTimes };
  const { success, message } = await saveDoctor(doctor, token);

  if (success) {
    alert(message || 'Doctor added successfully!');
    document.getElementById('modal').style.display = 'none';
    loadDoctorCards();
  } else {
    alert(message || 'Failed to add doctor');
  }
};
