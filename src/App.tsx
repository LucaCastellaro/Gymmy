import './App.css';

import { Counter } from './components/counter';

const App = (): JSX.Element => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Counter></Counter>
    </>
  );
}

export default App;
