import './Header.css';

type HeaderProps = {
  black: boolean;
};
export default ({ black }: HeaderProps) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className="header--logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"></img>
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="https://i.pinimg.com/474x/ba/2e/44/ba2e4464e0d7b1882cc300feceac683c--things-to-watch-holiday-baking.jpg"></img>
        </a>
      </div>
    </header>
  );
};
