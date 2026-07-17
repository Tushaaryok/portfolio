const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.innerHTML = "Sending...";

  const data = {
    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    subject: document.getElementById("subject").value,

    message: document.getElementById("message").value,
  };

  try {
    const response = await fetch("http://localhost:5000/send", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      status.style.color = "green";
      status.innerHTML = "✅ Message Sent Successfully";

      form.reset();
    } else {
      status.style.color = "red";
      status.innerHTML = "❌ Failed to Send";
    }
  } catch {
    status.style.color = "red";
    status.innerHTML = "❌ Server Error";
  }
});
