const { Client } = require('pg');
const cron = require('node-cron');

// PostgreSQL connection configuration
const dbConfig = {
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
};

// Initialize PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    // Start the scheduled job
    startScheduledJob();
  })
  .catch(error => console.error('Error connecting to PostgreSQL database', error));

// Function to start the scheduled job
function startScheduledJob() {
  // Schedule a job to run every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Running scheduled job...');

    try {
      // Query for users whose role has changed from "ider" to "driver"
      const queryText = `
        DELETE FROM riders
        WHERE user_id IN (
          SELECT id
          FROM users
          WHERE role = 'driver'
          AND role != 'rider'
        );
      `;

      // Execute the query
      const result = await client.query(queryText);
      console.log(`${result.rowCount} record(s) deleted from riders table`);
    } catch (error) {
      console.error('Error executing scheduled job:', error);
    }
  }, {
    scheduled: true,
    timezone: 'UTC', // Set your desired timezone here
  });

  console.log('Scheduled job started');
}
