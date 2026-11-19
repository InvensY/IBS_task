import '../css/swap.css';

interface SwapProps {
  total: number;
  current: number;
  nextPage: (page: number) => void;
  previousPage: (page: number) => void;
  clickPage: (page: number) => void;
  firstPage: (page: number) => void;
  lastPage: (page: number) => void;
}

export default function Swap({
  current,
  total,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  clickPage,
}: SwapProps) {
  const buttons = () => {
    let next = current + 1;
    let previous = current - 1;
    return (
      <div className="field-number-buttons">
        {previous < 1 ? null : (
          <button
            value={previous}
            onClick={(e) => clickPage(Number(e.currentTarget.value))}
            className="buttons previous-button"
          >
            {previous}
          </button>
        )}
        <button className="buttons current-button">{current}</button>
        {next > total ? null : (
          <button
            value={next}
            onClick={(e) => clickPage(Number(e.currentTarget.value))}
            className="buttons next-button"
          >
            {next}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="field-buttons">
      <button className="buttons button-prev" onClick={() => previousPage(current - 1)}>
        &lt;
      </button>
      {current === 1 || current === 2 ? (
        <div className="empty-field"></div>
      ) : (
        <button onClick={() => firstPage((current = 1))} className="buttons first-page">
          1
        </button>
      )}
      {buttons()}
      {current === total || current === total - 1 ? (
        <div className="empty-field"></div>
      ) : (
        <button onClick={() => lastPage((current = total))} className="buttons last-page">
          {total}
        </button>
      )}
      <button className="buttons button-next" onClick={() => nextPage(current + 1)}>
        &gt;
      </button>
    </div>
  );
}
