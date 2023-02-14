import { Pagination } from "antd";
import React from "react";
import styled from "styled-components";

interface paginationProps {
  defaultCurrent: number;
  current: number;
  total?: number;
  pageSize?: number;
  onChange?: any;
}

const StyledPagination = styled(Pagination)`
  .ant-pagination-item a {
    color: #8d94a0;
  }
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-item {
    border: 1px solid #dadada;
    border-radius: 4px;
    svg {
      color: #b1b8c0;
    }
  }
  font-size: ${(props) => props.theme.body2};
  line-height: 22px;
  .ant-pagination-item-active {
    background: ${(props) => props.theme.primary};
    border-radius: 4px;
    font-weight: ${(props) => props.theme.normal};
    a:hover,
    a {
      color: ${(props) => props.theme.white};
    }
  }
`;

const CommonPagination = (props: paginationProps) => {
  const { defaultCurrent = 1, current, total, onChange, pageSize } = props;
  return (
    <StyledPagination
      defaultCurrent={defaultCurrent | 1}
      current={current}
      onChange={onChange}
      pageSize={pageSize}
      total={total}
    ></StyledPagination>
  );
};

export default CommonPagination;
