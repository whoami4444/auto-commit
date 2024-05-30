const fs = require('fs').promises;
const moment = require('moment');
const { exec } = require('child_process');
const crypto = require('crypto');

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(`Command execution failed. Command: ${command}, Error: ${error.message}`);
      } else {
        resolve(true);
      }
    });
  });
}

async function configureGitUser(gitUser, gitEmail) {
  try {
    await executeCommand(`git config --global user.name "${gitUser}"`);
    await executeCommand(`git config --global user.email "${gitEmail}"`);
  } catch (error) {
    console.error(`Failed to set Git user name and email. ${error}`);
  }
}

async function initializeCommitFile() {
  try {
    await fs.writeFile('commit.txt', '');
  } catch (error) {
    console.error(`Failed to initialize commit file. ${error}`);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomHash() {
  return crypto.randomBytes(16).toString('hex');
}

async function appendToCommitFile(hash) {
  try {
    await fs.appendFile('commit.txt', `${hash}\n`);
  } catch (error) {
    console.error(`Failed to append to commit file. ${error}`);
  }
}

async function createCommit(date, message) {
  try {
    await executeCommand('git add . && git commit --date="' + date + '" -m "' + message + '"');
    return true;
  } catch (error) {
    console.error(`Failed to create commit. ${error}`);
    return false;
  }
}

async function pushCommits(repository) {
  try {
    await executeCommand(`git push --set-upstream ${repository} main`);
    return true;
  } catch (error) {
    console.error(`Failed to push commits. ${error}`);
    return false;
  }
}

async function createAndLogCommit(commitDate, commitMessage, totalCommits) {
  if (await createCommit(commitDate, commitMessage)) {
    totalCommits++;
    console.log(`Commit ${totalCommits} created successfully.`);
  }
  return totalCommits;
}

async function generateCommitsForDay(start, i, commitsPerDay, config, totalCommits) {
  const commitDate = start.clone().add(i, 'days').format();
  for (let j = 0; j < commitsPerDay; j++) {
    const randomHash = generateRandomHash();
    await appendToCommitFile(randomHash);
    totalCommits = await createAndLogCommit(commitDate, config.commitMessage, totalCommits);
  }
  return totalCommits;
}

async function generateCommits(config) {
  await configureGitUser(config.gitUser, config.gitEmail);

  const start = moment(config.startDate);
  const end = moment(config.endDate);
  const daysRange = end.diff(start, 'days') + 1;

  await initializeCommitFile();

  let totalCommits = 0;

  for (let i = 0; i < daysRange; i++) {
    const commitsPerDay = getRandomInt(config.minCommits, config.maxCommits);
    totalCommits = await generateCommitsForDay(start, i, commitsPerDay, config, totalCommits);
  }

  if (await pushCommits(config.repository)) {
    console.log(`All commits pushed successfully.`);
  }
}

async function readConfigAndGenerateCommits(configFile) {
  try {
    const data = await fs.readFile(configFile, 'utf8');
    const config = JSON.parse(data);
    await generateCommits(config);
  } catch (error) {
    console.error(`Failed to read or parse configuration file. ${error}`);
  }
}

const configFile = 'config.json';
readConfigAndGenerateCommits(configFile);