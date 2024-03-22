import './App.css';

function Title({text,line}) {
  return (
    <div className="title-container">
      <h1>{text}</h1>
      <h1>{line}</h1>
    </div>
  );
}

export default Title;