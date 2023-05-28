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
    return await response.json();
  } catch (error) {
    
  }
};