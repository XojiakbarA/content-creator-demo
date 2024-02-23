import {
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel, FormHelperText,
    IconButton,
    Stack,
    TextField
} from "@mui/material";
import {FieldArray, FormikProvider, useFormik} from "formik";
import {Add, Code, List} from "@mui/icons-material";
import {listValidationSchema} from "../../utils/validation";

function ListAttribute({ setGeneratedComponents, setRightDrawerOpen }) {

    const attributes = {
        subHeader: {
            color: ["default", "inherit", "primary"]
        }
    }

    const formik = useFormik({
        initialValues: {
            id: 1,
            type: "list",
            attributes: {
                subHeader: {
                    content: "",
                    color: attributes.subHeader.color[0]
                },
                dense: false,
                paper: false,
                items: [
                    {
                        id: 1,
                        content: "",
                        dense: false,
                        divider: false
                    }
                ],
            }
        },
        enableReinitialize: true,
        validationSchema: listValidationSchema,
        onSubmit: (data, {resetForm}) => {
            data.id = new Date().getTime()
            setGeneratedComponents(prev => [...prev, data])
            setRightDrawerOpen(false)
            resetForm()
        }
    })
    const {handleSubmit, getFieldProps, values, errors, touched} = formik

    return (
        <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} padding={2}>
                <Divider><Chip icon={<List/>} label={"List"} color={"primary"} size={"small"}/></Divider>
                <TextField
                    id="sub-header"
                    label="subHeader"
                    error={ touched.attributes?.subHeader?.content && Boolean(errors.attributes?.subHeader?.content) }
                    helperText={ touched.attributes?.subHeader?.content && errors.attributes?.subHeader?.content }
                    { ...getFieldProps("attributes.subHeader.content") }
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            { ...getFieldProps("attributes.dense") }
                            inputProps={{ 'aria-label': 'dense' }}
                        />
                    }
                    label="dense"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            { ...getFieldProps("attributes.paper") }
                            inputProps={{ 'aria-label': 'paper' }}
                        />
                    }
                    label="paper"
                />
                {
                    touched.attributes?.items && errors.attributes?.items && typeof errors.attributes?.items === "string" &&
                    <FormHelperText error>{ errors.attributes?.items }</FormHelperText>
                }
                <FieldArray
                    name={"attributes.items"}
                    render={({ remove, push }) => (
                        <Stack alignItems={"start"} spacing={2}>
                            {values.attributes.items.map((item, i) => (
                                <Stack width={"100%"} key={i} spacing={1}>
                                    <Divider>
                                        <Chip
                                            icon={<List/>}
                                            label={`Item ${i}`}
                                            size={"small"}
                                            onDelete={() => remove(i)}
                                        />
                                    </Divider>
                                    <TextField
                                        size={"small"}
                                        label="Content"
                                        error={ touched.attributes?.items[i]?.content && Boolean(errors.attributes?.items[i]?.content) }
                                        helperText={ touched.attributes?.items[i]?.content && errors.attributes?.items[i]?.content }
                                        { ...getFieldProps(`attributes.items[${i}].content`) }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size={"small"}
                                                { ...getFieldProps(`attributes.items[${i}].dense`) }
                                                inputProps={{ 'aria-label': `item-${i}-dense` }}
                                            />
                                        }
                                        label="dense"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size={"small"}
                                                { ...getFieldProps(`attributes.items[${i}].divider`) }
                                                inputProps={{ 'aria-label': `item-${i}-divider` }}
                                            />
                                        }
                                        label="divider"
                                    />
                                </Stack>
                            ))}
                            <IconButton
                                type="button"
                                onClick={() => push({ id: new Date().getTime(), content: "", dense: false, divider: false })}
                                color={"primary"}
                            >
                                <Add/>
                            </IconButton>
                        </Stack>
                    )}
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
        </FormikProvider>
    )
}

export default ListAttribute;
