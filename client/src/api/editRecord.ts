export const editRecord = async (
  id: number,
  formData: FormData,
  token: string
) => {
  try {
    const url = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/records/edit/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: formData,
    });
    if (response.status === 401) return alert("You are not the author");
    return await response.json();
  } catch (error) {}
};
