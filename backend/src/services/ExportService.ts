import { Service } from '@tsed/di';
import { Submission } from '@prisma/client';
import { db } from '../Prisma';

@Service()
export class ExportService {
  private toJson(submissions: Submission[]) {
    const result = [];

    for (let submission of submissions) {
      delete submission.formId;
      submission.data = JSON.parse(submission.data);

      result.push(submission);
    }

    return result;
  }

  async exportJson(formId: string) {
    const submissions = await db.form.findOne({ where: { id: formId } }).submission();

    return JSON.stringify(this.toJson(submissions));
  }

  private sanitizeCell(cell: string) {
    if (cell.replace(/ /g, '').match(/[\s,"]/)) {
      return '"' + cell.replace(/"/g, '""') + '"';
    }
    return cell;
  }

  async exportCsv(formId: string) {
    const submissions = await db.form.findOne({ where: { id: formId } }).submission();

    const data = submissions.map(s => JSON.parse(s.data));
    let common: { [key: string]: number } = {};

    for (const submission of data) {
      for (const key of Object.keys(submission)) {
        if (!common[key]) common[key] = 0;

        common[key]++;
      }
    }

    const sorted = Object.keys(common).sort((a, b) => common[b] - common[a]);

    let result = `${sorted.map(s => this.sanitizeCell(s)).join(',')}\n`;

    for (const submission of data) {
      let row = [];

      for (const col of sorted) {
        if (submission[col]) {
          console.log(submission[col]);
          row.push(this.sanitizeCell(submission[col]));
        } else {
          row.push(' ');
        }
      }

      result += row.join(',') + '\n';
    }

    return result;
  }
}
