
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {rescriptXML} from '../../constants/filterDocSpec';
import BaseModal from '../ContextAwareToggle/BaseModal';

const Filter = ({onSubmit}) => {
    const [show, setShow] = useState(false);
    const handleSubmit = () => {
        const xmlToSend = rescriptXML(
            appealId,
            rescriptDate,
            commissionerName,
            commissionerLastname,
            submitter,
            appealStatus,
        )
        onSubmit(xmlToSend)
        setShow(false)
    }

    const [appealId, setAppealId] = useState('')
    const [rescriptDate, setRescriptDate] = useState(new Date());
    const [commissionerName, setCommissionerName] = useState('')
    const [commissionerLastname, setCommissionerLastname] = useState('')
    const [submitter, setSubmitter] = useState('')
    const [appealStatus, setAppealStatus] = useState('PROCESS')

    const handleRescriptDateChange = (date) => {
      setRescriptDate(date);
    };    
    
    return (
        <>
            <IconButton style={{position: 'absolute', right: 300}} onClick={() => setShow(true)}>
                <FilterList style={{fontSize: 40}} />
            </IconButton>
                <BaseModal
                    show={show}
                    close={() => setShow(false)}
                    title="Filter Appeals"
                    onSubmit={handleSubmit}
                    buttonTitle="Apply filters"
                    aditionalStyle={{marginTop: '200px'}}
                >
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Appeal ID"
                        variant="outlined"
                        value={appealId}
                        onChange={e => setAppealId(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Commissioner's Name"
                        variant="outlined"
                        value={commissionerName}
                        onChange={e => setCommissionerName(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Commissioner's Last Name"
                        variant="outlined"
                        value={commissionerLastname}
                        onChange={e => setCommissionerLastname(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Submitter"
                        variant="outlined"
                        value={submitter}
                        onChange={e => setSubmitter(e.target.value)}
                    />
                    <FormControl variant="outlined" style={{margin: '20px'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Appeal Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={appealStatus}
                            onChange={e => setAppealStatus(e.target.value)}
                            label="Appeal Status"
                        >
                            <MenuItem value={'PRIHVACENA'}>Prihvacena</MenuItem>
                            <MenuItem value={'ODBIJENA'}>Odbijena</MenuItem>
                            <MenuItem value={''}>U procesu </MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{margin: '20px',width:"225px"}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Rescript Date"
                            value={rescriptDate}
                            onChange={handleRescriptDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </BaseModal>
        </>
    )
}

export default Filter;