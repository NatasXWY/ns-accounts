/*** 系统引用 ********************************************************************/
import React                  from 'react';
import PropTypes              from 'prop-types';

/*** 基础引用 ********************************************************************/
import PureComponent          from './PureComponent';
import TableHead              from './TableHead';

/*** 组件引用 ********************************************************************/
import {withStyles}           from '@material-ui/core/styles';
import TableContain           from '@material-ui/core/TableContainer';
import Table                  from '@material-ui/core/Table';
import TableRow               from '@material-ui/core/TableRow';
import TableCell              from '@material-ui/core/TableCell';
import TableBody              from '@material-ui/core/TableBody';
import TablePagination        from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationActions';

/*** 图标引用 ********************************************************************/


/*** CSS IN JS ******************************************************************/
const styles = (theme) => ({
    root : {
        width  : '100%',
        height : '100%',
    },

    tableContainer              : {
        width  : '100%',
        height : 'calc(100% - 36px)',
    },
    tableContainerWithoutFooter : {
        width  : '100%',
        height : '100%',
    },

    tablePagition : {
        '&>div' : {
            minHeight : '36px',
        }
    }

});

class TableContainer extends PureComponent {

    /*
     * 初始化State，需要重置初始化的state定义在这里
     * 与构造函数中的state相结合，区分定义是否需要重置初始化的state
     * 如果有多种情况需要重置state，那么可以定义多个initState函数
     * @param props
     * @returns {{}}
     */
    initState = (props = {}) => ({
        count        : props.count,
        page         : props.page,
        rowsPerPage  : props.rowsPerPage,
        onChangePage : props.onChangePage,

        columns : props.columns,
        data    : props.data,

        headHidden : Boolean(props.headHidden),
        footHidden : Boolean(props.footHidden),
    });

    /*
     * 构造函数，初始化state
     * 初始化State，不受其他影响的单独state定义在构造函数中
     * 与initState相结合使用，需要重置更新的都定义在initState中
     */
    constructor(props, context) {
        super(...arguments);
        this.state = Object.assign(this.initState(props), {});
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
        const {classes} = this.props;
        const {
                  columns, data, count, page, rowsPerPage,
                  headHidden, footHidden
              }         = this.state;

        return (
            <div className={classes.root}>
                <TableContain className={footHidden ? classes.tableContainerWithoutFooter : classes.tableContainer}>
                    <Table stickyHeader size="small">
                        {!headHidden && <TableHead columns={columns}/>}
                        <TableBody>
                            {
                                data.map((row, rowIndex) => {
                                    return (
                                        <TableRow hover key={rowIndex}>
                                            {
                                                columns.map((column, colIndex) => {
                                                    return (
                                                        <TableCell key={`${column.id}-${colIndex}`}>{row[column.id]}</TableCell>
                                                    );
                                                })
                                            }
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContain>
                {!footHidden &&
                 <TablePagination
                     className={classes.tablePagition}
                     size="small"
                     rowsPerPageOptions={[20, 50, 100]}
                     component="div"
                     count={count}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     labelDisplayedRows={({from, to, count}) => `${from} ~ ${to}　　共 ${count} 条`}
                     onChangePage={this.handleChangePage}
                     onChangeRowsPerPage={this.handleChangeRowsPerPage}
                     ActionsComponent={TablePaginationActions}
                 />
                }
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

    handleChangePage = (event, newPage) => {
        const {count, rowsPerPage, onChangePage} = this.state;
        onChangePage && onChangePage({count, page : newPage, rowsPerPage});
    };

    handleChangeRowsPerPage = (event) => {
        const {count, page, onChangePage} = this.state;
        onChangePage && onChangePage({count, page, rowsPerPage : parseInt(event.target.value, 10)});
    };

    /** ************************************************************************
     * 组件内部【处理】方法定义
     **************************************************************************/

}

TableContainer.propTypes = {
    classes      : PropTypes.object.isRequired,
    theme        : PropTypes.object.isRequired,
    count        : PropTypes.number.isRequired,
    page         : PropTypes.number.isRequired,
    rowsPerPage  : PropTypes.number.isRequired,
    onChangePage : PropTypes.func.isRequired,
    columns      : PropTypes.array.isRequired,
    data         : PropTypes.array.isRequired,
};

export default withStyles(styles, {withTheme : true})(TableContainer);
