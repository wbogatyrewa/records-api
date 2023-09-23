export const addRecords = async (formData: FormData, token: string) => {
  try {
    const url = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/records/add`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: formData,
    });
    return await response.json();
  } catch (error) {}
};
