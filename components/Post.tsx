import {Paper, Button, Typography} from "@mui/material";
import {FC, useCallback, useState} from "react";
import {Comments, Post} from "../types";

const Card: FC<Post & { comments: Comments }> = ({id, comments, body, title}) => {
    const [showComments, setShowComments] = useState(false);
    const toggleComments = useCallback(() => setShowComments(prev => !prev), []);

    return (
        <Paper sx={{p: 2, margin: 2, width: '80vw'}} tabIndex={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{body}</Typography>
            <Button onClick={toggleComments} tabIndex={1} aria-label="press to expand or collapse comments">
                <Typography variant="h6">Comments {comments.length}</Typography>
            </Button>
            {comments.map((comment) => (
                <Paper key={comment.id} sx={{p: 2, margin: 2}} hidden={!showComments} tabIndex={1}>
                    <Typography variant="h6">{comment.name}</Typography>
                    <Typography variant="body1">{comment.body}</Typography>
                </Paper>
            ))}
        </Paper>
    );
};

export default Card;
