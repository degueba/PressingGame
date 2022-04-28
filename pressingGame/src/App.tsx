import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.scss";
import { startConnection } from "./config/connection";

function App() {
  const [isWinner, setIsWinner] = useState<Boolean>(false);

  const pressButton = async (): Promise<void> => {
    try {
      const AMOUNT = ethers.utils.parseEther("0.001");
      await window.Contract.pressingGame.pressButton({
        value: AMOUNT,
      });
      alert("Good luck, you are in the game!");
    } catch (e: any) {
      if (e.data.message.includes("Game finished")) {
        alert("Game is not finished.");
      }
    }
  };

  const watchBlocks = async (): Promise<void> => {
    window.Provider.on("block", async (blockNumber: number) => {
      let isWinner = await window.Contract.pressingGame.checkWinner();
      setIsWinner(isWinner);
    });
  };

  const claimTreasure = async (): Promise<void> => {
    const tx = await window.Contract.pressingGame.withdraw();
    if (tx) {
      alert("You have won.");
      setIsWinner(false);
    }
  };

  useEffect((): void => {
    startConnection().then(watchBlocks);
  }, []);

  return (
    <div className="pressinggame">
      <div className="pressinggame__content">
        <a className="pressinggame__logo">
          <small>Pressing game by</small>
          <img
            src={"https://www.oneof.com/wp-content/uploads/2022/03/ONO.svg"}
          />
        </a>
        {isWinner ? (
          <button
            className="pressinggame__button pressinggame__button--claimtreasure"
            onClick={claimTreasure}
          >
            Claim Treasure
          </button>
        ) : (
          <button className="pressinggame__button" onClick={pressButton}>
            Press Button
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
