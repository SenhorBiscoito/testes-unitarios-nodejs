declare namespace Express {
  export interface Request {
    customer: {
      id?: string;
      name: string;
      cpf: string;
      created_at: Date;
    };
  }
}
