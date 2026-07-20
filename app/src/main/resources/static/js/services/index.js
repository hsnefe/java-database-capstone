import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';

const ADMIN_API = `${API_BASE_URL}/admin/login`;
const DOCTOR_API = `${API_BASE_URL}/doctor/login`;

window.onload = function () {
  document.getElementById('admin-btn')?.addEventListener('click', () => openModal('adminLogin'));
  document.getElementById('doctor-btn')?.addEventListener('click', () => openModal('doctorLogin'));
  document.getElementById('patient-btn')?.addEventListener('click', () => selectRole('patient'));
};

window.adminLoginHandler = async function () {
  try {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(ADMIN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      selectRole('admin');
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    alert('Login failed');
  }
};

window.doctorLoginHandler = async function () {
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      selectRole('doctor');
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    alert('Login failed');
  }
};
