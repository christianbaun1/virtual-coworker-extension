document.getElementById('save-settings').addEventListener('click', function() {
  const time = document.getElementById('daily-time').value;
  chrome.storage.local.set({ dailyTime: time }, function() {
    alert('Settings saved!');
    setDailyReminder(time);
  });
});

function setDailyReminder(time) {
  chrome.alarms.clear('dailyReminder', function() {
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
  });
}

// Load saved settings
chrome.storage.local.get('dailyTime', function(data) {
  if (data.dailyTime) {
    document.getElementById('daily-time').value = data.dailyTime;
  }
});