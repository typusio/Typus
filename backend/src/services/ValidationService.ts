import { Service } from '@tsed/di';
import { db } from '../Prisma';

export type Validator = (context: ValidatorContext) => boolean | Promise<boolean>;
export type ValidatorMeta = { name: string; requireDetail: boolean; detailSubtext?: string; defaultError: string; middleText: string; required?: boolean };

type ValidatorContext = {
  formId: string;
  field: string;
  value: string;
  detail: string;
};

@Service()
export class ValidationService {
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
      const submissions = await db.form.findOne({ where: { id: formId } }).submission();

      for (const submission of submissions) {
        if (JSON.parse(submission.data)[field] == value) {
          return false;
        }
      }

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
    },
    unique: {
      name: 'Must be unique',
      requireDetail: false,
      defaultError: '{field} must be unique',
      middleText: 'must be unique',
    },
  };
}
