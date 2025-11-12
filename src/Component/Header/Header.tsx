import styled from "styled-components";

const Header = () =>{
    return (
        <HeaderStyle>
            <div className="heading">TODO APP</div>
        </HeaderStyle>
    )
}

export default Header;

const HeaderStyle = styled.div`
  background: #034EA2;
  height: 60px;
  display: flex;
  align-items: center;
  .heading{
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;
    margin-left: 50px;
  }
`;
