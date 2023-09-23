export const getRecord = async (id: number) => {
  try {
    const url = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/records/${id}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(`Get record error: ${error}`);
  }
};
