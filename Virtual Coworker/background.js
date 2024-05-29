chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('dailyReminder', { periodInMinutes: 1440 });
  chrome.storage.local.get('dailyTime', function(data) {
    const time = data.dailyTime || '09:00';
    setAlarm(time);
  });
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'dailyReminder') {
    sendDailyReminder();
  }
});

function setAlarm(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
  if (alarmTime < now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }
  chrome.alarms.create('dailyReminder', {
    when: alarmTime.getTime(),
    periodInMinutes: 1440
  });
}

function sendDailyReminder() {
  chrome.storage.local.get('selectedCoworker', function(data) {
    const coworker = data.selectedCoworker || 'christian';
    const messages = coworkers[coworker] || [];
    const message = messages.length > 0 ? messages[Math.floor(Math.random() * messages.length)] : "No messages available.";
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon128.png',
      title: 'Daily Reminder',
      message: message
    });
  });
}

const coworkers = {
  christian: [
    "Keep pushing forward, success is near! 💪",
    "Believe in yourself, you've got this! 🌟",
    // ... more messages
  ],
  valentina: [
    "Remember to take breaks and stay hydrated. 💧",
    "Your hard work is paying off! 🌟",
    // ... more messages
  ],
  patrick: [
    "Remember to recycle your coffee cup! ♻️",
    "Every small action helps save the planet. 🌍",
    // ... more messages
  ]
};