import {
    Alert,
    AlertTitle,
    Box,
    Chip,
    createTheme,
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MyAppBar from "./components/MyAppBar";
import MyDrawer from "./components/MyDrawer";
import {useState} from "react";
import {Main} from "./components/Main";
import ComponentList from "./components/ComponentList";
import TypographyAttribute from "./components/attribute-lists/TypographyAttribute";
import AlertAttribute from "./components/attribute-lists/AlertAttribute";
import {HorizontalRule, List as ListIcon, Notes, Notifications} from "@mui/icons-material";
import DividerAttribute from "./components/attribute-lists/DividerAttribute";
import ListAttribute from "./components/attribute-lists/ListAttribute";

const drawerWidth = 280

function App() {
    const theme = createTheme({palette: { mode: "dark" }})

    const components = [
        {title: "text", icon: <Notes/>},
        {title: "alert", icon: <Notifications/>},
        {title: "divider", icon: <HorizontalRule/>},
        {title: "list", icon: <ListIcon/>}
    ]

    const [component, setComponent] = useState("")

    const [leftDrawerOpen, setLeftDrawerOpen] = useState(true)
    const [rightDrawerOpen, setRightDrawerOpen] = useState(component !== "")

    const [generatedComponents, setGeneratedComponents] = useState([
        {
            id: 1,
            type: "text",
            content: "Hello World",
            attributes: {
                variant: "h4",
                align: "center",
                gutterBottom: true,
                noWrap: false,
                paragraph: false
            }
        },
        {
            id: 2,
            type: "alert",
            content: "Hello World",
            attributes: {
                title: "Hello Title",
                variant: "filled",
                severity: "info"
            }
        }
    ])

    const renderAttribute = (componentTitle) => {
        switch (componentTitle) {
            case "text":
                return (
                    <TypographyAttribute
                        setGeneratedComponents={setGeneratedComponents}
                        setRightDrawerOpen={setRightDrawerOpen}
                    />
                )
            case "alert":
                return (
                    <AlertAttribute
                        setGeneratedComponents={setGeneratedComponents}
                        setRightDrawerOpen={setRightDrawerOpen}
                    />
                )
            case "divider":
                return (
                    <DividerAttribute
                        setGeneratedComponents={setGeneratedComponents}
                        setRightDrawerOpen={setRightDrawerOpen}
                    />
                )
            case "list":
                return (
                    <ListAttribute
                        setGeneratedComponents={setGeneratedComponents}
                        setRightDrawerOpen={setRightDrawerOpen}
                    />
                )
            default:
                break;
        }
    }
    const renderComponents = (generatedComponents) => {
        return generatedComponents.map(component => {
            switch (component.type) {
                case "text":
                    return (
                        <Typography
                            key={component.id}
                            variant={component.attributes.variant}
                            align={component.attributes.align}
                            gutterBottom={component.attributes.gutterBottom}
                            noWrap={component.attributes.noWrap}
                            paragraph={component.attributes.paragraph}
                        >
                            {component.content}
                        </Typography>
                    )
                case "alert":
                    return (
                        <Alert
                            key={component.id}
                            variant={component.attributes.variant}
                            severity={component.attributes.severity}
                        >
                            {
                                component.attributes.title &&
                                <AlertTitle>{component.attributes.title}</AlertTitle>
                            }
                            {component.content}
                        </Alert>
                    )
                case "divider":
                    return (
                        <Divider
                            key={component.id}
                            variant={component.attributes.variant}
                            textAlign={component.attributes.textAlign}
                        >
                            {
                                component.attributes.chip.show ?
                                    <Chip
                                        label={component.content}
                                        color={component.attributes.chip.color}
                                        size={component.attributes.chip.size}
                                        variant={component.attributes.chip.variant}
                                    /> :
                                    component.content
                            }
                        </Divider>
                    )
                case "list":
                    return (
                        <List
                            key={component.id}
                            subheader={
                                <ListSubheader color={component.attributes.subHeader.color}>
                                    {component.attributes.subHeader.content}
                                </ListSubheader>
                            }
                            dense={component.attributes.dense}
                            component={component.attributes.paper ? Paper : null}
                        >
                            {
                                component.attributes.items.map(item => (
                                    <ListItem
                                        key={item.id}
                                        dense={item.dense}
                                        divider={item.divider}

                                    >
                                        <ListItemText primary={item.content}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    )
                default:
                    return null
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <CssBaseline/>
                <MyAppBar
                    leftDrawerOpen={leftDrawerOpen}
                    rightDrawerOpen={rightDrawerOpen}
                    setLeftDrawerOpen={setLeftDrawerOpen}
                    setRightDrawerOpen={setRightDrawerOpen}
                />
                <Box display={"flex"}>
                    <MyDrawer
                        anchor={"left"}
                        open={leftDrawerOpen}
                        drawerWidth={drawerWidth}
                    >
                        <ComponentList
                            components={components}
                            setComponent={setComponent}
                            setRightDrawerOpen={setRightDrawerOpen}
                        />
                    </MyDrawer>
                    <Main leftDrawerOpen={leftDrawerOpen} rightDrawerOpen={rightDrawerOpen} drawerWidth={drawerWidth}>
                        <Toolbar/>
                        <Stack spacing={1}>
                            { renderComponents(generatedComponents) }
                        </Stack>
                    </Main>
                    <MyDrawer
                        anchor={"right"}
                        open={rightDrawerOpen}
                        drawerWidth={drawerWidth}
                    >
                        { renderAttribute(component.title) }
                    </MyDrawer>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
