import { getUserStorageBytes } from "../../database/userStorage";

export default defineEventHandler(async () => {
  // TEMP test user id — use a real one from your DB
  const TEST_USER_ID = "1";

  const total = await getUserStorageBytes(TEST_USER_ID);

  return { total };
});

