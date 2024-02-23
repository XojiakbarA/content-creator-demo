import {
    Button, Chip, Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch, TextField
} from "@mui/material";
import {useFormik} from "formik";
import {Code, Notes} from "@mui/icons-material";
import {typographyValidationSchema} from "../../utils/validation";

function TypographyAttribute({ setGeneratedComponents, setRightDrawerOpen }) {

    const attributes = {
        align: ["inherit", "center", "justify", "left", "right"],
        variant: ["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]
    }

    const {handleSubmit, getFieldProps, errors, touched} = useFormik({
        initialValues: {
            id: 1,
            type: "text",
            content: "",
            attributes: {
                variant: attributes.variant[0],
                align: attributes.align[0],
                gutterBottom: false,
                noWrap: false,
                paragraph: false
            }
        },
        // enableReinitialize: true,
        validationSchema: typographyValidationSchema,
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
            <Divider><Chip icon={<Notes/>} label={"Text"} color={"primary"} size={"small"}/></Divider>
            <TextField
                id="content"
                label="Content"
                multiline
                maxRows={5}
                error={ touched.content && Boolean(errors.content) }
                helperText={ touched.content && errors.content }
                { ...getFieldProps("content") }
            />
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
            <FormControl fullWidth>
                <InputLabel id="align-label">align</InputLabel>
                <Select
                    labelId="align-label"
                    id="align-select"
                    label="align"
                    error={ touched.attributes?.align && Boolean(errors.attributes?.align) }
                    { ...getFieldProps("attributes.align") }
                >
                    {
                        attributes.align.map(a => (
                            <MenuItem key={a} value={a}>{a}</MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText error={true}>{ touched.attributes?.align && errors.attributes?.align }</FormHelperText>
            </FormControl>
            <FormControlLabel
                control={
                    <Switch
                        { ...getFieldProps("attributes.gutterBottom") }
                        inputProps={{ 'aria-label': 'gutterBottom' }}
                    />
                }
                label="gutterBottom"
            />
            <FormControlLabel
                control={
                    <Switch
                        { ...getFieldProps("attributes.noWrap") }
                        inputProps={{ 'aria-label': 'noWrap' }}
                    />
                }
                label="noWrap"
            />
            <FormControlLabel
                control={
                    <Switch
                        { ...getFieldProps("attributes.paragraph") }
                        inputProps={{ 'aria-label': 'paragraph' }}
                    />
                }
                label="paragraph"
            />
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

export default TypographyAttribute;
