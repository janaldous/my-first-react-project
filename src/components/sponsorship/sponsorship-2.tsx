import *  as React from 'react';
import "./sponsorship-2.scss";
import MaterialTable, { Column } from 'material-table';
import { Icons } from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Print from '@material-ui/icons/Print';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



interface SponsorshipProps {

}

interface TableProps {
    count: number;
    rowsPerPage: number;
    page: number;
}

interface Row {
    sponsorId: number;
    companyHouseId: number;
    sponsorName: string;
    companyHouseName: string;
    finished: boolean;
    applied: boolean;
    incorrectLikeness: boolean;
    checkLater: boolean;
    niceSite: boolean;
    interestingIdea: boolean;
    noCareers: boolean;
    noTechJobs: boolean;
    needRightToWork: boolean;
    techCategory: string;
    otherInfo: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

export const SponsorshipBoard2: React.FC = (props: SponsorshipProps) => {
    const tableIcons: Icons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Sponsor Id', field: 'sponsorId', editable: 'never' },
            { title: 'Company Id', field: 'companyHouseId', editable: 'never' },
            { title: 'Sponsor name', field: 'sponsorName', editable: 'never' },
            { title: 'Compnay name', field: 'companyHouseName', editable: 'never' },
            { title: 'checked', field: 'finished', type: 'boolean' },
            { title: 'applied', field: 'applied', type: 'boolean' },
            { title: 'incorrect likeness', field: 'incorrectLikeness', type: 'boolean' },
            { title: 'check later', field: 'checkLater', type: 'boolean' },
            { title: 'nice site', field: 'niceSite', type: 'boolean' },
            { title: 'intrng idea', field: 'interestingIdea', type: 'boolean' },
            { title: 'no careers page/no website', field: 'noCareers', type: 'boolean' },
            { title: 'no tech jobs/no jobs in london', field: 'noTechJobs', type: 'boolean' },
            { title: 'need right to work', field: 'needRightToWork', type: 'boolean' },
            { title: 'tech category', field: 'techCategory' },
            { title: 'other info', field: 'otherInfo' },
        ],
        data: [
            {
                sponsorId: 123,
                companyHouseId: 234,
                sponsorName: "Mehmet",
                companyHouseName: "CH",
                finished: false,
                applied: false,
                incorrectLikeness: false,
                checkLater: false,
                niceSite: false,
                interestingIdea: false,
                noCareers: false,
                noTechJobs: false,
                needRightToWork: false,
                techCategory: "",
                otherInfo: "",
            },
            {
                sponsorId: 123,
                companyHouseId: 234,
                sponsorName: "Mehmet",
                companyHouseName: "CH",
                finished: false,
                applied: false,
                incorrectLikeness: false,
                checkLater: false,
                niceSite: false,
                interestingIdea: false,
                noCareers: false,
                noTechJobs: false,
                needRightToWork: false,
                techCategory: "",
                otherInfo: "",
            },
        ],
    });

    const [tableProps, setTableProps] = React.useState<TableProps>({
        count: 850,
        rowsPerPage: 50,
        page: 7,
    });

    const createData = (data: any): Row => {
        const company: any = data.company;
        const checking: any = data.checking;
        return {
            companyHouseName: company.companyHouseName,
            companyHouseId: company.companiesHouseId,
            sponsorName: company.sponsor.name,
            sponsorId: company.sponsor.id,
            applied: checking.applied,
            checkLater: checking.checkLater,
            noCareers: checking.noCareers,
            incorrectLikeness: checking.incorrectLikeness,
            finished: checking.checked,
            otherInfo: checking.otherInfo || "",
            // shouldCheckToday: data.shouldCheckToday,
            needRightToWork: checking.needRightToWork,
            noTechJobs: checking.noTechJobs,
            // possibleIncorrectLikeness: data.possibleIncorrectLikeness,
            techCategory: checking.categories || "",
            niceSite: checking.niceSite,
            interestingIdea: checking.interestingIdea,
        };
    };

    React.useEffect(() => {
        // console.log("loading");
        getData(tableProps.page, tableProps.rowsPerPage);
    }, []);

    const getData = (pageNumber: number, pageSize: number) => {
        fetch(`http://localhost:8080/sponsors?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(res => {
            if (res.status !== 200) {
                console.error('Looks like there was a problem. Status Code: ' + res.status);
                throw Error();
            }
            res.json().then(r => {

                //setData(r.map((x: any) => createData(x)));
                // console.log("loaded new data")
            })
        })
    };

    const postData = (sponsorId: number, data: Row) => {
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

    // const handleChange = React.useCallback((name: string, sponsorId: number, index: number) => (event: any) => {
    //     const checked: boolean = event.target.checked;
    //     //postData(sponsorId, { ...rows[index], [name]: checked });

    //     setData(rows => {
    //         const output = rows.map((item, i) => {
    //             const isChecked = checked && name !== "incorrectLikeness" && name !== "checkLater"
    //                 && name !== "niceSite" && name !== "interestingIdea";
    //             const finished: boolean = isChecked || item.applied || item.noCareers;
    //             return i === index ? { ...item, [name]: checked, finished } : item;
    //         }
    //         );
    //         return output;
    //     });
    // }, []);

    // const handleChangeText = React.useCallback((name: string, index: number) => (event: any) => {
    //     const textInput: boolean = event.target.value;
    //     setData(rows => {
    //         const output = rows.map((item, i) => {
    //             return i === index ? { ...item, [name]: textInput } : item;
    //         }
    //         );
    //         return output;
    //     });
    // }, []);

    // const handleTextOnBlur = React.useCallback((name: string, sponsorId: number, index: number) => (event: any) => {
    //     const textInput: boolean = event.target.value || null;
    //     postData(sponsorId, { ...rows[index], [name]: textInput });
    // }, []);

    // const handleChangePage = React.useCallback((event, newPage) => {
    //     setTableProps({ ...tableProps, page: newPage });
    //     getData(newPage, tableProps.rowsPerPage);
    // }, [tableProps]);

    // const handleChangeRowsPerPage = React.useCallback(event => {
    //     setTableProps({ ...tableProps, page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    // }, [tableProps]);

    // console.log(`row size ${rows.length}`)

    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}