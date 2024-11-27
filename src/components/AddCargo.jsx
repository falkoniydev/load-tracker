// import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { addCargo } from "../services/api";

// function AddCargo({ show, onHide, setCargoList }) {
//   const [newCargo, setNewCargo] = useState({
//     name: "",
//     origin: "",
//     destination: "",
//     departureDate: "",
//     status: "Ожидает отправки",
//   });

//   const handleAddCargo = async () => {
//     const addedCargo = await addCargo(newCargo);
//     setCargoList((prevList) => [...prevList, addedCargo]);
//     onHide();
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Добавить груз</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Название груза</Form.Label>
//             <Form.Control
//               type="text"
//               value={newCargo.name}
//               onChange={(e) => setNewCargo({ ...newCargo, name: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Место отправки</Form.Label>
//             <Form.Control
//               type="text"
//               value={newCargo.origin}
//               onChange={(e) => setNewCargo({ ...newCargo, origin: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Место назначения</Form.Label>
//             <Form.Control
//               type="text"
//               value={newCargo.destination}
//               onChange={(e) => setNewCargo({ ...newCargo, destination: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Дата отправки</Form.Label>
//             <Form.Control
//               type="date"
//               value={newCargo.departureDate}
//               onChange={(e) =>
//                 setNewCargo({ ...newCargo, departureDate: e.target.value })
//               }
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Отмена
//         </Button>
//         <Button variant="primary" onClick={handleAddCargo}>
//           Добавить
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default AddCargo;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addCargo } from "../services/api";

function AddCargo({ show, onHide, setCargoList }) {
	const [newCargo, setNewCargo] = useState({
		name: "",
		origin: "",
		destination: "",
		departureDate: "",
		status: "Ожидает отправки",
	});

	const [error, setError] = useState("");

	const handleAddCargo = async () => {
		if (
			newCargo.name == "" ||
			newCargo.origin == "" ||
			newCargo.destination == "" ||
			newCargo.departureDate == ""
		) {
			setError("Все поля должны быть заполнены!");
			return;
		}
		setError(""); // Xatolikni tozalash
		try {
			const addedCargo = await addCargo(newCargo);
			setCargoList((prevList) => [...prevList, addedCargo]);
			setNewCargo({
				name: "",
				origin: "",
				destination: "",
				departureDate: "",
				status: "Ожидает отправки",
			}); // Formani tozalash
			onHide();
		} catch (error) {
			setError("Ошибка при добавлении груза. Попробуйте еще раз.");
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Добавить груз</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{error && <p className="text-danger">{error}</p>}
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Название груза</Form.Label>
						<Form.Control
							type="text"
							value={newCargo.name}
							onChange={(e) =>
								setNewCargo({ ...newCargo, name: e.target.value })
							}
							placeholder="Введите название груза"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Место отправки</Form.Label>
						<Form.Control
							type="text"
							value={newCargo.origin}
							onChange={(e) =>
								setNewCargo({ ...newCargo, origin: e.target.value })
							}
							placeholder="Введите место отправки"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Место назначения</Form.Label>
						<Form.Control
							type="text"
							value={newCargo.destination}
							onChange={(e) =>
								setNewCargo({ ...newCargo, destination: e.target.value })
							}
							placeholder="Введите место назначения"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Дата отправки</Form.Label>
						<Form.Control
							type="date"
							value={newCargo.departureDate}
							onChange={(e) =>
								setNewCargo({ ...newCargo, departureDate: e.target.value })
							}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={onHide}
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					onClick={handleAddCargo}
				>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddCargo;
