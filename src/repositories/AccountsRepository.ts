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
}

export { AccountsRepository };
