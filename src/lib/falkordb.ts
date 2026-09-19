import { FalkorDB } from "falkordb";

// Reuse connection if it exists in dev
const globalForFalkor = globalThis as unknown as {
  falkorDbInstance: Promise<FalkorDB> | undefined;
};

const falkorPromise = globalForFalkor.falkorDbInstance ?? FalkorDB.connect({
  url: process.env.FALKORDB_URL || "redis://localhost:6379",
});

if (process.env.NODE_ENV !== "production") globalForFalkor.falkorDbInstance = falkorPromise;

export async function logChatMessageToGraph(sessionId: string, userMessage: string, aiResponse: string) {
  try {
    const falkor = await falkorPromise;
    const graph = falkor.selectGraph("avs_chat_graph");
    
    // Create nodes and relationships using Cypher
    await graph.query(`
      MERGE (s:Session {id: $sessionId})
      CREATE (msg:Message {content: $userMessage, timestamp: timestamp(), role: 'user'})
      CREATE (reply:Message {content: $aiResponse, timestamp: timestamp(), role: 'ai'})
      CREATE (s)-[:HAS_MESSAGE]->(msg)
      CREATE (msg)-[:HAS_REPLY]->(reply)
    `, {
      params: { sessionId, userMessage, aiResponse }
    });
    console.log("Logged to FalkorDB");
  } catch (err) {
    console.error("FalkorDB logging error:", err);
  }
}

export { falkorPromise as falkor };
