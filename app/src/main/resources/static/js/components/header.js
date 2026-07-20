function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  const isRoot =
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("/index.html");

  if (isRoot) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="/assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="/assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav>`;

  if (role === "admin") {
    headerContent += `<button id="addDocBtn" class="adminBtn">Add Doctor</button>`;
    headerContent += `<a href="#" id="logoutBtn">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `<button class="adminBtn" id="doctorHomeBtn">Home</button>`;
    headerContent += `<a href="#" id="logoutBtn">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `<button id="patientLogin" class="adminBtn">Login</button>`;
    headerContent += `<button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `<button id="home" class="adminBtn">Home</button>`;
    headerContent += `<button id="patientAppointments" class="adminBtn">Appointments</button>`;
    headerContent += `<a href="#" id="logoutPatientBtn">Logout</a>`;
  }

  headerContent += `</nav></header>`;
  headerDiv.innerHTML = headerContent;
  attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => {
      if (typeof openModal === "function") openModal("addDoctor");
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  const doctorHomeBtn = document.getElementById("doctorHomeBtn");
  if (doctorHomeBtn) {
    doctorHomeBtn.addEventListener("click", () => {
      if (typeof selectRole === "function") selectRole("doctor");
    });
  }

  const patientLogin = document.getElementById("patientLogin");
  if (patientLogin) {
    patientLogin.addEventListener("click", () => {
      if (typeof openModal === "function") openModal("patientLogin");
    });
  }

  const patientSignup = document.getElementById("patientSignup");
  if (patientSignup) {
    patientSignup.addEventListener("click", () => {
      if (typeof openModal === "function") openModal("patientSignup");
    });
  }

  const homeBtn = document.getElementById("home");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      window.location.href = token
        ? `/loggedPatientDashboard/${token}`
        : "/pages/patientDashboard.html";
    });
  }

  const appointmentsBtn = document.getElementById("patientAppointments");
  if (appointmentsBtn) {
    appointmentsBtn.addEventListener("click", () => {
      window.location.href = "/pages/patientAppointments.html";
    });
  }

  const logoutPatientBtn = document.getElementById("logoutPatientBtn");
  if (logoutPatientBtn) {
    logoutPatientBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logoutPatient();
    });
  }
}

function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.setItem("userRole", "patient");
  localStorage.removeItem("token");
  window.location.href = "/pages/patientDashboard.html";
}

renderHeader();
