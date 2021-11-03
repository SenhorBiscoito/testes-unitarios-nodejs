import { Router } from "express";

import { AccountsRepository } from "../repositories/AccountsRepository";

const accountRoutes = Router();

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({ error: "Customer not found" });
  }

  request.customer = customer;

  return next();
}

const accountsRepository = new AccountsRepository();

accountRoutes.get("/", verifyIfExistsAccountCPF, (request, response) => {
  const all = accountsRepository.list();
  return response.json(all);
});

accountRoutes.post("/", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlredyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlredyExists) {
    return response.status(400).json({ error: "Customer already exists" });
  }

  accountsRepository.create({ name, cpf });

  return response.status(201).send();
});

accountRoutes.put("/", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
});

accountRoutes.delete("/", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

export { accountRoutes };
