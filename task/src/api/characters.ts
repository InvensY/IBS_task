import type { CharacterResponse } from '../types/character';

export async function getCharacters(params: {
  page: number;
  name?: string;
  status?: string;
  signal?: AbortSignal;
}): Promise<CharacterResponse> {
  const search = new URLSearchParams();
  search.append('page', String(params.page));
  if (params.name) search.append('name', params.name);
  if (params.status) search.append('status', params.status);

  const url = `https://rickandmortyapi.com/api/character/?${search.toString()}`;
  const res = await fetch(url, { signal: params.signal });

  if (res.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
