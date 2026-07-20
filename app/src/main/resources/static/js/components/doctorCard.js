import { showBookingOverlay } from './bookingOverlay.js';
import { deleteDoctor } from '../services/doctorServices.js';
import { getPatientData } from '../services/patientServices.js';

export function createDoctorCard(doctor) {
  const card = document.createElement('div');
  card.classList.add('doctor-card');

  const role = localStorage.getItem("userRole");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialty = document.createElement("p");
  specialty.textContent = `Specialty: ${doctor.specialty}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const timesList = document.createElement("ul");
  timesList.classList.add("available-times");
  (doctor.availableTimes || []).forEach((time) => {
    const li = document.createElement("li");
    li.textContent = time;
    timesList.appendChild(li);
  });

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialty);
  infoDiv.appendChild(email);
  infoDiv.appendChild(timesList);

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  if (role === "admin") {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      const { success, message } = await deleteDoctor(doctor.id, token);
      if (success) {
        alert("Doctor deleted successfully");
        card.remove();
      } else {
        alert("Error while deleting doctor: " + message);
      }
    });
    actionsDiv.appendChild(deleteBtn);
  } else if (role === "patient") {
    const bookNowBtn = document.createElement("button");
    bookNowBtn.textContent = "Book Now";
    bookNowBtn.addEventListener("click", () => {
      alert("Patient needs to login first.");
    });
    actionsDiv.appendChild(bookNowBtn);
  } else if (role === "loggedPatient") {
    const bookNowBtn = document.createElement("button");
    bookNowBtn.textContent = "Book Now";
    bookNowBtn.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/pages/patientDashboard.html";
        return;
      }
      const patientData = await getPatientData(token);
      showBookingOverlay(e, doctor, patientData);
    });
    actionsDiv.appendChild(bookNowBtn);
  }

  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);
  return card;
}
