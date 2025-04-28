import { ArtifactKind } from '@/components/artifact';
import { generateUUID } from '../utils';
import { generateHashedPassword } from './utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser(email: string) {
  try {
    return await prisma.user.findMany({
      where: { email: email },
    });
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const hashedPassword = generateHashedPassword(password);

  try {
    return await prisma.user.create({
      data: { email: email, password: hashedPassword },
    });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
}

export async function createGuestUser() {
  const email = `guest-${Date.now()}`;
  const password = generateHashedPassword(generateUUID());

  try {
    return await prisma.user.create({
      data: { email: email, password: password },
      select: { id: true, email: true },
    });
  } catch (error) {
    console.error('Failed to create guest user in database');
    throw error;
  }
}

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
    console.error('Failed to save chat in database');
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await prisma.vote_v2.deleteMany({
      where: { chatId: id },
    });
    await prisma.message_v2.deleteMany({
      where: { chatId: id },
    });

    return await prisma.chat.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error('Failed to delete chat by id from database');
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
    let comparison: 'lt' | 'gt' | undefined;

    if (startingAfter) {
      const selectedChat = await prisma.chat.findUnique({
        where: { id: startingAfter },
        select: { createdAt: true },
      });
      if (!selectedChat) {
        throw new Error(`Chat with id ${startingAfter} not found`);
      }
      cursor = { createdAt: selectedChat.createdAt };
      comparison = 'lt';
    } else if (endingBefore) {
      const selectedChat = await prisma.chat.findUnique({
        where: { id: endingBefore },
        select: { createdAt: true },
      });
      if (!selectedChat) {
        throw new Error(`Chat with id ${endingBefore} not found`);
      }
      cursor = { createdAt: selectedChat.createdAt };
      comparison = 'gt';
    }

    const chats = await prisma.chat.findMany({
      where: {
        userId: id,
        createdAt: cursor
          ? comparison === 'lt'
            ? { lt: cursor.createdAt }
            : comparison === 'gt'
            ? { gt: cursor.createdAt }
            : undefined
          : undefined,
      },
      orderBy: { createdAt: 'desc' },
      take: extendedLimit,
      ...(cursor && {
        skip: 1,
        cursor: { createdAt: cursor.createdAt },
      }),
    });

    const hasMore = chats.length > limit;

    return {
      chats: hasMore ? chats.slice(0, limit) : chats,
      hasMore,
    };
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    return await prisma.chat.findUnique({
      where: { id: id },
    });
  } catch (error) {
    console.error('Failed to get chat by id from database');
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
    return await prisma.message_v2.createMany({
      data: messages,
    });
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await prisma.message_v2.findMany({
      where: { chatId: id },
      orderBy: { createdAt: 'asc' },
    });
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
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
  type: 'up' | 'down';
}) {
  try {
    const existingVote = await prisma.vote_v2.findUnique({
      where: {
        chatId_messageId: {
          chatId: chatId,
          messageId: messageId,
        },
      },
    });

    if (existingVote) {
      return await prisma.vote_v2.update({
        where: {
          chatId_messageId: {
            chatId: chatId,
            messageId: messageId,
          },
        },
        data: { isUpvoted: type === 'up' },
      });
    }

    return await prisma.vote_v2.create({
      data: {
        chatId: chatId,
        messageId: messageId,
        isUpvoted: type === 'up',
      },
    });
  } catch (error) {
    console.error('Failed to upvote message in database', error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await prisma.vote_v2.findMany({
      where: { chatId: id },
    });
  } catch (error) {
    console.error('Failed to get votes by chat id from database', error);
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
    console.error('Failed to save document in database');
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    return await prisma.document.findMany({
      where: { id: id },
      orderBy: { createdAt: 'asc' },
    });
  } catch (