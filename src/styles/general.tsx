import styled from "styled-components";
import { ButtonModel, SortModel } from "../resources/utils";
import { Color } from "../resources/constants";

export const Container = styled.div`
    padding: 50px 100px;
`;

export const TableWrapper = styled.div`
    background: #fff;
    box-shadow: 0 0px 5px 4px #dadada;
    margin-top: 50px;
    border-radius: 5px;
`;

export const TableWrapperHead = styled.div`
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid grey;

`;

export const Button = styled.button<ButtonModel>`
    background: ${props => props.type === "success" 
        ? Color.Success 
        : props.type === "danger"
        ? "none"
        : Color.Primary
    };
    color: ${props => props.type === "danger" ? Color.Danger : Color.White};
    border-radius: 3px;
    padding: 10px 10px;
    width: 100px;
    text-align: center;
    border-bottom: 1px solid #dadada;
    border: ${props => props.type === "danger" ? `1px solid ${Color.Danger}` : "none"};
    cursor: pointer;
`;

export const TableWrapperContent = styled.div`
    padding: 20px;
`;

export const Form = styled.div`
    padding: 50px 50px 50px 200px;
`;

export const InputContainer = styled.div`
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 15px;
    align-items: center;
`;

export const Table = styled.table`
    text-align: center;
    border-spacing: 0;
    width: 100%;
    border-collapse: separate;
    border: 1px solid grey;
    border-radius: 0 0 10px 10px;
`;

export const TableHead = styled.thead`
    background: grey;
    color: #fff;
    border-radius: 10px 10px 0 0;
    border-collapse: separate;
`;

export const TableBody = styled.tbody`
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid grey;
    &:nth-child(even){
        background: rgba(0, 0, 0, .1);
    };
`;

export const TableItem = styled.td`
    padding: 10px 0;
`;

export const ButtonContainer = styled.div`
    text-align: right;
`;

export const NotFound = styled.div`
    padding: 20px;
    text-align: left;
    font-weight: bolder;
`;

export const Sort = styled.div<SortModel>`
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 15px;
    color: ${props => props.active ? Color.Danger : Color.Black};
    cursor: pointer;
`;