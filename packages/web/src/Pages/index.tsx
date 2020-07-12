import React, { memo, useCallback, useRef, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SchoolIcon from '@material-ui/icons/SchoolOutlined';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

// import { Drawer } from '@mission/ui';

import { Drawer } from '../ui';

import CourseListPage from './Courses/List';

export const ScrollTopContext = React.createContext<Function>(() => {});

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    padding: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      padding: theme.variables.contentPaddingUpSm,
    },
  },
}));

const Pages = (props) => {
  const classes = useStyles(props);

  const mainContent = useRef<HTMLDivElement>(null);
  const [menu] = useState([
    {
      path: '/courses',
      display: 'Courses',
      icon: SchoolIcon,
    },
  ]);

  const scrollTop = useCallback(() => setTimeout(() => mainContent.current!.scrollTo(0, 0), 100), []);
  const renderRedirect = useCallback(() => <Redirect to="/courses" />, []);

  return (
    <div className={classes.root}>
      <ScrollTopContext.Provider value={scrollTop}>
        <BrowserRouter>
          <Drawer menu={menu}>
            <main ref={mainContent} className={classes.content}>
              <Switch>
                <Route path="/courses" exact component={CourseListPage} />
                <Route render={renderRedirect} />
              </Switch>
            </main>
          </Drawer>
        </BrowserRouter>
      </ScrollTopContext.Provider>
    </div>
  );
};

export default memo(Pages);
