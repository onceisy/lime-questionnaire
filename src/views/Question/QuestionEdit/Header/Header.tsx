import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import QuestionProps from '@/components/QuestionCard/QuestionProps';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST } from '@/router/path';

const Header: FC<QuestionProps> = props => {
  const { title } = props;
  const nav = useNavigate();
  return (
    <div className="h-14 flex px-6">
      <div className="flex-1 flex items-center">
        <div className="flex items-center">
          <Icon
            icon="solar:home-smile-angle-bold"
            fontSize="18px"
            className="cursor-pointer"
            onClick={() => nav(ROUTE_MANAGE_LIST)}
          ></Icon>
          <span className="font-bold ml-3">{title}</span>
        </div>
      </div>
      <div className="flex-1">2</div>
      <div className="flex-1">3</div>
    </div>
  );
};

export default Header;
