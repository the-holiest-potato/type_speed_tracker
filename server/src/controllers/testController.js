import { db } from "../db/index.js";
import { testResults, users } from "../db/schema.js";
import { eq, desc, and, sql } from "drizzle-orm";

export const saveTestResult = async (req, res) => {
  const { wpm, rawWpm, accuracy, mode } = req.body;

  try {
    const [newResult] = await db
      .insert(testResults)
      .values({
        userId: req.userId,
        wpm,
        rawWpm,
        accuracy,
        durationMode: mode,
      })
      .returning();

    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving test result" });
  }
};

export const getTestHistory = async (req, res) => {
  try {
    const history = await db
      .select()
      .from(testResults)
      .where(eq(testResults.userId, req.userId))
      .orderBy(desc(testResults.timestamp))
      .limit(50); // Limit to last 50 tests

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching test history" });
  }
};

export const getLeaderboard = async (req, res) => {
  const { mode } = req.params;

  try {
    // Subquery to find the best result (WPM, then accuracy) for each user in the given mode
    const leaderboard = await db
      .select({
        username: users.username,
        wpm: testResults.wpm,
        accuracy: testResults.accuracy,
        timestamp: testResults.timestamp,
      })
      .from(testResults)
      .innerJoin(users, eq(testResults.userId, users.id))
      .where(
        and(
          eq(testResults.durationMode, mode),
          sql`${testResults.id} IN (
            SELECT id FROM (
              SELECT id, ROW_NUMBER() OVER (
                PARTITION BY user_id 
                ORDER BY wpm DESC, accuracy DESC, timestamp ASC
              ) as rn
              FROM test_results
              WHERE duration_mode = ${mode}
            ) tmp WHERE rn = 1
          )`
        )
      )
      .orderBy(desc(testResults.wpm), desc(testResults.accuracy))
      .limit(10);

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};
