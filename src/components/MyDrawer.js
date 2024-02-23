import {Drawer, Toolbar} from "@mui/material";

function MyDrawer({ anchor, open, drawerWidth, children }) {

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor={anchor}
            open={open}
        >
            <Toolbar/>
            { children }
        </Drawer>
    )
}

export default MyDrawer;
