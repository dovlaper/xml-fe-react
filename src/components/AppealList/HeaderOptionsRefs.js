import { Button, Link, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router';

const HeaderOptionsRefs = ({mapper}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };
    const {route, id} = mapper;
    return (
        <>

            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                See References
            </Button>
            <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                
                    <MenuItem>
                        <Link href={`http://localhost:8080/api/${route}/${id}/generate?type=pdf`}>Download PDF</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api/${route}/${id}/generate?type=html`}>Download HTML</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api/${route}/meta/json/${id}`}>Export Metadata JSON</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api/${route}/meta/rdf/${id}`}>Export Metadata RDF</Link>
                    </MenuItem>
            </Menu> 
            </>
        )
}

export default HeaderOptionsRefs;