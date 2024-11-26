import app from './app.js';
import { ConnectDB } from './db.js';

ConnectDB(); // Initiate database connection
app.listen(4000, () => console.log("Server running on port 4000"));
