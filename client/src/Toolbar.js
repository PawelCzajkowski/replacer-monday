import { Button, Checkbox, Search, Text, TextField } from "monday-ui-react-core";
import { Fragment } from "react";

export default function Toolbar({ phrase, caseSensitive, handleClick, handleSearchChange, handleNewTextChange, handleCaseChange }) {

    return (
        <Fragment>
            <div className="wrapper">
                <Text align="center">Old text</Text>
            <Search onChange={e => handleSearchChange(e)} value={phrase} placeholder="Place text you want to change" size="small"/>
            </div>
            <div className="wrapper">
            <Text align="center">New text</Text>
            <TextField onChange={e => handleNewTextChange(e)} placeholder="Place new text here"/>
            </div>
            <Checkbox className="margin-left-20 margin-bottom-8" label={"Case sensitive"} checked={caseSensitive} onChange={handleCaseChange}/>
            <Button onClick={handleClick}>Replace</Button>
        </Fragment>
    );
}