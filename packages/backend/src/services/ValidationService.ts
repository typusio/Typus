import { Service } from '@tsed/di';
import { db } from '../Prisma';
import { Form } from '@prisma/client';

import { Request, Response } from 'express';
import { RenderService } from './RenderService';
import { elastic } from '../Elastic';

export type Validator = (context: ValidatorContext) => boolean | Promise<boolean>;
export type ValidatorMeta = {
  name: string;
  requireDetail: boolean;
  detailSubtext?: string;
  defaultError: string;
  middleText: string;
  required?: boolean;
  strictOnly?: boolean;
  nonStrictOnly?: boolean;
};

type ValidatorContext = {
  formId: string;
  field: string;
  value: string;
  detail: string;
};

@Service()
export class ValidationService {
  public constructor(private readonly renderService: RenderService) {}

  public validators: { [key: string]: Validator } = {
    greaterThan({ value, detail }: ValidatorContext) {
      return parseInt(value) > parseInt(detail);
    },
    lessThan({ value, detail }: ValidatorContext) {
      return parseInt(value) < parseInt(detail);
    },
    longerThan({ value, detail }: ValidatorContext) {
      return value.length > parseInt(detail);
    },
    shorterThan({ value, detail }: ValidatorContext) {
      return value.length > parseInt(detail);
    },
    required({ value }: ValidatorContext) {
      return !!value;
    },
    async unique({ formId, value, field }: ValidatorContext) {
      await elastic.indices.refresh({ index: 'submissions' });

      const { body } = await elastic.search({
        index: 'submissions',
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    [`data.${field}`]: value,
                  },
                },
                {
                  match: {
                    formId,
                  },
                },
              ],
            },
          },
        },
      });

      if (body.hits?.total?.value > 0) return false;

      return true;
    },
    canExist() {
      return true;
    },
  };

  public meta: { [key: string]: ValidatorMeta } = {
    greaterThan: {
      name: 'Must be a number and greater than',
      requireDetail: true,
      detailSubtext: 'Valid number',
      defaultError: '{field} must be a number and greater than {detail}',
      middleText: 'must be number and greater than',
    },
    lessThan: {
      name: 'Must be a number and less than',
      requireDetail: true,
      detailSubtext: 'Valid number',
      defaultError: '{field} must be a number and less than {detail}',
      middleText: 'must be a number and less than',
    },
    longerThan: {
      name: 'Must be longer than',
      requireDetail: true,
      detailSubtext: 'Valid number',
      defaultError: '{field} must be longer than {detail}',
      middleText: 'must be longer than',
    },
    shorterThan: {
      name: 'Must be shorter than',
      requireDetail: true,
      detailSubtext: 'Valid number',
      defaultError: '{field} must be shorter than {detail}',
      middleText: 'must be shorter than',
    },
    required: {
      name: 'Must exist',
      requireDetail: false,
      defaultError: '{field} cannot be empty',
      middleText: 'must exist',
      required: true,
      nonStrictOnly: true,
    },
    unique: {
      name: 'Must be unique',
      requireDetail: false,
      defaultError: '{field} must be unique',
      middleText: 'must be unique',
    },
    canExist: {
      name: 'Can exist',
      requireDetail: false,
      defaultError: '',
      middleText: 'can exist',
      required: true,
      strictOnly: true,
    },
  };

  private async handleValidationError(req: Request, res: Response, field: string, error: string, formId: string) {
    if (req.headers['content-type']?.includes('application/json')) {
      return res.status(400).json({ message: 'validation error', field, error });
    }

    return this.renderService.renderError({ error, title: 'Validation Error' }, res, formId);
  }

  async handleValidation(req: Request, res: Response, form: Form) {
    const validation = await db.form.findOne({ where: { id: form.id } }).validation({ select: { strict: true, id: true } });

    if (!validation) return true;

    const rules = await db.validationRule.findMany({ where: { validationId: validation.id } });

    if (!rules) return true;

    if (validation.strict === true) {
      for (const field of Object.keys(req.body)) {
        if (!req.body[field]) continue; // to deal with falsy fields

        if (!rules.find(r => r.field === field)) {
          await this.handleValidationError(req, res, field, `Field ${field} is not recognised.`, form.id);

          return false;
        }
      }
    }

    for (const rule of rules) {
      if (!this.meta[rule.validator].required && !req.body[rule.field]) continue;
      if (this.meta[rule.validator].strictOnly && !validation!.strict) continue;

      let result = await this.validators[rule.validator]({
        formId: form.id,
        field: rule.field,
        value: req.body[rule.field],
        detail: rule.detail ? rule.detail : '',
      });

      if (result === false) {
        await this.handleValidationError(
          req,
          res,
          rule.field,
          (rule.errorMessage ? rule.errorMessage : this.meta[rule.validator].defaultError)
            .replace('{field}', rule.field.charAt(0).toUpperCase() + rule.field.slice(1))
            .replace('{detail}', rule.detail ? rule.detail : '')
            .replace('{value}', req.body[rule.field]),
          form.id,
        );

        return false;
      }
    }

    return true;
  }
}
