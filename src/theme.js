import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import PrimaryColor   from '@material-ui/core/colors/grey';
import SecondaryColor from '@material-ui/core/colors/yellow';
import {zhCN}         from '@material-ui/core/locale';

const Theme = createMuiTheme({
    typography : {
        useNextVariants : true,
    },
    palette    : {
        primary   : {
            light : PrimaryColor['700'],
            main  : PrimaryColor['800'],
            dark  : PrimaryColor['900'],
        },
        secondary : {
            light : SecondaryColor['700'],
            main  : SecondaryColor['800'],
            dark  : SecondaryColor['900'],
        },
        type      : 'dark',
    }
}, zhCN);

export default Theme;
