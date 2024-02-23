import {useFormik} from "formik";
import {
    Button,
    Checkbox, Chip, Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {useState} from "react";
import {Code, Commit, HorizontalRule} from "@mui/icons-material";

function DividerAttribute({ setGeneratedComponents, setRightDrawerOpen }) {

    const attributes = {
        textAlign: ["center", "left", "right"],
        variant: ["fullWidth", "inset", "middle"],
        chip: {
            color: ["default", "primary", "secondary", "error", "info", "success", "warning"],
            size: ["medium", "small"],
            variant: ["filled", "outlined"]
        }
    }

    const {handleSubmit, getFieldProps, values, errors, touched} = useFormik({
        initialValues: {
            id: 1,
            type: "divider",
            content: "",
            attributes: {
                variant: attributes.variant[0],
                textAlign: attributes.textAlign[0],
                chip: {
                    show: false,
                    color: attributes.chip.color[0],
                    size: attributes.chip.size[0],
                    variant: attributes.chip.variant[0]
                }
            }
        },
        enableReinitialize: true,
        // validationSchema: typographyValidationSchema,
        onSubmit: (data, {resetForm}) => {
            data.id = new Date().getTime()
            setGeneratedComponents(prev => [...prev, data])
            setRightDrawerOpen(false)
            resetForm()
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} padding={2}>
                <Divider><Chip icon={<HorizontalRule/>} label={"Divider"} color={"primary"} size={"small"}/></Divider>
                <TextField
                    id="content"
                    label="Content"
                    error={ touched.content && Boolean(errors.content) }
                    helperText={ touched.content && errors.content }
                    { ...getFieldProps("content") }
                />
                <FormControl fullWidth>
                    <InputLabel id="textAlign-label">textAlign</InputLabel>
                    <Select
                        labelId="textAlign-label"
                        id="textAlign-select"
                        label="textAlign"
                        error={ touched.attributes?.textAlign && Boolean(errors.attributes?.textAlign) }
                        { ...getFieldProps("attributes.textAlign") }
                    >
                        {
                            attributes.textAlign.map(v => (
                                <MenuItem key={v} value={v}>{v}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText error>{ touched.attributes?.textAlign && errors.attributes?.textAlign }</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="variant-label">variant</InputLabel>
                    <Select
                        labelId="variant-label"
                        id="variant-select"
                        label="variant"
                        error={ touched.attributes?.variant && Boolean(errors.attributes?.variant) }
                        { ...getFieldProps("attributes.variant") }
                    >
                        {
                            attributes.variant.map(v => (
                                <MenuItem key={v} value={v}>{v}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText error={true}>{ touched.attributes?.variant && errors.attributes?.variant }</FormHelperText>
                </FormControl>
                <Divider><Chip icon={<Commit/>} label={"Chip"} color={"primary"} variant={"outlined"} size={"small"}/></Divider>
                <FormControlLabel
                    control={
                        <Checkbox
                            { ...getFieldProps("attributes.chip.show") }
                            inputProps={{ 'aria-label': 'chip' }}
                        />
                    }
                    label="chip"
                />
                <FormControl fullWidth disabled={!values.attributes.chip.show}>
                    <InputLabel id="align-label">color</InputLabel>
                    <Select
                        labelId="color-label"
                        id="color-select"
                        label="color"
                        error={ touched.attributes?.chip?.color && Boolean(errors.attributes?.chip?.color) }
                        { ...getFieldProps("attributes.chip.color") }
                    >
                        {
                            attributes.chip.color.map(v => (
                                <MenuItem key={v} value={v}>{v}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText error={true}>{ touched.attributes?.chip?.color && errors.attributes?.chip?.color }</FormHelperText>
                </FormControl>
                <FormControl fullWidth disabled={!values.attributes.chip.show}>
                    <InputLabel id="align-label">size</InputLabel>
                    <Select
                        labelId="size-label"
                        id="size-select"
                        label="size"
                        error={ touched.attributes?.chip?.size && Boolean(errors.attributes?.chip?.size) }
                        { ...getFieldProps("attributes.chip.size") }
                    >
                        {
                            attributes.chip.size.map(v => (
                                <MenuItem key={v} value={v}>{v}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText error={true}>{ touched.attributes?.chip?.size && errors.attributes?.chip?.size }</FormHelperText>
                </FormControl>
                <FormControl fullWidth disabled={!values.attributes.chip.show}>
                    <InputLabel id="align-label">variant</InputLabel>
                    <Select
                        labelId="variant-label"
                        id="variant-select"
                        label="variant"
                        error={ touched.attributes?.chip?.variant && Boolean(errors.attributes?.chip?.variant) }
                        { ...getFieldProps("attributes.chip.variant") }
                    >
                        {
                            attributes.chip.variant.map(v => (
                                <MenuItem key={v} value={v}>{v}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText error={true}>{ touched.attributes?.chip?.variant && errors.attributes?.chip?.variant }</FormHelperText>
                </FormControl>
                <Button
                    variant={"contained"}
                    type={"submit"}
                    startIcon={<Code/>}
                >
                    Generate
                </Button>
            </Stack>
        </form>
    )
}

export default DividerAttribute;
