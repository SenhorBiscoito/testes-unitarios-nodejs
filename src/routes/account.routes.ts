import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

import { Account, Account } from "../models/Account";

const accountRoutes = Router();

const customers: Account[] = [];

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

accountRoutes.get("/", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
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

  const account = new Account();

  Object.assign(account, {
    name,
    cpf,
  });

  customers.push(account);

  return response.status(201).json({ account });
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
