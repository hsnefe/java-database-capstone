import { API_BASE_URL } from '../config/config.js';

const DOCTOR_API = `${API_BASE_URL}/doctor`;

export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    const data = await response.json();
    return data.doctors;
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
}

export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return { success: response.ok, message: data.message || 'Failed to delete doctor' };
  } catch (error) {
    console.error("Failed to delete doctor:", error);
    return { success: false, message: 'Failed to delete doctor' };
  }
}

export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message || 'Failed to save doctor' };
  } catch (error) {
    console.error("Failed to save doctor:", error);
    return { success: false, message: 'Failed to save doctor' };
  }
}

export async function filterDoctors(name, time, specialty) {
  try {
    const nameParam = name && name !== 'null' ? name : 'null';
    const timeParam = time && time !== 'null' ? time : 'null';
    const specialtyParam = specialty && specialty !== 'null' ? specialty : 'null';
    const response = await fetch(`${DOCTOR_API}/filter/${nameParam}/${timeParam}/${specialtyParam}`);

    if (response.ok) {
      return await response.json();
    }
    console.error("Failed to filter doctors:", response.statusText);
    return { doctors: [] };
  } catch (error) {
    console.error("Failed to filter doctors:", error);
    return { doctors: [] };
  }
}
