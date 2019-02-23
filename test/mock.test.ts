declare const MuchiTs: any;
declare const Only: any;
declare const Mock: any;
declare const Before: any;
declare const Test: any;

import { assertEqual, verify } from "muchi-ts";

class ClassToMock {
  public sayHelloMock() {
    return "hello mock";
  }
}

class ClassWithMock {
  constructor(private mock: ClassToMock) {}
  public callMock(): string {
    return this.mock.sayHelloMock();
  }
}

@MuchiTs({ name: "class Mock()", ignore: false })
export default class MuchiTsMockTest {
  @Mock(ClassToMock)
  private mock: ClassToMock;

  private classWithMock: ClassWithMock;

  constructor() {}

  @Before
  public before() {
    this.classWithMock = new ClassWithMock(this.mock);
  }

  @Test({
    it: "maintains instance of behaviour",
    ignore: false
  })
  isInstanceOf(): void {
    // When
    const isInstanceOf: boolean = this.mock instanceof ClassToMock;
    // Then
    assertEqual(isInstanceOf, true);
  }

  @Test({
    it: "calls mock's methods",
    ignore: false
  })
  mockShouldBeCalled(): void {
    // When
    this.classWithMock.callMock();
    // Then
    assertEqual(verify(this.mock.sayHelloMock).callCount(), 1);
  }

  @Test({
    it: "should not be null",
    ignore: false
  })
  arrayNotEqualNull(): void {
    // Then
    assertEqual([1, 2, 3], null);
  }
}
