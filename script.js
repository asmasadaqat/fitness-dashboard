// 1. Declare workouts array at the VERY TOP
let workouts = [];

// 2. Load saved workouts from localStorage (if any)
const saved = localStorage.getItem('workouts');
if (saved) {
  workouts = JSON.parse(saved);
}

// 3. Get elements from the page
const form = document.getElementById('workout-form');
const logsList = document.getElementById('logs-list');
const totalWorkouts = document.getElementById('total-workouts');
const totalTime = document.getElementById('total-time');

// 4. Event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get input values
  const type = document.getElementById('workout-type').value.trim();
  const duration = parseInt(document.getElementById('workout-duration').value);
  const notes = document.getElementById('workout-notes').value.trim();

  if (type === '' || isNaN(duration) || duration < 1) {
    alert('Please enter a valid workout and duration.');
    return;
  }

  // Add workout to array
  workouts.push({ type, duration, notes });
  // Save to localStorage after adding
  localStorage.setItem('workouts', JSON.stringify(workouts));
  renderWorkouts();
  form.reset();
});

// 5. Function to render workouts
function renderWorkouts() {
  logsList.innerHTML = '';
  let total = 0;

  workouts.forEach((workout, index) => {
  total += workout.duration;

  // Pick an emoji icon based on workout type
  const icon = workout.type.toLowerCase().includes("run")
    ? "🏃‍♂️"
    : workout.type.toLowerCase().includes("yoga")
    ? "🧘‍♂️"
    : workout.type.toLowerCase().includes("cycling")
    ? "🚴‍♂️"
    : "💪"; // default icon

  const li = document.createElement('li');
  li.innerHTML = `
    <span style="font-size:1.3em;">${icon}</span>
    <strong>${workout.type}</strong> - ${workout.duration} min
    <button onclick="removeWorkout(${index})">Remove</button>
    <div>
      <a href="#" onclick="toggleNotes(event, ${index})">Show Notes</a>
      <div id="notes-${index}" style="display: none; margin-top:5px;">${workout.notes}</div>
    </div>
  `;
  logsList.appendChild(li);
});

  totalWorkouts.textContent = workouts.length;
  totalTime.textContent = total;
}

// 6. Remove a workout
window.removeWorkout = function(index) {
  workouts.splice(index, 1);
  // Save to localStorage after removing
  localStorage.setItem('workouts', JSON.stringify(workouts));
  renderWorkouts();
};

// 7. Show/hide notes for a workout
window.toggleNotes = function(event, index) {
  event.preventDefault();
  const notesDiv = document.getElementById('notes-' + index);
  if (notesDiv.style.display === 'none') {
    notesDiv.style.display = 'block';
  } else {
    notesDiv.style.display = 'none';
  }
};

// 8. Render workouts on page load
renderWorkouts();
