import Game from "./game";

export class BowlingGame implements Game {
  private tries: Array<number> = [];
  private bonusTries: number = 0;
  private nbTries: number;

  constructor(rounds: number = 10) {
    this.nbTries = rounds * 2;
  }

  public roll(pinfall: number) {
    if (this.isGameOver()) throw "Game over.";

    if (this.isNewFrame() && this.isStrike(pinfall)) {
      if (this.nbTries == 2) {
        this.attributeBonusTries(2);
        this.finishMatch();
      } else if (this.nbTries > 2) {
        this.nbTries -= 2;
      }
    } else if (this.hasSpareInLastTry(pinfall)) {
      this.attributeBonusTries(1);
      this.finishMatch();
    } else if (this.hasBonus()) this.bonusTries--;
    else this.nbTries--;

    this.tries.push(pinfall);
  }

  private isNewFrame(): boolean {
    return this.nbTries % 2 == 0;
  }

  private attributeBonusTries(nbOfTries: number) {
    this.bonusTries = nbOfTries;
  }

  private finishMatch(): void {
    this.nbTries = 0;
  }

  private hasSpareInLastTry(pinfall): boolean {
    return (
      this.nbTries == 1 &&
      this.isSpare(pinfall + this.tries[this.tries.length - 1])
    );
  }

  private hasBonus(): boolean {
    return this.nbTries == 0 && this.bonusTries > 0;
  }

  private isGameOver() {
    return this.nbTries + this.bonusTries == 0;
  }

  public score(): number {
    let finalScore = 0,
      index = 0;

    while (index < this.tries.length) {
      const firstTryPinfall = this.tries[index];
      finalScore += firstTryPinfall;

      if (this.isStrike(firstTryPinfall)) {
        const nextTryFirstPinfall = this.tries[index + 1],
          nextTrySecondPinfall = this.tries[index + 2];

        finalScore += nextTryFirstPinfall + nextTrySecondPinfall;

        if (this.bonusAlreadyAdded(index)) {
          break;
        }

        index += 1;
      } else {
        const secondTryPinfall = this.tries[index + 1];
        finalScore += secondTryPinfall;

        if (this.isSpare(firstTryPinfall + secondTryPinfall)) {
          const nextTryPinfall = this.tries[index + 2];
          finalScore += nextTryPinfall;
        }

        if (this.bonusAlreadyAdded(index)) {
          break;
        }

        index += 2;
      }
    }

    return finalScore;
  }

  private bonusAlreadyAdded(index): boolean {
    return index + 3 >= this.tries.length;
  }

  private isSpare(totalNbOfPinfallInAFrame: number): boolean {
    return totalNbOfPinfallInAFrame === 10;
  }

  private isStrike(pinfall: number): boolean {
    return pinfall === 10;
  }
}
