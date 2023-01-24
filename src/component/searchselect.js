import { TextField, MenuItem } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

function SearchSelect({ helperText, error,disabled, label, showValue, inputProps, className, noFound, name, variant, defaultValue, value, onInputChange, onSelect, labelId, id, menuList, onScroll, list }) {
    const [show, setShow] = useState(false)
    const [changevalue, setChangevalue] = useState(false)
    const [nameVal, setName] = useState('')
    const wrapperRef = useRef(null);
    const handleClickShow = () => {
        setShow(true)
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])
    useEffect(() => {
        if (Object.keys(showValue).length && list?.length && !changevalue) {
            const val = list && list?.find(d => d[showValue.value] === value)
            setName(val ? val[showValue?.name] : '')
        }
    }, [list])
    const onSelectChange = (d) => {
        setName(d[showValue?.name])
        onSelect(d)
        setShow(false)
    }
    return <div className="search-select">
        <Input
            helperText={helperText}
            error={error}
            label={label}
            disabled={disabled}
            inputProps={inputProps}
            className={className}
            name={name}
            variant={variant}
            nameVal={nameVal}
            onInputChange={(e) => { onInputChange(e); setName(e.target.value); setChangevalue(true) }}
            labelId={labelId}
            id={id}
            handleClickShow={handleClickShow}
        />
        {show ?
         list?.length ? 
         <div onScroll={onScroll} ref={wrapperRef} id={'content'} className='search-select-list'>
            {
                    list?.map((d) => (
                        <MenuItem key={d.id} onClick={() => onSelectChange(d)}>{d[showValue.name]}</MenuItem>
                    ))
            }
        </div> : 
         noFound?.length ?<div onScroll={onScroll} ref={wrapperRef} id={'content'} className='search-select-list'>
                    <MenuItem>{noFound}</MenuItem>
        </div>:null:null }
    </div>
}
export const Input = ({ handleClickShow,disabled, helperText, error, label, inputProps, className, name, variant, nameVal, onInputChange, labelId, id }) => <>
    <input
        fullWidth
        labelId={labelId}
        id={id}
        disabled={disabled}
        type='text'
        className={className}
        onChange={onInputChange}
        onFocus={handleClickShow}
        value={nameVal}
        name={name}
    />
    {helperText?.length ? <div className="MuiFormHelperText-contained MuiFormHelperText-root Mui-error">{helperText}</div> : null}
</>
export default SearchSelect;