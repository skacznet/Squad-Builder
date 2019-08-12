import React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import materialClasses from '../../../assets/style/material.css';

const SquadMainSettings = props => {
    
    // Map formations to selectable options.
    const formationOptions = Object.keys(props.allFormations).map((formation, index) => ( 
        <MenuItem key={formation} value={formation}>{formation}</MenuItem>
    ));

    return (
        <>
            <Grid container spacing={16} justify="center">
                <Grid item md={5} xs={12}>
                    <FormControl fullWidth={true} required={true} className={materialClasses.FormControl} variant="outlined">
                        <InputLabel htmlFor="formation">Formation</InputLabel>
                            <Select
                                value={props.formation.type}
                                onChange={props.onFormationChange}
                                input={<OutlinedInput labelWidth={85} name="formation" id="formation" />}
                            >
                            {formationOptions}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={7} xs={12}>
                    <FormControl fullWidth={true} required={true} className={materialClasses.formControl} variant="outlined">
                        <InputLabel htmlFor="squadName">Squad name</InputLabel>
                        <OutlinedInput error={props.squadNameError} value={props.squadName} onChange={props.onSquadNameInputChange} labelWidth={100} id="squadName" />
                        {props.squadNameError ? <FormHelperText className={materialClasses.ErrorLabel}>Squad name is required!</FormHelperText> : null}
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={16} justify="center">
                <Grid item xs={12}>
                    <ColorPicker pickerLabel="Primary color" activeColor={props.primaryColor} onColorChange={(event) => props.onPrimaryColorChange(event)} />
                    <ColorPicker pickerLabel="Secondary color" activeColor={props.secondaryColor} onColorChange={(event) => props.onSecondaryColorChange(event)} />
                </Grid>
            </Grid>
        </>
    );
}

export default SquadMainSettings;