import {
    Button,
    Chip,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import {Code, Notifications} from "@mui/icons-material";
import {alertValidationSchema} from "../../utils/validation";

function AlertAttribute({ setGeneratedComponents, setRightDrawerOpen }) {

    const attributes = {
        variant: ["filled", "outlined", "standard"],
        severity: ["error", "info", "success", "warning"],
    }

    const {handleSubmit, getFieldProps, errors, touched} = useFormik({
        initialValues: {
            id: 1,
            type: "alert",
            content: "",
            attributes: {
                title: "",
                variant: attributes.variant[0],
                severity: attributes.severity[0]
            }
        },
        // enableReinitialize: true,
        validationSchema: alertValidationSchema,
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
                <Divider><Chip icon={<Notifications/>} label={"Alert"} color={"primary"} size={"small"}/></Divider>
                <TextField
                    id="content"
                    label="Content"
                    multiline
                    maxRows={5}
                    error={ touched.content && Boolean(errors.content) }
                    helperText={ touched.content && errors.content }
                    { ...getFieldProps("content") }
                />
                <TextField
                    id="title"
                    label="Title"
                    error={ touched?.attributes?.title && Boolean(errors?.attributes?.title) }
                    helperText={ touched?.attributes?.title && errors?.attributes?.title }
                    { ...getFieldProps("attributes.title") }
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
                    <InputLabel id="severity-label">severity</InputLabel>
                    <Select
                        labelId="severity-label"
                        id="severity-select"
                        label="severity"
                        error={ touched.attributes?.severity && Boolean(errors.attributes?.severity) }
                        { ...getFieldProps("attributes.severity") }
                    >
                        {
                            attributes.severity.map(a => (
                                <MenuItem key={a} value={a}>{a}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText error={true}>{ touched.attributes?.severity && errors.attributes?.severity }</FormHelperText>
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

export default AlertAttribute;
