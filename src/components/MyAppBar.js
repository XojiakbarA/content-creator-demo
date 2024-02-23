import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight, Menu} from "@mui/icons-material";

function MyAppBar({ setLeftDrawerOpen, setRightDrawerOpen, leftDrawerOpen, rightDrawerOpen }) {
    return (
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setLeftDrawerOpen(prev => !prev)}
                >
                    { leftDrawerOpen ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <Box sx={{ flexGrow: 1 }}/>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setRightDrawerOpen(prev => !prev)}
                >
                    { rightDrawerOpen ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar;
