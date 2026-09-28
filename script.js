// DayFlow dashboard logic
// This file handles the task list, goal reminder, smart recommendation, and weather loading.

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-btn");
const taskCounter = document.getElementById("task-counter");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");

const goalInput = document.getElementById("goal-input");
const goalDisplay = document.getElementById("goal-display");
const saveGoalButton = document.getElementById("save-goal-btn");

const reminderInput = document.getElementById("reminder-input");
const reminderDisplay = document.getElementById("reminder-display");
const saveReminderButton = document.getElementById("save-reminder-btn");

const recommendationText = document.getElementById("recommendation-text");

const currentDate = document.getElementById("current-date");
const currentTime = document.getElementById("current-time");
const greeting = document.getElementById("greeting");
const motivationalMessage = document.getElementById("motivational-message");

const cityInput = document.getElementById("city-input");
const weatherButton = document.getElementById("weather-btn");
const weatherError = document.getElementById("weather-error");
const weatherIcon = document.getElementById("weather-icon");
const weatherTemp = document.getElementById("weather-temp");
const weatherCondition = document.getElementById("weather-condition");
const weatherLocation = document.getElementById("weather-location");
const humidityText = document.getElementById("humidity");
const windSpeedText = document.getElementById("wind-speed");

const STORAGE_KEYS = {
  tasks: "dayflowTasks",
  goal: "dayflowGoal",
  reminder: "dayflowReminder",
  weatherCity: "dayflowWeatherCity"
};

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks)) || [];

// Helper function to safely read localStorage values and avoid breaking the app.
function safeStorageGet(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : fallback;
  } catch (error) {
    console.warn("localStorage read failed:", error);
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("localStorage write failed:", error);
  }
}

function updateDateTime() {
  const now = new Date();
  const dateOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  const timeOptions = { hour: "numeric", minute: "2-digit", second: "2-digit" };

  currentDate.textContent = now.toLocaleDateString(undefined, dateOptions);
  currentTime.textContent = now.toLocaleTimeString(undefined, timeOptions);

  const hour = now.getHours();
  if (hour < 12) {
    greeting.textContent = "Good morning!";
  } else if (hour < 18) {
    greeting.textContent = "Good afternoon!";
  } else {
    greeting.textContent = "Good evening!";
  }

  const messages = [
    "Small steps still move you forward.",
    "You are building momentum today.",
    "Keep going — your plan matters.",
    "A focused hour can change everything."
  ];

  motivationalMessage.textContent = messages[Math.floor(hour % messages.length)];
}

function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  let percentage = 0;
  if (totalTasks > 0) {
    percentage = Math.round((completedTasks / totalTasks) * 100);
  }

  taskCounter.textContent = `${completedTasks}/${totalTasks} done`;
  progressPercent.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;

  if (totalTasks === 0) {
    taskCounter.textContent = "0/0 done";
  }
}

function saveTasks() {
  safeStorageSet(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  updateProgress();
  updateRecommendation();
}

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    taskInput.focus();
    taskInput.setAttribute("aria-invalid", "true");
    taskInput.placeholder = "Please enter a task first";
    return;
  }

  taskInput.removeAttribute("aria-invalid");
  taskInput.placeholder = "Add a task for today...";

  tasks.push({
    id: Date.now() + Math.random(),
    text,
    completed: false
  });

  taskInput.value = "";
  renderTasks();
  saveTasks();
}

function completeTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );

  renderTasks();
  saveTasks();
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "task-item";
    emptyMessage.innerHTML = '<span class="task-text">No tasks yet. Add your first task.</span>';
    taskList.appendChild(emptyMessage);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item ${task.completed ? "completed" : ""}`;

    item.innerHTML = `
      <div class="task-main">
        <button type="button" class="task-check" aria-label="Complete task" data-task-id="${task.id}"></button>
        <span class="task-text">${escapeHtml(task.text)}</span>
      </div>
      <div class="task-actions">
        <button type="button" class="task-action" data-action="toggle" data-task-id="${task.id}">
          ${task.completed ? "Undo" : "Done"}
        </button>
        <button type="button" class="remove-btn" data-action="delete" data-task-id="${task.id}">
          Remove
        </button>
      </div>
    `;

    taskList.appendChild(item);
  });

  taskList.querySelectorAll(".task-action, .task-check, .remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskId = Number(event.currentTarget.dataset.taskId);
      const action = event.currentTarget.dataset.action;

      if (action === "toggle" || event.currentTarget.classList.contains("task-check")) {
        completeTask(taskId);
      } else if (action === "delete") {
        removeTask(taskId);
      }
    });
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function saveGoal() {
  const goal = goalInput.value.trim();

  if (!goal) {
    goalInput.focus();
    goalInput.placeholder = "Please enter a goal first";
    return;
  }

  goalInput.placeholder = "Finish all my homework";
  goalDisplay.textContent = goal;
  safeStorageSet(STORAGE_KEYS.goal, goal);
}

function saveReminder() {
  const reminder = reminderInput.value.trim();

  if (!reminder) {
    reminderInput.focus();
    reminderInput.placeholder = "Please enter a reminder first";
    return;
  }

  reminderInput.placeholder = "Bring my science project tomorrow";
  reminderDisplay.textContent = reminder;
  safeStorageSet(STORAGE_KEYS.reminder, reminder);
}

function updateRecommendation() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const unfinishedTasks = totalTasks - completedTasks;

  if (totalTasks === 0) {
    recommendationText.textContent = "Start by adding your most important task for the day. One clear action creates momentum.";
    return;
  }

  // This is the required if/else logic for the smart recommendation.
  if (unfinishedTasks >= 3) {
    recommendationText.textContent = "You have several items left. Focus on your most important task first and finish one step before moving on.";
  } else if (completedTasks >= totalTasks * 0.7) {
    recommendationText.textContent = "Great job! You have completed most of your tasks. Take a short break, then finish the last few details.";
  } else {
    recommendationText.textContent = "Keep going with your next task. A steady rhythm will help you finish the day strong.";
  }
}

function getWeatherCodeLabel(code) {
  const weatherMap = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Cloudy", icon: "☁️" },
    45: { label: "Foggy", icon: "🌫️" },
    48: { label: "Foggy", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌦️" },
    55: { label: "Heavy drizzle", icon: "🌧️" },
    56: { label: "Freezing drizzle", icon: "🌧️" },
    57: { label: "Freezing drizzle", icon: "🌧️" },
    61: { label: "Light rain", icon: "🌦️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    66: { label: "Freezing rain", icon: "🌧️" },
    67: { label: "Freezing rain", icon: "🌧️" },
    71: { label: "Light snow", icon: "🌨️" },
    73: { label: "Snow", icon: "❄️" },
    75: { label: "Heavy snow", icon: "❄️" },
    77: { label: "Snow grains", icon: "❄️" },
    80: { label: "Showers", icon: "🌦️" },
    81: { label: "Heavy showers", icon: "🌧️" },
    82: { label: "Very heavy showers", icon: "🌧️" },
    85: { label: "Snow showers", icon: "🌨️" },
    86: { label: "Heavy snow showers", icon: "🌨️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with hail", icon: "⛈️" },
    99: { label: "Thunderstorm with hail", icon: "⛈️" }
  };

  return weatherMap[code] || { label: "Weather update", icon: "🌤️" };
}

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    weatherError.textContent = "Please enter a city name before checking the weather.";
    weatherError.style.display = "block";
    cityInput.focus();
    return;
  }

  weatherError.textContent = "";
  weatherError.style.display = "none";

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("City lookup failed");
    }

    const geoData = await geoResponse.json();
    const location = geoData.results?.[0];

    if (!location) {
      throw new Error("City not found");
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Weather request failed");
    }

    const weatherData = await weatherResponse.json();
    const { temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code } = weatherData.current;
    const condition = getWeatherCodeLabel(weather_code);

    weatherIcon.textContent = condition.icon;
    weatherTemp.textContent = `${Math.round(temperature_2m)}°C`;
    weatherCondition.textContent = condition.label;
    weatherLocation.textContent = `${location.name}, ${location.country}`;
    humidityText.textContent = `${relative_humidity_2m}%`;
    windSpeedText.textContent = `${Math.round(wind_speed_10m)} km/h`;

    safeStorageSet(STORAGE_KEYS.weatherCity, city);
  } catch (error) {
    weatherError.textContent = `We couldn't load the weather for "${city}". Please check the spelling or try another city.`;
    weatherError.style.display = "block";
    weatherIcon.textContent = "⚠️";
    weatherTemp.textContent = "--°C";
    weatherCondition.textContent = "Weather unavailable";
    weatherLocation.textContent = "Try a different city";
    humidityText.textContent = "--";
    windSpeedText.textContent = "--";
    console.error("Weather request failed:", error);
  }
}

function loadSavedData() {
  const savedGoal = safeStorageGet(STORAGE_KEYS.goal, "");
  const savedReminder = safeStorageGet(STORAGE_KEYS.reminder, "");
  const savedWeatherCity = safeStorageGet(STORAGE_KEYS.weatherCity, "");

  if (savedGoal) {
    goalInput.value = savedGoal;
    goalDisplay.textContent = savedGoal;
  }

  if (savedReminder) {
    reminderInput.value = savedReminder;
    reminderDisplay.textContent = savedReminder;
  }

  if (savedWeatherCity) {
    cityInput.value = savedWeatherCity;
    getWeather();
  }
}

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

saveGoalButton.addEventListener("click", saveGoal);
goalInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveGoal();
  }
});

saveReminderButton.addEventListener("click", saveReminder);
reminderInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveReminder();
  }
});

weatherButton.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});

updateDateTime();
setInterval(updateDateTime, 1000);

renderTasks();
updateProgress();
updateRecommendation();
loadSavedData();
