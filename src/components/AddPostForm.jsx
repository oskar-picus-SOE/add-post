import {Alert, Avatar, Box, Button, Snackbar, TextField, Typography} from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {useState} from "react";
import {addPost} from "../postService";

export const AddPostForm = () => {
    const [snackbarProps, setSnackbarProps] = useState({
        open: false,
        severity: 'error',
        text: ''
    });
    const [addPostData, setAddPostData] = useState({
        title: '',
        content: ''
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps((prev) => ({...prev, open: false}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(addPostData)
            .then(() => {
                setSnackbarProps({open: true, severity: "success", text: 'Added post successfully'})
                setAddPostData({title: '', content: ''})
            })
            .catch(() => setSnackbarProps({open: true, severity: "error", text: 'An error occurred, please try again'}))
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Snackbar open={snackbarProps.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarProps.severity} sx={{width: '100%'}}>
                    {snackbarProps.text}
                </Alert>
            </Snackbar>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <PostAddIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Add form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value={addPostData.title}
                    onChange={(e) => setAddPostData((prev) => ({...prev, title: e.target.value}))}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    maxRows={Infinity}
                    name="content"
                    label="Content"
                    type="content"
                    id="content"
                    autoComplete="content"
                    value={addPostData.content}
                    onChange={(e) => setAddPostData((prev) => ({...prev, content: e.target.value}))}></TextField>
                <Button
                    type={"submit"}
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Add
                </Button>
            </Box>
        </Box>
    )
}