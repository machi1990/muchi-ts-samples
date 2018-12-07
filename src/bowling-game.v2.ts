import Game from "./game";
const TOTAL_PINS_IN_A_FRAME = 10;
const ERROR_MESSAGE = "Block full";

class Frame {
  public firstPinfall: number = -1;
  public secondPinfall: number = -1;

  private next: Frame = null;
  private previous: Frame = null;

  constructor(previous: Frame = null, private containsBonus: boolean = false) {
    if (previous == null) return;

    previous.next = this;
    this.previous = previous;
  }

  public roll(pinfall: number): void {
    if (this.firstPinfall === -1) {
      this.firstPinfall = pinfall;
      this.secondPinfall = this.hasStrike() ? 0 : -1;
    } else {
      if (this.secondPinfall === -1) {
        if (this.containsBonus && this.previous.hasSpare())
          throw new Error(ERROR_MESSAGE);
        else this.secondPinfall = pinfall;
      } else if (this.hasNext()) this.next.roll(pinfall);
      else throw new Error(ERROR_MESSAGE);
    }
  }

  public score(): number {
    if (!this.isFilled() || this.containsBonus) {
      return 0;
    }

    let score = 0;

    if (this.hasStrike() && this.hasNext()) {
      score =
        TOTAL_PINS_IN_A_FRAME +
        this.next.firstPinfall +
        this.secondPinfallAfterStrike();
    } else if (this.hasSpare() && this.hasNext()) {
      score = TOTAL_PINS_IN_A_FRAME + this.next.firstPinfall;
    } else score = this.firstPinfall + this.secondPinfall;

    return score + (this.hasNext() ? this.next.score() : 0);
  }

  public isFilled(): boolean {
    return this.firstPinfall !== -1 && this.secondPinfall !== -1;
  }

  public hasStrike(): boolean {
    return this.firstPinfall === TOTAL_PINS_IN_A_FRAME;
  }

  public hasSpare(): boolean {
    return (
      !this.hasStrike() &&
      this.firstPinfall + this.secondPinfall === TOTAL_PINS_IN_A_FRAME
    );
  }

  private hasNext(): boolean {
    return this.next != null;
  }

  public isBonusFrame(): boolean {
    return this.containsBonus;
  }

  private secondPinfallAfterStrike(): number {
    if (!this.hasNext()) return 0;

    if (!this.next.hasStrike()) return this.next.secondPinfall;

    if (this.next.hasNext()) return this.next.next.firstPinfall;

    return 0;
  }
}

export class BowlingGame implements Game {
  private turns: number = 1;
  private gameBoard: Frame = new Frame();
  private currentFrame: Frame = this.gameBoard;

  constructor(private readonly NB_FRAMES: number = 10) {
    NB_FRAMES = Math.max(1, NB_FRAMES);
  }

  public roll(pinfall: number): void {
    if (!this.currentFrame.isFilled()) {
      this.currentFrame.roll(pinfall);
    } else if (!this.turnsOver()) {
      this.turns++;
      const nextFrame = new Frame(this.currentFrame);
      nextFrame.roll(pinfall);
      this.currentFrame = nextFrame;
    } else if (this.holdNextBonusFrame()) {
      const bonusFrame = new Frame(this.currentFrame, true);
      bonusFrame.roll(pinfall);
      this.currentFrame = bonusFrame;
    } else throw "Game over.";
  }

  private turnsOver(): boolean {
    return this.turns >= this.NB_FRAMES;
  }

  private holdNextBonusFrame(): boolean {
    return (
      this.turnsOver() &&
      this.currentFrame.isFilled() &&
      (this.currentFrame.hasStrike() || this.currentFrame.hasSpare())
    );
  }

  public score(): number {
    return this.gameBoard.score();
  }
}
