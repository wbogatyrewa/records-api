export const deleteRecord = async (id: number, token: string) => {
  try {
    const url = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/records/delete/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
    });
    if (response.status === 401) return alert("You cannot delete this record");
    return await response.json();
  } catch (error) {}
};
