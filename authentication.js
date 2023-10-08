// authentication.js

class Authentication
{
	constructor(endpoint) 
	{
    	this.endpoint = endpoint;
  	}

  	async authenticate(username, password)
    {
    // Sanitize username and password
    	const sanitizedUsername = username.trim();
    	const sanitizedPassword = password.trim();

    	try {
      // Check if the connection to the web service is alive
      	  await this.checkConnection();

      // Make an authentication request to the web service
      	const response = await fetch(`${this.endpoint}/authenticate`, {
        	method: 'POST',
        	headers: {
          	  'Content-Type': 'application/json',
        	},
        	body: JSON.stringify({
          	  username: sanitizedUsername,
          	  password: sanitizedPassword,
        	}),
      	});

      	if (!response.ok) {
        // Handle authentication failure
        	throw new Error('Authentication failed. Please check your credentials.');
      	}

      // Authentication successful
     	 return true;
     } 
	 catch (error) {
      // Handle web service connection failure or other errors
     	 console.error('Authentication error:', error.message);
      	throw new Error('Unable to authenticate. Please try again later.');
    }
  }

  async checkConnection() 
  {
    // Check if the connection to the web service is alive
    try {
      const response = await fetch(`${this.endpoint}/status`);
      if (!response.ok) {
        throw new Error('Web service connection failure.');
      }
    } catch (error) {
      // Handle connection failure
      console.error('Connection error:', error.message);
      throw new Error('Unable to connect to the web service.');
    }
  }
}
