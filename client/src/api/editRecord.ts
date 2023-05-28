export const editRecord = async (id: number, formData: FormData, token: string) => {
  try {
    const url = `http://localhost:5000/api/records/edit/${id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData
    });    
    if (response.status === 401) return alert('You are not the author');
    return await response.json();;
  } catch (error) {
  }
};