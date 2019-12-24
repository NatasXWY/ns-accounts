/*** 系统引用 ********************************************************************/
import React                         from 'react';
import PropTypes                     from 'prop-types';
import {Redirect, Route, withRouter} from 'react-router-dom';

/*** 基础引用 ********************************************************************/
import PureComponent                 from '../components/PureComponent';
import AccountsView                  from './accounts/AccountsView';
import AccountEditView               from './accounts/AccountEditView';

/*** 组件引用 ********************************************************************/
import {withStyles}                  from '@material-ui/core/styles';
import AppBar                        from '@material-ui/core/AppBar';
import Toolbar                       from '@material-ui/core/Toolbar';
import Typography                    from '@material-ui/core/Typography';
import Button                        from '@material-ui/core/Button';
import IconButton                    from '@material-ui/core/IconButton';
import Drawer                        from '@material-ui/core/Drawer';
import List                          from '@material-ui/core/List';
import ListItem                      from '@material-ui/core/ListItem';
import ListItemAvatar                from '@material-ui/core/ListItemAvatar';
import ListItemText                  from '@material-ui/core/ListItemText';
import ListItemSecondaryAction       from '@material-ui/core/ListItemSecondaryAction';
import Divider                       from '@material-ui/core/Divider';

/*** 图标引用 ********************************************************************/
import MenuIcon                      from '@material-ui/icons/Menu';
import FolderIcon                    from '@material-ui/icons/Folder';
import ArrowRightIcon                from '@material-ui/icons/ArrowRight';

/*** CSS IN JS ******************************************************************/
const styles = (theme) => ({
    root       : {
        flexGrow : 1,
        height   : '100%',
    },
    menuButton : {
        marginRight : theme.spacing(2),
    },
    title      : {
        flexGrow : 1,
    },

    menuListDiv  : {
        width    : '250px',
        height   : '100%',
        overflow : 'hidden',
    },
    menuItemsDiv : {
        width     : '250px',
        height    : 'calc(100% - 77px)',
        overflowY : 'auto',
    },

    mainWindow : {
        width     : '100%',
        height    : 'calc(100% - 64px)',
        overflowY : 'auto',
        padding   : `${theme.spacing(2)}px`,
    }
});

class MainView extends PureComponent {

    /*
     * 初始化State，需要重置初始化的state定义在这里
     * 与构造函数中的state相结合，区分定义是否需要重置初始化的state
     * 如果有多种情况需要重置state，那么可以定义多个initState函数
     * @param props
     * @returns {{}}
     */
    initState = (props = {}) => ({});

    /*
     * 构造函数，初始化state
     * 初始化State，不受其他影响的单独state定义在构造函数中
     * 与initState相结合使用，需要重置更新的都定义在initState中
     */
    constructor(props, context) {
        super(...arguments);
        this.state = Object.assign(this.initState(props), {
            menuOpen : false,
        });
    }

    /*
     * 在完成首次渲染之前调用，此时仍可以修改组件的state。
     */
    componentWillMount() {
    }

    /*
     * 必选的方法，创建虚拟DOM，该方法具有特殊的规则：
     *
     * - 只能通过this.props和this.state访问数据
     * - 可以返回null、false或任何React组件
     * - 只能出现一个顶级组件（不能返回数组）
     * - 不能改变组件的状态
     * - 不能修改DOM的输出
     */
    render() {
        const {classes, theme} = this.props;
        const {menuOpen}       = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.handleMenuOpenStatus(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="secondary" variant="contained">Login</Button>
                    </Toolbar>
                </AppBar>

                <Drawer anchor="left" open={menuOpen} onClose={this.handleMenuOpenStatus(false)}>
                    <div className={classes.menuListDiv} role="presentation" onClick={this.handleMenuOpenStatus(false)} onKeyDown={this.handleMenuOpenStatus(false)}>
                        <List>
                            <ListItem
                                button onClick={() => {
                                this.props.history.push('/accountedit/123?id=ppp');
                            }}
                            >
                                <ListItemAvatar><FolderIcon/></ListItemAvatar>
                                <ListItemText primary="切换账套" secondary="第一套账套"/>
                                <ListItemSecondaryAction><ArrowRightIcon/></ListItemSecondaryAction>
                            </ListItem>
                        </List>

                        <Divider/>

                        <div className={classes.menuItemsDiv}>

                            <List dense={true}>
                                <ListItem button>
                                    <ListItemAvatar><FolderIcon style={{color : 'transparent'}}/></ListItemAvatar>
                                    <ListItemText primary="切换账套" secondary="第一套账套"/>
                                    <ListItemSecondaryAction>
                                        <ArrowRightIcon/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem button>
                                    <ListItemAvatar><FolderIcon/></ListItemAvatar>
                                    <ListItemText primary="切换账套" secondary="第一套账套"/>

                                </ListItem>
                                <ListItem button>
                                    <ListItemAvatar><FolderIcon/></ListItemAvatar>
                                    <ListItemText primary="切换账套" secondary="第一套账套"/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end">
                                            <ArrowRightIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Drawer>

                <div className={classes.mainWindow}>
                    <Route path="/">
                        <Redirect to="/accounts"/>
                    </Route>
                    <Route path="/accounts"><AccountsView/></Route>
                    <Route path="/accountedit/:id"><AccountEditView/></Route>
                </div>
            </div>
        );
    }

    /*
     * 真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。
     * 在服务端中，该方法不会被调用。
     */
    componentDidMount() {
    }

    /** ************************************************************************
     * 组件实例化
     **************************************************************************/

    /*
     * 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。
     */
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(this.initState(nextProps));
    }

    /*
     * 接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state。
     */
    componentWillUpdate(nextProps, nextState, nextContext) {
    }

    /*
     * 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    /** ************************************************************************
     * 销毁&清理期
     **************************************************************************/

    /*
     * 组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。
     */
    componentWillUnmount() {
        super.componentWillUnmount();
    }

    /** ************************************************************************
     * 组件内部【事件】方法定义
     **************************************************************************/

    handleMenuOpenStatus = (menuOpen) => () => {
        this.setState({menuOpen});
    };

    /** ************************************************************************
     * 组件内部【处理】方法定义
     **************************************************************************/

}

MainView.propTypes = {
    classes : PropTypes.object.isRequired,
    theme   : PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, {withTheme : true})(MainView));
