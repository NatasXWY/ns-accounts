import React                  from 'react';
import ReactDOM               from 'react-dom';
import moment                 from 'moment';
import {HashRouter as Router} from 'react-router-dom';

import CssBaseline     from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';

import MainView from './views/MainView';

import theme from './theme';

import 'moment/locale/zh-cn';
import './assets/scss/main.scss';

moment.updateLocale('zh-cn', {
    relativeTime : {
        future : '%s',
        past   : '%s',
        s      : '秒',
        m      : '分钟',
        mm     : '%d 分钟',
        h      : '小时',
        hh     : '% 小时',
        d      : '1 天',
        dd     : '%d 天',
        M      : '1 个月',
        MM     : '%d 个月',
        y      : '1 年',
        yy     : '%d 年',
    },
});
moment.locale('zh-cn');

/*
 * 填充ReactDOM App
 */
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <CssBaseline/>
            <Router>
                <MainView/>
            </Router>
        </React.Fragment>
    </ThemeProvider>
    ,
    document.getElementById('app')
);
