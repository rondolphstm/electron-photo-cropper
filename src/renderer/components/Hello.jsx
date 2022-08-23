import { Link } from 'react-router-dom';

export default function Hello() {
  return (
    <div>
      <div className="Hello">
        <h1>My photo Crooper</h1>
      </div>
      <div className="Hello">
        <Link to="/photo">
          <button type="button">
            <span role="img" aria-label="camera">
              📷
            </span>
            crop photo
          </button>
        </Link>
      </div>
    </div>
  );
}
