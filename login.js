document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Perform client-side validation
  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Send the login data to the server
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      alert("Login successful!");
      window.location.href = "/index2.html"; // Redirect to index.html page
    } else {
      alert("Login failed. Please check your credentials and try again.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  });
});
