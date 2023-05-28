export const signin = async (name: string, password: string) => {
  try {
    const url = 'http://5.188.50.113:5000/api/users/login';
    const user = {
      name: name,
      password: password
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (error) {
    console.log(`signin error: ${error}`)
  }
};