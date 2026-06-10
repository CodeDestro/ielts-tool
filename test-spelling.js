const { SpellingSkill } = require('./skills/spelling.js');

async function test() {
  // Override URL to use local server
  SpellingSkill.serverUrl = 'http://localhost:3000/api/skill';
  const result = await SpellingSkill.run('I thinks this is a good exampel of spellng.');
  console.log('Result:', result);
}

test().catch(err=>{console.error(err);process.exit(1);});
