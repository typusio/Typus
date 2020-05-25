import { Service } from '@tsed/di';
import { Req } from '@tsed/common';

import { Request } from 'express';
import { db } from '../Prisma';

import * as crypto from 'crypto';

@Service()
export class IpService {
  private generate(ip: string) {
    return crypto
      .createHash('md5')
      .update(crypto.createHmac('sha256', ip).digest('hex'))
      .digest('hex')
      .split('')
      .filter((item, pos, self) => {
        return self.indexOf(item) == pos;
      })
      .join('');
  }

  public async find(@Req() req: Request) {
    const ipAddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;

    const foundIp = await db.ip.findOne({ where: { address: this.generate(ipAddress) } });

    if (foundIp) return foundIp;

    const ip = await db.ip.create({ data: { address: this.generate(ipAddress) } });

    return ip;
  }
}
