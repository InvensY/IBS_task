import '../css/search.css';

interface SearchProps {
  name: string;
  status: string;
  onNameChange: (value: string) => void;
  onEnterClick: () => void;
  onStatusChange: (value: string) => void;
}

export default function Search({
  name,
  status,
  onNameChange,
  onEnterClick,
  onStatusChange,
}: SearchProps) {
  return (
    <div className="search-field">
      <input
        placeholder="Поиск по имени..."
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnterClick();
          }
        }}
        type="text"
        name=""
        id=""
      />
      <select
        className="status-select"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">Все статусы</option>
        <option value="alive">Живые</option>
        <option value="dead">Мертвые</option>
        <option value="unknown">Неизвестно</option>
      </select>
    </div>
  );
}
