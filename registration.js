// registration.js

class Registration {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async register(username, password, email) {
    // Sanitize input
    const sanitizedUsername = this.sanitizeInput(username);
    const sanitizedPassword = this.sanitizeInput(password);
    const sanitizedEmail = this.sanitizeInput(email);

    // Check if inputs are not empty
    if (!sanitizedUsername || !sanitizedPassword || !sanitizedEmail) {
	  alert('Username, password, and email are required.');
      throw new Error('Username, password, and email are required.');
    }

    // Validate email address
    if (!this.isValidEmail(sanitizedEmail)) {
	  alert('Invalid email address.');
      throw new Error('Invalid email address.');
    }

    // Validate password
    if (!this.isValidPassword(sanitizedPassword)) {
	  alert('Password should contain alphanumeric characters and be at least 7 characters long.');
      throw new Error('Password should contain alphanumeric characters and be at least 7 characters long.');
    }

    try {
      // Check if the web service is alive
      await this.checkWebService();

      // Perform registration (replace this with your actual registration logic)
      const registrationData = {
        username: sanitizedUsername,
        password: sanitizedPassword,
        email: sanitizedEmail,
      };

      // Replace the following line with your actual registration API call
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
		alert('Registration failed.');
        throw new Error('Registration failed.');
      }

      // Registration successful
      this.showSuccessMessage();
    } catch (error) {
      // Handle errors
      console.error('Registration error:', error.message);
      throw error;
    }
  }

  showSuccessMessage() {
    const successMessage = document.createElement('p');
    successMessage.innerHTML = 'Registration successful! <a href="/login">Click here to redirect to login page</a>';
    document.getElementById('app').appendChild(successMessage);

    // Redirect to login page when the link is clicked
    successMessage.querySelector('a').addEventListener('click', () => {
      window.location.href = '/login'; // Replace '/login' with your actual login page URL
    });
  }

  sanitizeInput(input) {
    // Implement your input sanitization logic here
    // For simplicity, this example trims leading and trailing whitespaces
    return input.trim();
  }

  isValidEmail(email) {
    // Implement email validation logic
    // For simplicity, this example uses a basic regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password) {
    // Password should contain alphanumeric characters and be at least 7 characters long
    const passwordRegex = /^(?=.*[0-9a-zA-Z]).{7,}$/;
    return passwordRegex.test(password);
  }

  async checkWebService() {
    // Check if the web service is alive (replace this with your actual health check logic)
    try {
      const response = await fetch(this.endpoint);
      if (!response.ok) {
        throw new Error('Web service is not reachable.');
      }
    } catch (error) {
      throw new Error('Web service is not reachable.');
    }
  }
}

// Example usage:

// Instantiate the Registration class with the registration web service endpoint
const registration = new Registration('https://example.com/register');




function submitForm() 
{
     // You can implement your form submission logic here
     // For simplicity, this example just logs the form data
     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;
     const email = document.getElementById('email').value;
	 try {
	   registration.register(username, password, email);
	 } catch (error) {
	   // Handle registration errors
	   console.error('Registration failed:', error.message);
	 }

     console.log('Username:', username);
     console.log('Password:', password);
     console.log('Email:', email);

}