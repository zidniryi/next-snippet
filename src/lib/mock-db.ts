// Simple in-memory database for demo purposes
const snippets: Array<{id: number; title: string; code: string; createdAt: Date}> = [];
let nextId = 1;

export const mockDb = {
	snippet: {

		findMany: async (options?: {orderBy?: {id: 'desc' | 'asc'}}) => {
			let result = [...snippets];
			if (options?.orderBy?.id === 'desc') {
				result = result.sort((a, b) => b.id - a.id);
			} else if (options?.orderBy?.id === 'asc') {
				result = result.sort((a, b) => a.id - b.id);
			}
			return result;
		},
		findUnique: async ({where}: {where: {id: number}}) => {
			return snippets.find(s => s.id === where.id) || null;
		},
		create: async ({data}: {data: {title: string; code: string}}) => {
			const snippet = {
				id: nextId++,
				title: data.title,
				code: data.code,
				createdAt: new Date()
			};
			snippets.push(snippet);
			return snippet;
		},
		update: async ({where, data}: {where: {id: number}; data: {title: string; code: string}}) => {
			const index = snippets.findIndex(s => s.id === where.id);
			if (index === -1) throw new Error('Snippet not found');
			snippets[index] = {...snippets[index], ...data};
			return snippets[index];
		},
		delete: async ({where}: {where: {id: number}}) => {
			const index = snippets.findIndex(s => s.id === where.id);
			if (index === -1) throw new Error('Snippet not found');
			return snippets.splice(index, 1)[0];
		}
	}
};
