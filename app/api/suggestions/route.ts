// import { auth } from '@/app/(auth)/auth';
// import { getSuggestionsByDocumentId } from '@/lib/db/queries';

import { getSuggestionsByDocumentId } from "@/actions/chat";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get("documentId");

  if (!documentId) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const suggestions = await getSuggestionsByDocumentId({
    documentId,
  });

  const [suggestion] = suggestions;

  if (!suggestion) {
    return Response.json([], { status: 200 });
  }

  if (suggestion.userId !== session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json(suggestions, { status: 200 });
}
