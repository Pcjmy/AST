import React, { useState } from 'react';

const a = 1;

const App = () => {
  return <div>123</div>
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
