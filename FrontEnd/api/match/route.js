import { NextResponse } from "next/server";
import { openai } from "@/app/lib/openai";
import { cosineSimilarity } from "@/app/lib/similarity";
import { consultants } from "@/app/data/consultants";

export async function POST(req) {
	const { clientNeed } = await req.json();

	// Embed client intent
	const clientEmbeddingRes = await openai.embeddings.create({
		model: "text-embedding-3-large",
		input: clientNeed,
	});

	const clientEmbedding = clientEmbeddingRes.data[0].embedding;

	// Embed consultants + score
	const scored = await Promise.all(
		consultants.map(async (c) => {
			const embRes = await openai.embeddings.create({
				model: "text-embedding-3-large",
				input: `${c.skillsText}. ${c.projectsText}`,
			});

			const similarity = cosineSimilarity(
				clientEmbedding,
				embRes.data[0].embedding,
			);

			const finalScore = similarity * 0.7 + (c.successScore / 5) * 0.3;

			return {
				...c,
				similarity,
				finalScore,
			};
		}),
	);

	const ranked = scored.sort((a, b) => b.finalScore - a.finalScore).slice(0, 5);

	return NextResponse.json(ranked);
}
