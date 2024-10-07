document.getElementById("joinUsForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email=document.getElementById("email").value;
  const address=document.getElementById("address").value;
  const foi=document.getElementById("foi").value;
  const ay=document.getElementById("ay").value;
  
  // Perform client-side validation
  if (!name|| !age || !email || !address || !foi || !ay) {
    alert("Please fill in all fields.");
    return;
  }

  // Send the join data to the server
  fetch("/joinus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, age, email, address, foi, ay })
  })
  .then(response => {
    if (response.ok) {
      alert("Details entered successfully!");
      window.location.href = "/joinus.html"; // Redirect to index.html page
    } else {
      alert("Joining failed. Please check your credentials and try again.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  });
});
