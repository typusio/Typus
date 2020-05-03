import { Client } from '@elastic/elasticsearch';

export const elastic = new Client({ node: process.env.ELASTIC_URL! });
