import { ArtifactKind } from "@/components/artifact";
// import { generateUUID } from '../utils';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function getUser(email: string) {
//   try {
//     return await prisma.user.findMany({
//       where: { email: email },
//     });
//   } catch (error) {
//     console.error("Failed to get user from database");
//     throw error;
//   }
// }

// export async function createUser(email: string, password: string) {
//   const hashedPassword = generateHashedPassword(password);

//   try {
//     return await prisma.user.create({
//       data: { email: email, password: hashedPassword },
//     });
//   } catch (error) {
//     console.error("Failed to create user in database");
//     throw error;
//   }
// }

// export async function createGuestUser() {
//   const email = `guest-${Date.now()}`;
//   const password = generateHashedPassword(generateUUID());

//   try {
//     return await prisma.user.create({
//       data: { email: email, password: password },
//       select: { id: true, email: true },
//     });
//   } catch (error) {
//     console.error('Failed to create guest user in database');
//     throw error;
//   }
// }

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await prisma.chat.create({
      data: {
        id: id,
        createdAt: new Date(),
        userId: userId,
        title: title,
      },
    });
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await prisma.vote.deleteMany({
      where: { chatId: id },
    });
    await prisma.message.deleteMany({
      where: { chatId: id },
    });

    return await prisma.chat.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error("Failed to delete chat by id from database");
    throw error;
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;
    let cursor:
      | { createdAt: Date; id?: string }
      | { createdAt: Date; id?: string }
      | undefined;
    let comparison: "lt" | "gt" | undefined;

    if (startingAfter) {
      const selectedChat = await prisma.chat.findUnique({
        where: { id: startingAfter },
        select: { createdAt: true },
      });
      if (!selectedChat) {
        throw new Error(`Chat with id ${startingAfter} not found`);
      }
      cursor = { createdAt: selectedChat.createdAt };
      comparison = "lt";
    } else if (endingBefore) {
      const selectedChat = await prisma.chat.findUnique({
        where: { id: endingBefore },
        select: { createdAt: true },
      });
      if (!selectedChat) {
        throw new Error(`Chat with id ${endingBefore} not found`);
      }
      cursor = { createdAt: selectedChat.createdAt };
      comparison = "gt";
    }

    const chats = await prisma.chat.findMany({
      where: {
        userId: id,
        createdAt: cursor
          ? comparison === "lt"
            ? { lt: cursor.createdAt }
            : comparison === "gt"
              ? { gt: cursor.createdAt }
              : undefined
          : undefined,
      },
      orderBy: { createdAt: "desc" },
      take: extendedLimit,
      ...(cursor && {
        skip: 1,
        // cursor:{createdAt:cursor.createdAt}
      }),
    });
    // const chats = await prisma.chat.findMany({
    //   where: {
    //     userId: id,
    //     createdAt: cursor
    //       ? comparison === "lt"
    //         ? { lt: cursor.createdAt }
    //         : comparison === "gt"
    //           ? { gt: cursor.createdAt }
    //           : undefined
    //       : undefined,
    //   },
    //   orderBy: { createdAt: "desc" },
    //   take: extendedLimit,
    //   ...(cursor && {
    //     skip: 1,
    //     cursor: { createdAt: cursor.createdAt },
    //   }),
    // });

    const hasMore = chats.length > limit;

    return {
      chats: hasMore ? chats.slice(0, limit) : chats,
      hasMore,
    };
  } catch (error) {
    console.error("Failed to get chats by user from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    return await prisma.chat.findUnique({
      where: { id: id },
    });
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<{
    id: string;
    chatId: string;
    role: string;
    parts: any;
    attachments: any;
    createdAt: Date;
  }>;
}) {
  try {
    return await prisma.message.createMany({
      data: messages,
    });
  } catch (error) {
    console.error("Failed to save messages in database", error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await prisma.message.findMany({
      where: { chatId: id },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Failed to get messages by chat id from database", error);
    throw error;
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  try {
    const existingVote = await prisma.vote.findUnique({
      where: {
        chatId_messageId: {
          chatId: chatId,
          messageId: messageId,
        },
      },
    });

    if (existingVote) {
      return await prisma.vote.update({
        where: {
          chatId_messageId: {
            chatId: chatId,
            messageId: messageId,
          },
        },
        data: { isUpvoted: type === "up" },
      });
    }

    return await prisma.vote.create({
      data: {
        chatId: chatId,
        messageId: messageId,
        isUpvoted: type === "up",
      },
    });
  } catch (error) {
    console.error("Failed to upvote message in database", error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await prisma.vote.findMany({
      where: { chatId: id },
    });
  } catch (error) {
    console.error("Failed to get votes by chat id from database", error);
    throw error;
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
}) {
  try {
    return await prisma.document.create({
      data: {
        id: id,
        title: title,
        kind: kind,
        content: content,
        userId: userId,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to save document in database");
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    return await prisma.document.findMany({
      where: { id: id },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Failed to get document by id from database");
    throw error;
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    return await prisma.document.findFirst({
      where: { id: id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to get document by id from database");
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await prisma.suggestion.deleteMany({
      where: {
        documentId: id,
        documentCreatedAt: { gt: timestamp },
      },
    });

    return await prisma.document.deleteMany({
      where: {
        id: id,
        createdAt: { gt: timestamp },
      },
    });
  } catch (error) {
    console.error(
      "Failed to delete documents by id after timestamp from database"
    );
    throw error;
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Array<{
    id: string;
    documentId: string;
    documentCreatedAt: Date;
    originalText: string;
    suggestedText: string;
    description: string | null;
    isResolved: boolean;
    userId: string;
    createdAt: Date;
  }>;
}) {
  try {
    return await prisma.suggestion.createMany({
      data: suggestions,
    });
  } catch (error) {
    console.error("Failed to save suggestions in database");
    throw error;
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await prisma.suggestion.findMany({
      where: { documentId: documentId },
    });
  } catch (error) {
    console.error(
      "Failed to get suggestions by document version from database"
    );
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await prisma.message.findUnique({
      where: { id: id },
    });
  } catch (error) {
    console.error("Failed to get message by id from database");
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await prisma.message.findMany({
      where: {
        chatId: chatId,
        createdAt: { gte: timestamp },
      },
      select: { id: true },
    });

    const messageIds = messagesToDelete.map((message) => message.id);

    if (messageIds.length > 0) {
      await prisma.vote.deleteMany({
        where: {
          chatId: chatId,
          messageId: { in: messageIds },
        },
      });

      return await prisma.message.deleteMany({
        where: {
          chatId: chatId,
          id: { in: messageIds },
        },
      });
    }
  } catch (error) {
    console.error(
      "Failed to delete messages by id after timestamp from database"
    );
    throw error;
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    return await prisma.chat.update({
      where: { id: chatId },
      data: { visibility: visibility },
    });
  } catch (error) {
    console.error("Failed to update chat visibility in database");
    throw error;
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - differenceInHours * 60 * 60 * 1000
    );

    const stats = await prisma.message.count({
      where: {
        chat: {
          userId: id,
        },
        createdAt: { gte: twentyFourHoursAgo },
        role: "user",
      },
    });

    return stats;
  } catch (error) {
    console.error(
      "Failed to get message count by user id for the last 24 hours from database"
    );
    throw error;
  }
}
