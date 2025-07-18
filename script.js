// script.js
let clickCounter = 0;
const clickCountDisplay = document.getElementById("clickCount");
const whatsappBtn = document.getElementById("whatsappBtn");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");

const scriptURL ='https://script.google.com/macros/s/AKfycby58hO-qYRP4gKM_MzUptKK1YeVxY0Iycr_-HE2uLKjnuPSpW_64mOU08dSX--Ay2D0/exec';
if (localStorage.getItem("submitted") === "true") {
  form.classList.add("hidden");
  successMsg.classList.remove("hidden");
}

whatsappBtn.addEventListener("click", () => {
  if (clickCounter < 5) {
    clickCounter++;
    clickCountDisplay.innerText = `Click count: ${clickCounter}/5`;

    const text = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const link = `https://wa.me/?text=${text}`;
    window.open(link, '_blank');
  }

  if (clickCounter >= 5) {
    whatsappBtn.disabled = true;
    clickCountDisplay.innerText = "Sharing complete. Please continue.";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCounter < 5) {
    alert("Please complete WhatsApp sharing first.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  const formData = new FormData();
  formData.append("Name", name);
  formData.append("Phone", phone);
  formData.append("Email", email);
  formData.append("College", college);
  formData.append("File", file);

  await fetch(scriptURL, { method: "POST", body: formData });

  localStorage.setItem("submitted", "true");
  form.reset();
  form.classList.add("hidden");
  successMsg.classList.remove("hidden");
});
async function submitForm() {
  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing (5 times) before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const screenshot = document.getElementById("screenshot").files[0];

  // Upload screenshot to a temporary hosting service like imgbb or Firebase (or use file name for now)
  const screenshotURL = screenshot.name; // optional: replace with actual upload URL

  const payload = {
    name,
    phone,
    email,
    college,
    screenshotURL
  };

  try {
    const response = await fetch('YOUR_WEB_APP_URL_HERE', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      document.getElementById("registration-form").reset();
      document.getElementById("form-area").innerHTML =
        `<p>🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!</p>`;
      localStorage.setItem("hasSubmitted", "true");
    }
  } catch (error) {
    console.error("Error submitting form: ", error);
    alert("There was an error. Please try again.");
  }
}
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      successMsg.style.display = "block";
      form.style.display = "none"; // hide form after submission

      // Optional: Reload after 5 seconds
      setTimeout(() => {
        form.reset();
        form.style.display = "block";
        successMsg.style.display = "none";
      }, 5000); // 5 sec delay
    })
    .catch(error => console.error('Error!', error.message));
});
