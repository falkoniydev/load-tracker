import React, { useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AddCargo from "./components/AddCargo";
import CargoTable from "./components/CargoTable";
import { getCargoList } from "./services/api";

function App() {
	const [cargoList, setCargoList] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);

	useEffect(() => {
		fetchCargoList();
	}, []);

	const fetchCargoList = async () => {
		const data = await getCargoList();
		setCargoList(data);
	};

	return (
		<div className="container">
			<h1 className="text-center mb-4">Отслеживание грузов</h1>

			<Button
				variant="primary"
				onClick={() => setShowAddModal(true)}
				className="mb-3"
			>
				Добавить груз
			</Button>

			{/* Yuklar ro‘yxati */}
			<CargoTable
				cargoList={cargoList}
				setCargoList={setCargoList}
			/>

			{/* Yangi yuk qo‘shish modal */}
			<AddCargo
				show={showAddModal}
				onHide={() => setShowAddModal(false)}
				setCargoList={setCargoList}
			/>
		</div>
	);
}

export default App;
