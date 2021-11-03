import { Account } from "../models/Account";

interface ICreateAccountDTO {
  name: string;
  cpf: string;
}

class AccountsRepository {
  private customers: Account[];

  constructor() {
    this.customers = [];
  }

  create({ name, cpf }: ICreateAccountDTO): void {
    const account = new Account();

    Object.assign(account, {
      name,
      cpf,
      created_at: new Date(),
    });

    this.customers.push(account);
  }

  list(): Account[] {
    return this.customers;
  }

  findByCPF(cpf: string): Account {
    const customer = this.customers.find((customer) => customer.cpf === cpf);
    return customer;
  }

  deleleByCpf(cpf: string): Account {
    const customer = this.customers.find((customer) => customer.cpf === cpf);

    this.customers.splice(customer, 1);

    return customer;
  }
}

export { AccountsRepository };
