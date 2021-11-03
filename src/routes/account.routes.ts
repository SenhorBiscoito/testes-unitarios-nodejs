import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const accountRoutes = Router();

const customers = [];

accountRoutes.get("/", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({ error: "Customer not found" });
  }

  request.customer = customer;

  return response.json(customer);
});

accountRoutes.post("/", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlredyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlredyExists) {
    return response.status(400).json({ error: "Customer already exists" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

export { accountRoutes };
