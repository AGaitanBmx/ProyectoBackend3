import { Router } from "express";
import { pets } from "../mocks/mocks.js";

const router = Router();

// GET - Obtener todas las mascotas
router.get("/", (req, res) => {
  res.send({ status: "success", payload: pets });
});

// POST - Crear una nueva mascota
router.post("/", (req, res) => {
  const pet = req.body;

  if (!pet.name || !pet.species) {
    return res.status(400).send({ status: "error", error: "Faltan datos" });
  }

  pet.id = pets.length + 1;
  pets.push(pet);

  res.send({ status: "success", payload: pet });
});

// PUT - Actualizar una mascota por ID
router.put("/:id", (req, res) => {
  const petId = parseInt(req.params.id);
  const updatedPet = req.body;

  const index = pets.findIndex((p) => p.id === petId);
  if (index === -1) {
    return res.status(404).send({ status: "error", error: "Mascota no encontrada" });
  }

  pets[index] = { ...pets[index], ...updatedPet };
  res.send({ status: "success", payload: pets[index] });
});

// DELETE - Eliminar una mascota por ID
router.delete("/:id", (req, res) => {
  const petId = parseInt(req.params.id);
  const index = pets.findIndex((p) => p.id === petId);

  if (index === -1) {
    return res.status(404).send({ status: "error", error: "Mascota no encontrada" });
  }

  const deletedPet = pets.splice(index, 1);
  res.send({ status: "success", payload: deletedPet[0] });
});

export default router;
