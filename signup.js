document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  // Perform client-side validation
  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Send the signup data to the server
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => {
    if (response.ok) {
      alert("Signup successful!");
      window.location.href = "/login.html"; // Redirect to login page
    } else {
      alert("Signup failed. Please try again.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  });
});