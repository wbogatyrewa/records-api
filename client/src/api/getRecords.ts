export const getRecords = async (page: number) => {
  try {
    const url = `http://5.188.50.113:5000/api/records/?page=${page}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(`Get records error: ${error}`)
  }
};