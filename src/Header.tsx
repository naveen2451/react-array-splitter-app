import { UserIcon } from './Icons';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { gray1, fontFamily, fontSize, gray5, gray2 } from './Styles';
import {  FC } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

export const Header: FC<RouteComponentProps> = () => {


  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin:0 auto;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <a
        href="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        Array & Split
      </a>
    
    

      <Link
        to="/"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          span {
            margin-left: 10px;
          }
          :focus {
            outline-color: ${gray5};
          }
        `}
      >
        <UserIcon />
        <span>Naveen</span>
      </Link>
    </div>
  );
};

export const HeaderWithRouter = withRouter(Header);
