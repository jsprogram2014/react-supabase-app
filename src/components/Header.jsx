import "../css/header.css";

function Header({ title = "Sales Team Dashboard" }) {
  return (
    <header className="header">
      <h1 className="header__title">
        <svg className="header__icon" viewBox="0 0 24 24" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
            <line x1="19.1" y1="4.9" x2="4.9" y2="19.1" />
          </g>
        </svg>
        {title}
      </h1>
    </header>
  );
}

export default Header;
