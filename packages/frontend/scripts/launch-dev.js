// VERY hacky workaround for CRA's console clearing. See here:
// https://github.com/facebook/create-react-app/issues/2495#issuecomment-437149580

const { spawn } = require('child_process');

const reactProcess = spawn('npx', ['react-scripts', 'start'], {
  env: Object.assign(process.env, { FORCE_COLOR: true }),
  detatched: true,
});

reactProcess.unref();

const removeCliClearCodes = text => {
  return text.replace(/\\033\[2J/g, '');
};

reactProcess.stdout.on('data', data => {
  const text = String(data);
  const output = removeCliClearCodes(text);
  console.log(text);
});
