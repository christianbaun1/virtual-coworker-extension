const coworkers = {
  christian: [
    "Keep pushing forward, success is near! \u{1F4AA}",
    "Believe in yourself, you've got this! \u{1F31F}",
    "Stay positive and keep moving forward. \u{1F60A}",
    "Every step you take is a step towards success. \u{1F3C6}",
    "Your dedication is truly inspiring! \u{1F44F}",
    "Keep up the excellent work! \u{1F44D}",
    "You're capable of amazing things! \u{1F31F}",
    "Stay focused and stay strong! \u{1F4AA}",
    "Your hard work is paying off! \u{1F3C5}",
    "You're doing great! Keep up the fantastic work! \u{1F389}"
  ],
  valentina: [
    "Remember to take breaks and stay hydrated. \u{1F4A7}",
    "Your hard work is paying off! \u{1F31F}",
    "Believe in your potential, you can do it! \u{1F4AA}",
    "Keep your spirits high, you're doing great! \u{1F60A}",
    "Stay balanced and take care of yourself. \u{1F338}",
    "Your efforts are making a difference! \u{1F44F}",
    "Nurture your growth and success will follow. \u{1F331}",
    "Stay calm and keep moving forward. \u{1F31F}",
    "You're a valuable member of the team! \u{1F44D}",
    "Stay positive, you're doing wonderful! \u{1F60A}"
  ],
  patrick: [
    "Remember to recycle your coffee cup! \u{267B}",
    "Every small action helps save the planet. \u{1F30D}",
    "Why did the recycling bin go to therapy? It felt empty inside. \u{1F602}",
    "Use reusable bags instead of plastic. \u{1F6CD}",
    "Turn off the lights when you leave the room. \u{1F4A1}",
    "Did you know? Recycling one ton of paper saves 17 trees. \u{1F333}",
    "Why don't scientists trust atoms? Because they make up everything! \u{1F923}",
    "Take a walk outside and appreciate nature. \u{1F33F}",
    "Reuse and repurpose items to reduce waste. \u{267B}",
    "Keep a reusable water bottle with you to stay hydrated and eco-friendly. \u{1F4A7}"
  ]
};

document.getElementById('set-coworker').addEventListener('click', function() {
  const coworker = document.getElementById('coworker-select').value;
  chrome.storage.local.set({ selectedCoworker: coworker }, function() {
    updateMessage(coworker);
  });
});

function updateMessage(coworker) {
  const messages = coworkers[coworker] || [];
  const message = messages.length > 0 ? messages[Math.floor(Math.random() * messages.length)] : "No messages available.";
  document.getElementById('coworker-message').innerText = message;
}

chrome.storage.local.get('selectedCoworker', function(data) {
  if (data.selectedCoworker) {
    document.getElementById('coworker-select').value = data.selectedCoworker;
    updateMessage(data.selectedCoworker);
  }
});