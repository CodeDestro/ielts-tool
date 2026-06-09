const SpellingSkill = {
  label: "Spelling",
  icon: "ti-spell-check",

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
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: this.system,
        messages: [{ role: "user", content: text }]
      })
    });
    const data = await res.json();
    return data.content.map(b => b.text || "").join("").trim();
  }
};
