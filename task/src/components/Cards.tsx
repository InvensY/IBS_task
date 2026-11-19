import '../css/cards.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCharacters } from '../api/characters';
import type { Character } from '../types/character';
import Search from './Search';
import Swap from './Swap';

export default function Cards() {
  const [characters, setCharacter] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParam, setSearchParam] = useSearchParams();
  const name = searchParam.get('name') ?? '';
  const status = searchParam.get('status') ?? '';
  const page = Number(searchParam.get('page') ?? 1);

  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    setError(null);

    getCharacters({ page, name, status, signal: controller.signal })
      .then((data) => {
        if (!signal.aborted) {
          setCharacter(data.results);
          setTotalPages(data.info.pages);
        }
      })
      .catch((err) => {
        if (!signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [page, name, status]);
  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p className="error">Ошибка: {error}</p>;
  if (characters.length === 0) return <p className="nothing">Ничего не найдено</p>;

  const handleStatusClick = (value: string) => {
    const params = new URLSearchParams(searchParam);
    if (value) {
      params.set('status', value);
    } else {
      params.delete('status');
    }
    params.set('page', '1');
    setSearchParam(params);
  };
  const inputNameChange = (value: string) => {
    setNameInput(value);
  };

  const nextClick = () => {
    const params = new URLSearchParams(searchParam);
    if (page + 1 <= totalPages) {
      params.set('page', String(page + 1));
    }
    setSearchParam(params);
  };
  const previousClick = () => {
    const params = new URLSearchParams(searchParam);
    if (page - 1 >= 1) {
      params.set('page', String(page - 1));
    }
    setSearchParam(params);
  };

  const goToFirst = () => {
    const params = new URLSearchParams(searchParam);
    params.set('page', '1');
    setSearchParam(params);
  };
  const goToLast = () => {
    const params = new URLSearchParams(searchParam);
    params.set('page', String(totalPages));
    setSearchParam(params);
  };
  const clickToPage = (num: number) => {
    const params = new URLSearchParams(searchParam);
    params.set('page', String(num));
    setSearchParam(params);
  };

  const handleNameChange = () => {
    const params = new URLSearchParams(searchParam);
    if (nameInput) {
      params.set('name', nameInput);
    } else {
      params.delete('name');
    }
    params.set('page', '1');
    setSearchParam(params);
  };
  return (
    <>
      <Search
        name={nameInput}
        status={status}
        onNameChange={inputNameChange}
        onEnterClick={handleNameChange}
        onStatusChange={handleStatusClick}
      />
      <div className="cards-field">
        {characters.map((c) => (
          <div key={c.id} className="card">
            <img src={c.image} alt="Photo" />
            <div className="text-field">
              <p className="name">{c.name}</p>
              <p className={`status status--${c.status.toLowerCase()}`}>{c.status}</p>
              <p className="speciec">{c.species}</p>
            </div>
          </div>
        ))}
      </div>
      <Swap
        current={page}
        total={totalPages}
        previousPage={previousClick}
        nextPage={nextClick}
        clickPage={clickToPage}
        firstPage={goToFirst}
        lastPage={goToLast}
      />
    </>
  );
}
