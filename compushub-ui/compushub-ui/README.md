# CompusHub UI

React (Vite) frontend for the CompusHub course project.

**Student:** Abdul Munir Ghiasi
**Course:** Enterprise Web App, Kabul University

## Ports

| App | URL |
|---|---|
| Spring Boot backend | http://localhost:8080 |
| React frontend (Vite) | http://localhost:5173 |

Course endpoint: `GET http://localhost:8080/api/v1/courses`

## Start commands

Backend (terminal 1, in the Spring Boot project):

```
./mvnw spring-boot:run
```

Frontend (terminal 2, in this project):

```
npm install
npm run dev
```

Open the URL printed by Vite and go to the **Courses** page.

If Vite uses a different port, change `@CrossOrigin` in `CourseController.java` to match.

## Short answers

**Why use useEffect here?** Fetching data is a side effect that must run after the component renders, once on mount. `useEffect(..., [])` does that without refetching on every render.

**What does setCourses do?** It stores the API response in state and tells React to re-render, so the table shows the returned records.

**Why can Postman work while a browser request fails?** Postman does not enforce CORS; browsers do. The backend must allow the frontend's exact origin (scheme, host, port), e.g. via `@CrossOrigin`.
