//
// Instantiate the Authentication class with the web service endpoint
   const auth = new Authentication('https://example.com/auth');

   // Define performLogin in the global scope
   window.performLogin = async function () {
     const username = document.getElementById('username').value.trim();
     const password = document.getElementById('password').value.trim();

     // Check if username and password are not empty
     if (!username || !password) {
       alert('Username and password are required.');
       return;
     }

     try {
       // Attempt authentication
       const isAuthenticated = await auth.authenticate(username, password);

       // Authentication successful
       console.log('Authentication successful:', isAuthenticated);

       // Redirect to a dashboard or perform other actions on successful login
       // For simplicity, let's just log a success message in this example
       alert('Login successful!');
     } catch (error) {
       // Handle authentication errors
       console.error('Authentication error:', error.message);
       alert('Authentication failed. Please check your credentials.');
     }
   };

function test()
{
       const username = document.getElementById('username').value;
       const password = document.getElementById('password').value;
 	  alert('username' + username);
 	  alert('password' + password);
}