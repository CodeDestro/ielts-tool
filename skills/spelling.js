const SpellingSkill = {
  label: "Spelling",
  icon: "ti-spell-check",

  // ⚠️ After deploying to Render, replace the URL below with your Render URL
  // Example: https://ielts-tool-server.onrender.com/api/skill
  serverUrl: "http://localhost:3000/api/skill",

  system: `You are a spelling and capitalization corrector for IELTS student answers.
Just clean up the spelling and capitalization — do not fix grammar or sentence structure mistakes.
If a word appears incomplete or unrecognizable, infer the most likely intended word based on the context of the sentence.
If a verb ends in 'ing' or 's' then it should still end in 'ing' or 's' after correction.
Keep everything else the same — same words, same order, same structure.

Example:
Student: I thinks work with AI wi b the main trand in the futur.
Corrected: I thinks work with AI will be the main trend in the future.

Return ONLY the corrected text with no explanation, no preamble, no quotes.`,

  async run(text) {
    const res = await fetch(this.serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system: this.system, text })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || "Skill request failed");
    return (data.text || "").trim();
  }
};
