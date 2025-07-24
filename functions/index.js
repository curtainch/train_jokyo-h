const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.database();

// 毎日深夜3時に古い遅延情報を削除
exports.cleanupOldDelays = functions.pubsub
    .schedule("every day 03:00")
    .timeZone("Asia/Tokyo")
    .onRun(async (context) => {
      const now = Date.now();
      const cutoff = now - 1000 * 60 * 60 * 24 * 14; // 14日前

      const snapshot = await db.ref("/delayInfos").once("value");
      const updates = {};

      snapshot.forEach((child) => {
        const delay = child.val();
        if (delay.date && new Date(delay.date).getTime() < cutoff) {
          updates[child.key] = null; // 削除マーク
        }
      });

      if (Object.keys(updates).length > 0) {
        await db.ref("/delayInfos").update(updates);
        console.log(
            `Deleted ${Object.keys(updates).length} old delay records.`,
        );
      } else {
        console.log("No outdated delays found.");
      }

      return null;
    });
