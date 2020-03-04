import *  as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import "./sponsorship.scss";
import { useKeyPress } from '../home/hooks';
import Paper from '@material-ui/core/Paper';

interface SponsorshipProps {

}

interface TableProps {
    count: number;
    rowsPerPage: number;
    page: number;
}

interface RowData {
    applied: boolean;
    incorrectLikeness: boolean;
    checkLater: boolean;
    noCareers: boolean;
}

const useStyles = () => makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
}));

export const SponsorshipBoard: React.FC = (props: SponsorshipProps) => {
    const [rows, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const happyPress = useKeyPress('h', () => console.log("I pressed h"));

    const [tableProps, setTableProps] = React.useState<TableProps>({
        count: 850,
        rowsPerPage: 50,
        page: 7,
    });

    const createData = (data: any) => {
        const company: any = data.company;
        const checking: any = data.checking;
        return {
            companyHouseName: company.companyHouseName,
            companyHouseId: company.companiesHouseId,
            sponsor: company.sponsor.name,
            sponsorId: company.sponsor.id,
            applied: checking.applied,
            checkLater: checking.checkLater,
            noCareers: checking.noCareers,
            incorrectLikeness: checking.incorrectLikeness,
            finished: checking.checked,
            otherInfo: checking.otherInfo || "",
            shouldCheckToday: data.shouldCheckToday,
            needRightToWork: checking.needRightToWork,
            noTechJobs: checking.noTechJobs,
            possibleIncorrectLikeness: data.possibleIncorrectLikeness,
            categories: checking.categories || "",
            niceSite: checking.niceSite,
            interestingIdea: checking.interestingIdea,
        };
    };

    React.useEffect(() => {
        // console.log("loading");
        getData(tableProps.page, tableProps.rowsPerPage);
    }, []);

    const getData = (pageNumber: number, pageSize: number) => {
        setLoading(true);
        fetch(`http://localhost:8080/sponsors?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(res => {
            if (res.status !== 200) {
                console.error('Looks like there was a problem. Status Code: ' + res.status);
                throw Error();
            }
            res.json().then(r => {

                setData(r.map((x: any) => createData(x)));
                // console.log("loaded new data")
            })
        }).finally(() => setLoading(false))
    };

    const postData = (sponsorId: number, data: RowData) => {
        //setLoading(true);
        fetch(`http://localhost:8080/sponsors/${sponsorId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200) {
                console.error('Looks like there was a problem. Status Code: ' + res.status);
                throw Error();
            }
        }).finally()//() => setLoading(false)
    };

    const handleChange = React.useCallback((name: string, sponsorId: number, index: number) => (event: any) => {
        const checked: boolean = event.target.checked;
        postData(sponsorId, { ...rows[index], [name]: checked });

        setData(rows => {
            const output = rows.map((item, i) => {
                const isChecked = checked && name !== "incorrectLikeness" && name !== "checkLater"
                    && name !== "niceSite" && name !== "interestingIdea";
                const finished: boolean = isChecked || item.applied || item.noCareers;
                return i === index ? { ...item, [name]: checked, finished } : item;
            }
            );
            return output;
        });
    }, []);

    const handleChangeText = React.useCallback((name: string, index: number) => (event: any) => {
        const textInput: boolean = event.target.value;
        setData(rows => {
            const output = rows.map((item, i) => {
                return i === index ? { ...item, [name]: textInput } : item;
            }
            );
            return output;
        });
    }, []);

    const handleTextOnBlur = React.useCallback((name: string, sponsorId: number, index: number) => (event: any) => {
        const textInput: boolean = event.target.value || null;
        postData(sponsorId, { ...rows[index], [name]: textInput });
    }, []);

    const handleChangePage = React.useCallback((event, newPage) => {
        setTableProps({ ...tableProps, page: newPage });
        getData(newPage, tableProps.rowsPerPage);
    }, [tableProps]);

    const handleChangeRowsPerPage = React.useCallback(event => {
        setTableProps({ ...tableProps, page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    }, [tableProps]);

    console.log(`row size ${rows.length}`)

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes["paper"]}>
                <Table stickyHeader aria-label="simple table" className={loading ? "loading" : ""}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sponsor id</TableCell>
                            <TableCell>Company house id</TableCell>
                            <TableCell>Sponsor name</TableCell>
                            <TableCell>Company name</TableCell>
                            <TableCell align="right">checked</TableCell>
                            <TableCell align="right">applied</TableCell>
                            <TableCell align="right">incorrect likeness</TableCell>
                            <TableCell align="right">check later</TableCell>
                            <TableCell align="right">nice site</TableCell>
                            <TableCell align="right">intrsng idea</TableCell>
                            <TableCell align="right">no careers page/ no website</TableCell>
                            <TableCell align="right">no tech jobs/ no jobs in london</TableCell>
                            <TableCell align="right">need right to work</TableCell>
                            <TableCell align="right">tech category</TableCell>
                            <TableCell align="right">other info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} className={(row.finished ? "finished" : "") + " " + (row.shouldCheckToday ? "check-today" : "")}>
                                <TableCell component="th" scope="row">
                                    {row.sponsorId}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.companyHouseId}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.sponsor}
                                </TableCell>
                                <TableCell>
                                    <div className={row.possibleIncorrectLikeness ? "not-same-icon" : ""}></div>
                                    {row.companyHouseName}
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.finished}
                                        onChange={handleChange('checked', row.sponsorId, index)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.applied}
                                        onChange={handleChange('applied', row.sponsorId, index)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.incorrectLikeness}
                                        onChange={handleChange('incorrectLikeness', row.sponsorId, index)}
                                        color="secondary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.checkLater}
                                        onChange={handleChange('checkLater', row.sponsorId, index)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.niceSite}
                                        onChange={handleChange('niceSite', row.sponsorId, index)}
                                        color="secondary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.interestingIdea}
                                        onChange={handleChange('interestingIdea', row.sponsorId, index)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.noCareers}
                                        onChange={handleChange('noCareers', row.sponsorId, index)}
                                        color="secondary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.noTechJobs}
                                        onChange={handleChange('noTechJobs', row.sponsorId, index)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={row.needRightToWork}
                                        onChange={handleChange('needRightToWork', row.sponsorId, index)}
                                        color="secondary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        className="text-field"
                                        margin="normal"
                                        value={row.categories}
                                        onChange={handleChangeText('categories', index)}
                                        onBlur={handleTextOnBlur('categories', row.sponsorId, index)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        className="text-field"
                                        margin="normal"
                                        value={row.otherInfo}
                                        onChange={handleChangeText('otherInfo', index)}
                                        onBlur={handleTextOnBlur('otherInfo', row.sponsorId, index)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={3}
                                count={tableProps.count}
                                rowsPerPage={tableProps.rowsPerPage}
                                page={tableProps.page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        </div>
    );
};
// SponsorshipBoard.why

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}