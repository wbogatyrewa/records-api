export const getRecords = async (page: number) => {
  try {
    const url = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/records/?page=${page}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(`Get records error: ${error}`);
  }
};
