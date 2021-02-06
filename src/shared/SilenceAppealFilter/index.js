import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { silenceXML } from '../../constants/filterDocSpec';
import BaseModal from '../ContextAwareToggle/BaseModal';

const Filter = ({onSubmit}) => {
    const [show, setShow] = useState(false);
    const handleSubmit = () => {
        const xmlToSend = silenceXML(id,
            subName,
            subLastName,
            subCity,
            subStreet,
            subType,
            appealDate,
            reqDate,
            recCity,
            recStreet,
            requestDetails,
            authorityName,
        )
        onSubmit(xmlToSend)
        setShow(false)
    }

    const [id, setId] = useState('')
    const [subName, setSubName] = useState('')
    const [subLastName, setSubLastName] = useState('')
    const [subCity, setSubCity] = useState('')
    const [subStreet, setSubStreet] = useState('')
    const [subType, setSubType] = useState('FIZICKO_LICE')
    const [appealDate, setAppealDate] = useState(new Date());
    const [requestDetails, setRequestDetails] = useState('')
    const [authorityName, setAuthorityName] = useState('')

    const handleAppealDateChange = (date) => {
      setAppealDate(date);
    };    
    
    const [reqDate, setReqDate] = useState(new Date());
    const handleReqDateChange = (date) => {
      setReqDate(date);
    };const [recCity, setRecCity] = useState('')
    const [recStreet, setRecStreet] = useState('')

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
                        label="Request ID"
                        variant="outlined"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Submitter's Name"
                        variant="outlined"
                        value={subName}
                        onChange={e => setSubName(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Submitter's Last Name"
                        variant="outlined"
                        value={subLastName}
                        onChange={e => setSubLastName(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Submitter's City"
                        variant="outlined"
                        value={subCity}
                        onChange={e => setSubCity(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Submitter's Street"
                        variant="outlined"
                        value={subStreet}
                        onChange={e => setSubStreet(e.target.value)}
                    />
                    <FormControl variant="outlined" style={{margin: '20px'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Submitter's type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={subType}
                            onChange={e => setSubType(e.target.value)}
                            label="Submitter's Type"
                        >
                            <MenuItem value={'FIZICKO_LICE'}>Fizicko Lice</MenuItem>
                            <MenuItem value={'PRAVNO_LICE'}>Pravno Lice</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{margin: '20px', width: "225px"}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Appeal Date"
                            value={appealDate}
                            onChange={handleAppealDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            style={{margin: '20px',width:"225px"}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Request Date"
                            value={reqDate}
                            onChange={handleReqDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Recipient's City"
                        variant="outlined"
                        value={recCity}
                        onChange={e => setRecCity(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Recipient's Street"
                        variant="outlined"
                        value={recStreet}
                        onChange={e => setRecStreet(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Request Details"
                        variant="outlined"
                        value={requestDetails}
                        onChange={e => setRequestDetails(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Authority Name"
                        variant="outlined"
                        value={authorityName}
                        onChange={e => setAuthorityName(e.target.value)}
                    />
                </BaseModal>
        </>
    )
}

export default Filter;