import styled from 'styled-components';
import { Table } from 'antd';

export const StyledTableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const StyledTable = styled(Table)`
  width: 100%;
  max-height: 500px;
  border: 1px solid #ddd;

  .ant-table-thead > tr > th {
    background-color: green;
    color: white;
    font-weight: bold;
  }
`;


