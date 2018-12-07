import { assertEqual } from "muchi-ts";
import { BowlingGame } from "../src/bowling-game.v2";

@MuchiTs({
  name: "class BowlingV2()"
})
class BowlingV1Test {
  private bowlingGame: BowlingGame = null;

  @Before
  public before() {
    this.bowlingGame = new BowlingGame();
  }

  @Test({
    it: "returns zero score after initializing"
  })
  public testScoringAfterInitialization() {
    // Given
    const expected = 0;
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: "returns zero score"
  })
  public testAllGutterScoring() {
    // Given
    const expected = 0;
    this.playPinNRounds(0, 10);
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: 'returns "20" score when all ones played'
  })
  public testAllOnesScoring() {
    // Given
    const expected = 20;
    this.playPinNRounds(1, 10);
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: 'returns "13" score'
  })
  public testOneSpareScoring() {
    // Given
    const expected = 13;
    this.playPinNRounds(5, 1);
    this.playPinNRounds(1, 1);
    this.playPinNRounds(0, 8);
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: 'returns "14" score'
  })
  public testOneStrikeScoring() {
    // Given
    const expected = 14;
    /**
     * Strike
     */
    this.bowlingGame.roll(10);
    this.playPinNRounds(1, 1);
    this.playPinNRounds(0, 7);
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: 'returns "12" score'
  })
  public testOneSpareBonusScoring() {
    // Given
    const expected = 12;
    this.playPinNRounds(0, 9);
    this.playPinNRounds(5, 1);
    this.bowlingGame.roll(2);
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: 'returns "18" score'
  })
  public testOneStrikeBonusScoring() {
    // Given
    const expected = 18;
    this.playPinNRounds(0, 9);
    this.bowlingGame.roll(10);
    this.bowlingGame.roll(3);
    this.bowlingGame.roll(5);
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: 'returns "300" score'
  })
  public testPerfectGameScoring() {
    // Given
    const expected = 300;
    this.playPinNRounds(10, 5);
    this.playPinNRounds(10, 1);
    // When
    const score = this.bowlingGame.score();
    // Then
    assertEqual(score, expected);
  }

  @Test({
    it: "throws an error"
  })
  public testPerfectGameScoring() {
    // Given
    const expected = "Game over.";
    this.playPinNRounds(0, 10);
    // When
    try {
      this.bowlingGame.roll();
    } catch (error) {
      // Then
      assertEqual(error, expected);
    }
  }

  private playPinNRounds(pin: number, n: number) {
    for (let index = 0; index < n; ++index) {
      this.bowlingGame.roll(pin);
      this.bowlingGame.roll(pin);
    }
  }
}
