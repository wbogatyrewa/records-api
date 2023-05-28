export const addRecords = async (formData: FormData, token: string) => {
  try {
    const url = 'http://5.188.50.113:5000/api/records/add';
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