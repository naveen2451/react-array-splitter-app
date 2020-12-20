import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { HeaderWithRouter as Header } from './Header';
import { HomePage } from './HomePage';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';



import { NotFoundPage } from './NotFoundPage';



const App = () => {
  return (
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

// emotion libarry is used to style at component level and its a tagged template literal
