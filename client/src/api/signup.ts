export const signup = async (name: string, password: string) => {
  try {
    const url = 'http://localhost:5000/api/users/signup';
    const user = {
      'name': name,
      'password': password
    };
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await response.status;
  } catch (error) {
    console.log(`signup error: ${error}`)
  }
};