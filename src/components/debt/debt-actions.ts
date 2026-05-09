'use server';

import { revalidatePath } from 'next/cache';

export async function addDebt(prevState: any, formData: FormData) {
  const name = formData.get('name')?.toString();
  const amount = formData.get('amount')?.toString();

  // Basic Validation
  if (!name || !amount) {
    return { error: 'Name and amount are required.' };
  }


  revalidatePath('/debt');
  return { success: true };
}