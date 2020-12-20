import { FC } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { PageTitle } from './PageTitle';

interface Props {
  title?: string;
}
export const Page: FC<Props> = ({ title, children }) => (
  <div
    css={css`
      margin: 30px 10px ;
      padding: 30px 10px;
      /* max-width: 600px; */
      
    `}
  >
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);






