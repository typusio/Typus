const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: !isProd,
  synchronize: !isProd,
  entities: [isProd ? 'dist/entity/**/*.ts' : 'src/entity/**/*.ts'],
  migrations: [isProd ? 'dist/migration/**/*.ts' : 'src/migration/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
};
