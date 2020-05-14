import { Controller, Post, UseBefore, BodyParams, Locals, Get, Patch } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { CreateFieldModel } from './models/CreateFieldModel';
import { Form } from '@prisma/client';
import { db } from '../Prisma';
import { BadRequest } from 'ts-httpexceptions';
import { EditSchemaModel } from './models/EditSchemaModel';

@Controller('/schema')
export class SchemaController {
  private readonly ALLOWED_TYPES = ['text', 'number', 'boolean', 'date'];

  @Post('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async createField(@BodyParams() { name, required, type }: CreateFieldModel, @Locals('form') f: Form) {
    if (!this.ALLOWED_TYPES.includes(type)) throw new BadRequest(`Type must be one of ${this.ALLOWED_TYPES.join(', ')}`);

    const form = await db.form.findOne({ where: { id: f.id }, include: { schema: true } });
    const fields = await db.schema.findOne({ where: { id: form?.schema.id } }).fields({ where: { name } });

    if (fields.length > 0) throw new BadRequest('You already have a field with this name');

    console.log(form?.schema);

    const field = await db.field.create({ data: { name, required, type, schema: { connect: { id: form?.schema.id } } } });

    return field;
  }

  @Get('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@Locals('form') form: Form) {
    return await db.form.findOne({ where: { id: form.id } }).schema({ include: { fields: true } });
  }

  @Patch('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async edit(@BodyParams() data: EditSchemaModel, @Locals('form') form: Form) {
    const schema = await db.form.findOne({ where: { id: form.id } }).schema();

    return await db.schema.update({ where: { id: schema!.id }, data, include: { fields: true } });
  }
}
