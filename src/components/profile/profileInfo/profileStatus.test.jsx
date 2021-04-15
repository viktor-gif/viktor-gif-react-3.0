import { create } from "react-test-renderer";
import ProfileStatus from "./profileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="React the best!" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("React the best!");
  });
  test("after creation status should be displayed in span", () => {
    const component = create(<ProfileStatus status="React the best!" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("after creation status shouldn't be displayed in input", () => {
    const component = create(<ProfileStatus status="React the best!" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });
  test("after creation span should contain correct status", () => {
    const component = create(<ProfileStatus status="React the best!" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("React the best!");
  });
  test("input should be displayed in editMode", () => {
    const component = create(<ProfileStatus status="React the best!" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("React the best!");
  });
  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="React the best!" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
