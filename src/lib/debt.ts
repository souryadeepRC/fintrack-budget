import 'server-only';

import { DebtDTO,toDebtDTO } from '../dto/debt';

// Mock session verification and DB
// Replace this with your actual auth and database logic (e.g., Prisma/Drizzle)
const verifySession = async () => ({ userId: 'user_123' });
const db = {
  debt: {
    findMany: async () => [
      { id: '1', name: 'Credit Card', amount: 3500, secretDbField: 'hidden' },
      { id: '2', name: 'Student Loan', amount: 15000, secretDbField: 'hidden' },
    ],
  },
};

export async function getDebts(): Promise<DebtDTO[]> {
  const session = await verifySession();
  if (!session?.userId) throw new Error('Unauthorized');

  const rawDebts = await db.debt.findMany({ where: { userId: session.userId } });
  return rawDebts.map(toDebtDTO);
}