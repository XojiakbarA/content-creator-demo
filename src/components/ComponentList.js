import {Button, Grid} from "@mui/material";

function ComponentList({ components, setComponent, setRightDrawerOpen }) {

    const handleButtonClick = (c) => {
        setComponent(c)
        setRightDrawerOpen(true)
    }

    return (
        <Grid container spacing={2} padding={2}>
            {
                components.map(c => (
                    <Grid key={c.title} item xs={"auto"}>
                        <Button
                            startIcon={c.icon}
                            variant={"outlined"}
                            onClick={() => handleButtonClick(c)}
                        >
                            {c.title}
                        </Button>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ComponentList;
