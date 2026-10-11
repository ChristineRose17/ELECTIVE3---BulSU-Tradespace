const prisma = require('./prisma');

/**
 * Creates a notification in the database if:
 * 1. The recipient is different from the actor (no self-notifications).
 * 2. An identical unread notification for the same event doesn't already exist (no spam).
 */
async function createNotification({
  userId,
  actorId,
  type,
  title,
  listingId,
  claimId,
  relatedRequestId,
  relatedItemId,
  message,
}) {
  try {
    if (!userId) return null;
    // Do NOT notify a user about their own actions
    if (actorId && userId === actorId) return null;

    // Avoid duplicate notifications for the same event if already present
    const existing = await prisma.notification.findFirst({
      where: {
        userId,
        actorId: actorId || null,
        type,
        listingId: listingId || relatedItemId || null,
        relatedRequestId: relatedRequestId || null,
        claimId: claimId || null,
        isRead: false,
      },
    });

    if (existing) {
      return existing;
    }

    return await prisma.notification.create({
      data: {
        userId,
        actorId: actorId || null,
        type,
        title: title || null,
        listingId: listingId || relatedItemId || null,
        relatedRequestId: relatedRequestId || null,
        relatedItemId: relatedItemId || listingId || null,
        claimId: claimId || null,
        message,
        isRead: false,
      },
    });
  } catch (err) {
    console.error('Failed to create notification:', err);
    return null;
  }
}

module.exports = { createNotification };

