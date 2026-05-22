import "./sticky-notes.scss";

import { useGetStickyNotesQuery } from "../../../app/redux/meal-planner/sticky-notes.api";

const StickyNotesPage = () => {
  const { data, error, isLoading } = useGetStickyNotesQuery();
  const notes = !error && data ? data : [];

  return (
    <div className="sticky-notes-app">
      <div className="sticky-notes-app">
        <div className="sticky-page d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <div className="sticky-container d-flex flex-column align-items-center gap-4">
            {isLoading && <div>Loading...</div>}
            {notes.length === 0 && !isLoading && (
              <div className="text-muted">No sticky notes found.</div>
            )}
            {notes.map((note, idx) => (
              <div
                key={note.id || idx}
                className={`sticky-note ${idx % 2 === 0 ? "rotate-left" : "rotate-right"} position-relative p-4`}
              >
                <div className="pin"></div>
                <div className="sticky-content d-flex align-items-start gap-3 mt-3">
                  <div className="sticky-text fw-semibold">
                    <div className="mb-1">{note.title}</div>
                    <div className="fs-7 text-muted">{note.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNotesPage;
