const fs = require('fs');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const source = isProduction
  ? path.join(__dirname, 'prisma', 'schema.postgres.prisma')
  : path.join(__dirname, 'prisma', 'schema.sqlite.prisma');

const dest = path.join(__dirname, 'prisma', 'schema.prisma');

fs.copyFileSync(source, dest);
console.log(`Copied ${path.basename(source)} to schema.prisma`);