import { Form, User } from '@prisma/client';
import { db } from '../Prisma';

export async function hasFormAccess(formId: string, userId: string) {
  const owner = await db.form.findOne({ where: { id: formId } }).owner();
  const collaborators = await db.form.findOne({ where: { id: formId } }).collaborators();

  if (owner!.id === userId) return true;
  if (collaborators.some(c => c.id === userId)) return true;

  return false;
}
