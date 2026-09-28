Create a polished, modern, student-friendly daily dashboard website called “DayFlow” that a student could realistically use every day.

The goal is to create a visually impressive but easy-to-use dashboard that helps students organize their tasks, check the weather, set a daily goal, remember important things, and receive a smart recommendation based on their progress.

TECHNOLOGIES:  
\- HTML  
\- CSS  
\- JavaScript  
\- Use clean, organized, beginner-friendly code.  
\- Keep HTML, CSS, and JavaScript separated into appropriate files.  
\- Do not use unnecessary frameworks unless absolutely needed.  
\- The website should work smoothly in a standard web browser.  
\- Make the code easy for a student to understand and explain during a presentation.

REQUIRED FEATURES:

1\. TODAY’S TASKS  
Create a “Today’s Tasks” section where the user can:  
\- Add a new task using a text input.  
\- Click a button to add the task.  
\- Display tasks in a clean list.  
\- Mark tasks as completed.  
\- Visually distinguish completed tasks from unfinished tasks.  
\- Allow tasks to be removed.  
\- Show how many tasks are completed versus remaining.

Example:  
☐ Finish math homework  
☐ Study for science  
☑ Read 20 pages

2\. TODAY’S WEATHER  
Add a “Today’s Weather” section that uses a weather API.

The weather section should display:  
\- Current temperature  
\- Weather condition  
\- City/location  
\- Weather icon if available  
\- Optional additional information such as humidity or wind speed

Allow the user to enter a city or location and click a button to retrieve the weather.

If an API key is required, clearly explain where the user should place their API key and use a placeholder rather than exposing a real key.

Include graceful error handling if:  
\- The city cannot be found  
\- The API request fails  
\- The user leaves the input empty

3\. DAILY GOAL  
Create a “Daily Goal” section.

Allow the user to type a goal for the day, such as:  
“Finish all my homework”  
“Exercise for 30 minutes”  
“Read 20 pages”

Add a button that saves/displays the goal.

Make the goal visually noticeable and motivating.

4\. DAILY REMINDER  
Create a “Daily Reminder” section.

Allow the user to enter a reminder and display it prominently.

Examples:  
“Bring my science project tomorrow.”  
“Practice piano at 6 PM.”  
“Remember to study for the quiz.”

Include a button that allows the user to update the reminder.

5\. SMART RECOMMENDATION  
Create a “Smart Recommendation” feature using JavaScript if/else logic.

The recommendation should change depending on the user's progress.

For example:  
\- IF the user has many unfinished tasks, recommend focusing on the most important task.  
\- ELSE IF the user has completed most tasks, congratulate them and recommend taking a short break.  
\- ELSE recommend continuing with the next task.

Make the recommendation dynamic so it updates when the user completes or adds tasks.

Clearly use actual JavaScript if/else statements because this is a required part of the assignment.

6\. USER INPUT  
The website must include multiple user inputs, such as:  
\- Task input  
\- Goal input  
\- Reminder input  
\- City/weather input

Make sure the inputs are visually clear and easy to use.

7\. BUTTONS  
Include interactive buttons such as:  
\- Add Task  
\- Complete Task  
\- Remove Task  
\- Save Goal  
\- Save Reminder  
\- Check Weather

Buttons should have hover effects and clear labels.

8\. DESIGN  
Make the website look professional and impressive while still being appropriate for a student project.

Use:  
\- A clean modern layout  
\- Rounded cards  
\- Soft shadows  
\- Good spacing  
\- Large readable text  
\- Consistent typography  
\- Smooth hover effects  
\- Subtle animations  
\- Responsive design

The dashboard should look like a real modern productivity app rather than a basic school website.

Suggested layout:

HEADER:  
“DayFlow”  
“Your daily student dashboard”

TOP AREA:  
\- Current date  
\- Greeting such as “Good afternoon\!”  
\- Short motivational message

MAIN DASHBOARD:  
Create a responsive grid of cards:

\[ Today’s Tasks \] \[ Weather \]

\[ Daily Goal \] \[ Daily Reminder \]

\[ Smart Recommendation \]

Include a small progress indicator showing the user's task completion percentage.

9\. RESPONSIVE DESIGN  
The website must work on:  
\- Desktop  
\- Laptop  
\- Tablet  
\- Mobile phone

On smaller screens, cards should automatically stack vertically.

10\. DATE AND TIME  
Use JavaScript to automatically display:  
\- Current date  
\- Current day  
\- Current time

The time should update automatically without refreshing the page.

11\. DATA STORAGE  
Use localStorage if possible so that tasks, the daily goal, and reminder remain saved when the page is refreshed.

12\. USER EXPERIENCE  
Make the dashboard feel interactive.

Examples:  
\- When a task is completed, update the progress percentage.  
\- When all tasks are completed, show a positive message.  
\- When the user adds a task, immediately update the task counter.  
\- When the user changes their goal, update the displayed goal.  
\- When the user changes their reminder, update the displayed reminder.  
\- Update the smart recommendation automatically whenever task progress changes.

13\. ACCESSIBILITY  
Make the website accessible and easy to use:  
\- Use labels for inputs.  
\- Use readable font sizes.  
\- Make buttons easy to identify.  
\- Ensure sufficient contrast.  
\- Allow keyboard navigation where possible.  
\- Use semantic HTML.

14\. ERROR HANDLING  
Do not allow the website to break because of incorrect input.

For example:  
\- Prevent empty tasks from being added.  
\- Prevent empty goals from being saved.  
\- Prevent empty reminders from being saved.  
\- Show friendly error messages.  
\- Handle weather API errors gracefully.

15\. CODE QUALITY  
Write clean, organized code with helpful comments.

Do not put everything into one giant JavaScript function.

Use separate functions such as:  
\- addTask()  
\- removeTask()  
\- completeTask()  
\- updateProgress()  
\- saveGoal()  
\- saveReminder()  
\- getWeather()  
\- updateRecommendation()  
\- updateDateTime()

Use meaningful variable and function names.

16\. PRESENTATION REQUIREMENT  
This project will be presented to a class for approximately 3–5 minutes.

Because of this, make the code easy to explain.

Include comments explaining important sections, especially:  
\- How user input works  
\- How tasks are added  
\- How task completion is tracked  
\- How the weather API works  
\- How if/else logic creates the smart recommendation  
\- How localStorage saves information

17\. FINAL RESULT  
The finished website should feel like a real student productivity dashboard, not just a collection of required assignment features.

Prioritize:  
\- Professional appearance  
\- Smooth interactions  
\- Simple navigation  
\- Clear organization  
\- Functional JavaScript  
\- Beginner-friendly code  
\- Good visual design  
\- Reliable error handling

Before finishing, check the entire project for bugs and make sure every required feature actually works.

Also provide a short explanation after the code explaining:  
1\. What each major section does  
2\. How the JavaScript works  
3\. Where the if/else logic is used  
4\. How the weather API works  
5\. How localStorage works  
6\. What I should demonstrate during my 3–5 minute presentation

Do not just create a visual mockup. Build a fully functional website.  
