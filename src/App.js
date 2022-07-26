import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [selected, setSelected] = useState();

  const onChange = (event) => {
    setMoney(event.target.value);
    console.log(event.target.value);
  };
  const onSelect = (event) => {
    setSelected(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  console.log(typeof money);
  console.log(typeof selected);

  return (
    <div className="App">
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onSelect} value={selected}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <input
            onChange={onChange}
            value={money}
            type="number"
            placeholder="환전할 금액을 알려주세요"
          />
          <h3>{money / selected}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
