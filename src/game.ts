export default interface Game {
  roll: (pinfall: number) => void;
  score: () => number;
}
