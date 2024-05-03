import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

it("Кружок без буквы", () => {
  const tree = renderer
    .create(<Circle />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок с буквами", () => {
  const tree = renderer
    .create(<Circle letter="1234"/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок с head", () => {
  const tree = renderer
    .create(<Circle head="head"/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок с react-элементом в head", () => {
  const tree = renderer
    .create(<Circle head={<Circle />}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок с tail", () => {
  const tree = renderer
    .create(<Circle tail="tail"/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок с react-элементом в tail", () => {
  const tree = renderer
    .create(<Circle tail={<Circle />}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок с index", () => {
  const tree = renderer
    .create(<Circle index={0}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок с пропом isSmall ===  true", () => {
  const tree = renderer
    .create(<Circle isSmall />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок в состоянии default", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок в состоянии changing", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кружок в состоянии modified", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});