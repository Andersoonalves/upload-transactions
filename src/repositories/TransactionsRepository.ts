import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface AllTransactionsDTO {
  transactions: Transaction[];
  balance: Balance;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.reduce((total, obj) => {
      return obj.type === 'income' ? total + obj.value : total;
    }, 0);

    const outcome = transactions.reduce((total, obj) => {
      return obj.type === 'outcome' ? total + obj.value : total;
    }, 0);

    const total = income - outcome;

    const balanceData: Balance = {
      income,
      outcome,
      total,
    };
    return balanceData;
  }

  // return all transactions
  public async all(): Promise<AllTransactionsDTO> {
    const transactions = await this.find();
    const balance = await this.getBalance();
    return {
      transactions,
      balance,
    };
  }
}

export default TransactionsRepository;
