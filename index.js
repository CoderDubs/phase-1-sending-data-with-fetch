function submitData(name, email) {
  const data = { name, email };

  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      const contentType = response.headers.get('content-type');
      if (!contentType) {
        throw new Error('Response does not contain content-type header');
      }
      if (contentType.includes('application/json')) {
        return response.json();
      } else {
        throw new Error('Response not in JSON format');
      }
    })
    .then(function (responseData) {
      const newId = responseData.id;
      const domElement = document.createElement('p');
      domElement.textContent = `User ID: ${newId}`;
      document.body.appendChild(domElement);
      console.log(responseData);
    })
    .catch(function (error) {
      const errorElement = document.createElement('p');
      errorElement.textContent = error.message || 'Unauthorized Access';
      document.body.appendChild(errorElement);
      console.log('Fetch Error:', error.message);
    });
}
