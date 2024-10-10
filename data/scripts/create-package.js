import { mkdirSync, writeFileSync } from 'fs';

const dependenciesDir = 'lambda-dependencies-temp';

mkdirSync(dependenciesDir, { recursive: true });

writeFileSync(
  `${dependenciesDir}/package.json`,
  JSON.stringify(
    { name: dependenciesDir, version: '1.0.0', dependencies: {} },
    null,
    2
  )
);

process.exit(0);
