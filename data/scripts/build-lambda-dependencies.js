import { mkdirSync, writeFileSync } from 'fs';
import pkg from '../../package.json' assert { type: 'json' };

const dependenciesDir = 'lambda-dependencies-temp';

mkdirSync(dependenciesDir, { recursive: true });
writeFileSync(
  `${dependenciesDir}/package.json`,
  JSON.stringify(
    { name: dependenciesDir, version: '1.0.0', dependencies: pkg.dependencies },
    null,
    2
  )
);

process.exit(0);
