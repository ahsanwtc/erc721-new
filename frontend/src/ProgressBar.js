import styled from "styled-components";

const ProgressBar = ({ percent }) => {
  return (
    <Outer>
      <Inner style={{ width: `${percent}%` }} />
    </Outer>
  );
};

const Outer = styled.div`
  background-color: lightgray;
  border-radius: 13px;
  padding: 3px;
`;

const Inner = styled.div`
  background-color: #0077ff;
  width: 40%;
  height: 10px;
  border-radius: 7px;
`;

export default ProgressBar;