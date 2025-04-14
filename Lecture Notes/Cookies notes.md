1. `sessionStorage.setItem()` is an object in JS that allows you to store key/value pairs in the browser for the duration of a singles session.
- The data stored there is cleared when the browser tab or window is closed

2. `localStorage.setItem()` is a type of web storage that allows you to store data with no expiration date. Data will persist even when the browser is closed and reopened. 
- used for saving user preferences
- saving form data for recovery in case of page refresh
- can store usernames for remember me boxes

3. `document.cookie = "key/value"` small key value pair used for authentication and tracking activity. Information is saved to local system.
- can be session based or persistent
- domain specific but can be shared by client/server