import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateCargo } from "../services/api";
import { toast } from "react-toastify";

function EditCargo({ show, onHide, selectedCargo, setCargoList }) {
    const [updatedCargo, setUpdatedCargo] = useState({ ...selectedCargo });

    useEffect(() => {
        if (selectedCargo) {
            setUpdatedCargo({ ...selectedCargo });
        }
    }, [selectedCargo]);

    if (!selectedCargo) {
        return null; // Agar selectedCargo bo'lmasa, hech narsani render qilmaydi
    }

    const handleSave = async () => {
        if (
            !updatedCargo.name ||
            !updatedCargo.origin ||
            !updatedCargo.destination ||
            !updatedCargo.departureDate
        ) {
            toast.error("Все поля должны быть заполнены!");
            return;
        }

        try {
            const updatedData = await updateCargo(selectedCargo.id, updatedCargo);
            setCargoList((prevList) =>
                prevList.map((cargo) =>
                    cargo.id === selectedCargo.id ? updatedData : cargo
                )
            );
            toast.success("Груз успешно обновлен!");
            onHide();
        } catch (error) {
            toast.error("Ошибка при сохранении данных. Попробуйте еще раз.");
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать груз</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Название груза</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название груза"
                            value={updatedCargo.name || ""}
                            onChange={(e) =>
                                setUpdatedCargo({ ...updatedCargo, name: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Место отправки</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите место отправки"
                            value={updatedCargo.origin || ""}
                            onChange={(e) =>
                                setUpdatedCargo({ ...updatedCargo, origin: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Место назначения</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите место назначения"
                            value={updatedCargo.destination || ""}
                            onChange={(e) =>
                                setUpdatedCargo({
                                    ...updatedCargo,
                                    destination: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата отправки</Form.Label>
                        <Form.Control
                            type="date"
                            value={updatedCargo.departureDate || ""}
                            onChange={(e) =>
                                setUpdatedCargo({
                                    ...updatedCargo,
                                    departureDate: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditCargo;
