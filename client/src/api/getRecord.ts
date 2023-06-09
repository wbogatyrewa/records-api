export const getRecord = async (id: number) => {
  try {
    const url = `http://5.188.50.113:5000/api/records/${id}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(`Get record error: ${error}`)
  }
};