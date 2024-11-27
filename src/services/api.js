// const API_URL = "http://localhost:3000/cargo";

// export const getCargoList = async () => {
// 	const response = await fetch(API_URL);
// 	return response.json();
// };

// export const addCargo = async (cargo) => {
// 	const response = await fetch(API_URL, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(cargo),
// 	});
// 	return response.json();
// };

// export const updateCargo = async (id, updatedData) => {
// 	const response = await fetch(`http://localhost:3000/cargoList/${id}`, {
// 		method: "PATCH",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(updatedData),
// 	});
// 	return await response.json();
// };

// export const deleteCargo = async (id) => {
// 	await fetch(`${API_URL}/${id}`, { method: "DELETE" });
// };

const API_URL = "http://localhost:3000/cargo";

export const getCargoList = async () => {
	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error("Ошибка при получении списка грузов");
	}
	return await response.json();
};

export const addCargo = async (cargo) => {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(cargo),
	});
	if (!response.ok) {
		throw new Error("Ошибка при добавлении нового груза");
	}
	return await response.json();
};

export const updateCargo = async (id, updatedData) => {
	const response = await fetch(`http://localhost:3000/cargo/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedData),
	});
	return response.json();
};

export const deleteCargo = async (id) => {
	const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
	if (!response.ok) {
		throw new Error("Ошибка при удалении груза");
	}
};
