import {Paper, Button, Typography, Grid} from "@mui/material";
import Image from "next/image";
import {FC, useCallback, useState} from "react";

const Thumbnail: FC<{ thumbnailUrl: string; title: string }> = ({thumbnailUrl, title}) => {
    const [showFullScreen, setShowFullScreen] = useState(false);
    const toggleFullScreen = useCallback(() => setShowFullScreen(prev => !prev), []);

    return (
        <>
            <Button onClick={toggleFullScreen}>
                <Paper sx={{p: 2, m: 1}}>
                    <Image src={thumbnailUrl} alt={title} width="50" height="50"/>
                </Paper>
            </Button>
            {showFullScreen && (
                <Paper sx={{position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000}}>
                    <Image src={thumbnailUrl} alt={title} layout="fill" objectFit="contain"/>
                    <Button onClick={toggleFullScreen}>Close</Button>
                </Paper>
            )}
        </>
    )
};

export default Thumbnail;
