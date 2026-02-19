const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m'
};

const log = (msg, color = colors.reset) => console.log(`${color}${msg}${colors.reset}`);

const runCommand = (command, cwd, name) => {
    return new Promise((resolve, reject) => {
        log(`[${name}] Starting build...`, colors.cyan);
        const startTime = Date.now();

        exec(command, { cwd }, (error, stdout, stderr) => {
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);

            if (error) {
                log(`[${name}] ❌ Build failed in ${duration}s`, colors.red);
                console.error(stderr || stdout);
                resolve({ success: false, name, error: stderr || stdout });
            } else {
                log(`[${name}] ✅ Build successful in ${duration}s`, colors.green);
                resolve({ success: true, name });
            }
        });
    });
};

const main = async () => {
    log(`
    🤖 Starting Build Bot...
    =========================
    `, colors.bright);

    const rootDir = __dirname;
    const frontendDir = path.join(rootDir, 'frontend');
    const backendDir = path.join(rootDir, 'backend');

    const results = await Promise.all([
        runCommand('npm run build', frontendDir, 'Frontend'),
        runCommand('npm run build', backendDir, 'Backend')
    ]);

    log(`
    =========================
    📊 Build Summary
    =========================
    `, colors.bright);

    let hasErrors = false;
    results.forEach(res => {
        if (res.success) {
            log(`✅ ${res.name}: Success`, colors.green);
        } else {
            hasErrors = true;
            log(`❌ ${res.name}: Failed`, colors.red);
        }
    });

    if (hasErrors) {
        log('\n⚠️  Some builds failed. Please check the logs above.', colors.yellow);
        process.exit(1);
    } else {
        log('\n🚀 All builds passed successfully! System is healthy.', colors.green);
        process.exit(0);
    }
};

main();
