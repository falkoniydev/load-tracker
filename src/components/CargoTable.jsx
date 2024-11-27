// import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import { deleteCargo, updateCargo } from "../services/api";
// import EditCargo from "./EditCargo"; // Edit komponentini import qilish

// function CargoTable({ cargoList, setCargoList }) {
// 	const [showDeleteModal, setShowDeleteModal] = useState(false);
// 	const [showEditModal, setShowEditModal] = useState(false);
// 	const [selectedCargo, setSelectedCargo] = useState(null);
// 	const [filterStatus, setFilterStatus] = useState(""); // Filtrlangan status

// 	const handleDelete = async () => {
// 		await deleteCargo(selectedCargo.id);
// 		setCargoList((prevList) =>
// 			prevList.filter((cargo) => cargo.id !== selectedCargo.id)
// 		);
// 		setShowDeleteModal(false);
// 		toast.success("Груз успешно удален!");
// 	};

// 	const handleStatusChange = async (id, newStatus) => {
// 		const updatedCargo = await updateCargo(id, { status: newStatus });
// 		setCargoList((prevList) =>
// 			prevList.map((cargo) => (cargo.id === id ? updatedCargo : cargo))
// 		);
// 		toast.info("Статус груза обновлен!");
// 	};

// 	const handleEdit = (cargo) => {
// 		setSelectedCargo(cargo);
// 		setShowEditModal(true);
// 	};

// 	const filteredCargoList = filterStatus
// 		? cargoList.filter((cargo) => cargo.status === filterStatus)
// 		: cargoList;

// 	return (
// 		<>
// 			{/* Status filtr */}
// 			<Form.Select
// 				className="mb-3"
// 				value={filterStatus}
// 				onChange={(e) => setFilterStatus(e.target.value)}
// 			>
// 				<option value="">Все грузы</option>
// 				<option value="Ожидает отправки">Ожидает отправки</option>
// 				<option value="В пути">В пути</option>
// 				<option value="Доставлен">Доставлен</option>
// 			</Form.Select>

// 			<Table
// 				striped
// 				bordered
// 				hover
// 			>
// 				<thead>
// 					<tr>
// 						<th>№</th>
// 						<th>Название</th>
// 						<th>Статус</th>
// 						<th>Место отправки</th>
// 						<th>Место назначения</th>
// 						<th>Дата отправки</th>
// 						<th>Действия</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{filteredCargoList.map((cargo, index) => (
// 						<tr key={cargo.id}>
// 							<td>{index + 1}</td>
// 							<td>{cargo.name}</td>
// 							<td>
// 								<Form.Select
// 									defaultValue={cargo.status}
// 									onChange={(e) => handleStatusChange(cargo.id, e.target.value)}
// 									style={{
// 										backgroundColor:
// 											cargo.status === "Ожидает отправки"
// 												? "#FFD700"
// 												: cargo.status === "В пути"
// 												? "#1E90FF"
// 												: "#32CD32",
// 										color: "white",
// 									}}
// 								>
// 									<option value="Ожидает отправки">Ожидает отправки</option>
// 									<option value="В пути">В пути</option>
// 									<option value="Доставлен">Доставлен</option>
// 								</Form.Select>
// 							</td>
// 							<td>{cargo.origin}</td>
// 							<td>{cargo.destination}</td>
// 							<td>{cargo.departureDate}</td>
// 							<td>
// 								<Button
// 									variant="warning"
// 									className="me-2"
// 									onClick={() => handleEdit(cargo)}
// 								>
// 									Редактировать
// 								</Button>
// 								<Button
// 									variant="danger"
// 									onClick={() => {
// 										setSelectedCargo(cargo);
// 										setShowDeleteModal(true);
// 									}}
// 								>
// 									Удалить
// 								</Button>
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</Table>

// 			{/* Удалить modal */}
// 			<Modal
// 				show={showDeleteModal}
// 				onHide={() => setShowDeleteModal(false)}
// 				centered
// 			>
// 				<Modal.Header closeButton>
// 					<Modal.Title>Подтверждение удаления</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>Вы уверены, что хотите удалить этот груз?</Modal.Body>
// 				<Modal.Footer>
// 					<Button
// 						variant="secondary"
// 						onClick={() => setShowDeleteModal(false)}
// 					>
// 						Нет
// 					</Button>
// 					<Button
// 						variant="danger"
// 						onClick={handleDelete}
// 					>
// 						Да
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>

// 			{/* Edit modal */}
// 			{selectedCargo && (
// 				<EditCargo
// 					show={showEditModal}
// 					onHide={() => setShowEditModal(false)}
// 					selectedCargo={selectedCargo}
// 					setCargoList={setCargoList}
// 				/>
// 			)}
// 		</>
// 	);
// }

// export default CargoTable;

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import { deleteCargo, updateCargo } from "../services/api";
import EditCargo from "./EditCargo"; // Edit komponentini import qilish

function CargoTable({ cargoList, setCargoList }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedCargo, setSelectedCargo] = useState(null);
	const [filterStatus, setFilterStatus] = useState(""); // Filtrlangan status
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const handleDelete = async () => {
		await deleteCargo(selectedCargo.id);
		setCargoList((prevList) =>
			prevList.filter((cargo) => cargo.id !== selectedCargo.id)
		);
		setShowDeleteModal(false);
		toast.success("Груз успешно удален!");
	};

	const handleStatusChange = async (id, newStatus) => {
		const updatedCargo = await updateCargo(id, { status: newStatus });
		setCargoList((prevList) =>
			prevList.map((cargo) => (cargo.id === id ? updatedCargo : cargo))
		);
		toast.info("Статус груза обновлен!");
	};

	const handleEdit = (cargo) => {
		setSelectedCargo(cargo);
		setShowEditModal(true);
	};

	// Sahifa bo'yicha ma'lumotlarni hisoblash
	const filteredCargoList = filterStatus
		? cargoList.filter((cargo) => cargo.status === filterStatus)
		: cargoList;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredCargoList.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	// Sahifalash
	const totalPages = Math.ceil(filteredCargoList.length / itemsPerPage);
	const renderPagination = () => {
		let items = [];
		for (let i = 1; i <= totalPages; i++) {
			items.push(
				<Pagination.Item
					key={i}
					active={i === currentPage}
					onClick={() => setCurrentPage(i)}
				>
					{i}
				</Pagination.Item>
			);
		}
		return <Pagination>{items}</Pagination>;
	};

	return (
		<>
			{/* Status filtr */}
			<Form.Select
				className="mb-3"
				value={filterStatus}
				onChange={(e) => setFilterStatus(e.target.value)}
			>
				<option value="">Все грузы</option>
				<option value="Ожидает отправки">Ожидает отправки</option>
				<option value="В пути">В пути</option>
				<option value="Доставлен">Доставлен</option>
			</Form.Select>

			{/* Yuklar jadvali */}
			<Table
				striped
				bordered
				hover
			>
				<thead>
					<tr>
						<th>№</th>
						<th>Название</th>
						<th>Статус</th>
						<th>Место отправки</th>
						<th>Место назначения</th>
						<th>Дата отправки</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map((cargo, index) => (
						<tr key={cargo.id}>
							<td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
							<td>{cargo.name}</td>
							<td>
								<Form.Select
									defaultValue={cargo.status}
									onChange={(e) => handleStatusChange(cargo.id, e.target.value)}
									style={{
										backgroundColor:
											cargo.status === "Ожидает отправки"
												? "#FFD700"
												: cargo.status === "В пути"
												? "#1E90FF"
												: "#32CD32",
										color: "white",
									}}
								>
									<option value="Ожидает отправки">Ожидает отправки</option>
									<option value="В пути">В пути</option>
									<option value="Доставлен">Доставлен</option>
								</Form.Select>
							</td>
							<td>{cargo.origin}</td>
							<td>{cargo.destination}</td>
							<td>{cargo.departureDate}</td>
							<td>
								<Button
									variant="warning"
									className="me-2"
									onClick={() => handleEdit(cargo)}
								>
									Редактировать
								</Button>
								<Button
									variant="danger"
									onClick={() => {
										setSelectedCargo(cargo);
										setShowDeleteModal(true);
									}}
								>
									Удалить
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* Sahifalash */}
			{renderPagination()}

			{/* Удалить modal */}
			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Подтверждение удаления</Modal.Title>
				</Modal.Header>
				<Modal.Body>Вы уверены, что хотите удалить этот груз?</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowDeleteModal(false)}
					>
						Нет
					</Button>
					<Button
						variant="danger"
						onClick={handleDelete}
					>
						Да
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Edit modal */}
			{selectedCargo && (
				<EditCargo
					show={showEditModal}
					onHide={() => setShowEditModal(false)}
					selectedCargo={selectedCargo}
					setCargoList={setCargoList}
				/>
			)}
		</>
	);
}

export default CargoTable;
