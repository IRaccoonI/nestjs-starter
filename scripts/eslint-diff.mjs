import { execSync } from 'child_process';

const output = execSync('git diff --name-only --diff-filter=ACMRTUXB HEAD', {
  encoding: 'utf-8',
});
const files = output.split('\n').filter((file) => file.match(/\.(ts|tsx)$/));

if (files.length === 0) {
  process.exit(0);
}

const command = `pnpm exec eslint ${files.join(' ')}`;

try {
  execSync(command, { stdio: 'inherit' });
} catch {}
