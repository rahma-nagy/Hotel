import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { Typography, Button, Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { commentUrl } from '../../../../services/api';
import style from './Comments.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';
import CustomModal from '../../../Shared/CustomModal/CustomModal';
import loginImge1 from '../../../../assets/images/login Popup1.jpg'
import { useNavigate } from 'react-router-dom';

// interface IComments {
//   comment: string;
//   roomId: string;
// }

function Comments({ roomId }) {
  const { requestHeaders, userId, userData } = useContext(AuthContext);
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();

  const [state, setState] = useState({
    commentInput: "",
    commentsList: [],
    editingCommentId: null,
    loading: false, // Add loading state

  });
  const [showComments, setShowComments] = useState(false);
  // ***********view-Modal*************
  const [modalState, setModalState] = React.useState("close");
  const showLoginModal = () => {
    setModalState("login-modal");
  };
  const handleClose = () => {
    setModalState("close");
  };
  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = (data) => {
    // Set loading state to indicate that comment creation is in progress
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    if (!userData) {
      // toast.info('login now')
      showLoginModal()
    } else {
      axios.post(
        `${commentUrl}`,
        {
          roomId: roomId,
          comment: data.comment,
        },
        {
          headers: requestHeaders,
        }
      )
        .then((response) => {
          // Update the state with the new comments list and reset the input field
          setState((prevState) => ({
            ...prevState,
            commentInput: "",
            commentsList: response?.data?.data?.roomComments || [],
            loading: false, // Set loading to false after a successful response
          }));
          toast.success("Comment created successfully");
          getAllComments();
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Error creating comment");
          // Reset the loading state in case of an error
          setState((prevState) => ({
            ...prevState,
            loading: false,
          }));
        });
    }

  };
  const goLogin = () => {
    // navigate('/login');
    navigate('/login', { state: { from: location.pathname } });
  };


  const getAllComments = () => {

    axios.get(`${commentUrl}/${roomId}`, {
      headers: requestHeaders,
    })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          commentsList: response?.data?.data?.roomComments,
        }));
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };
  // const toggleComments = () => {
  //   setShowComments((prevShowComments) => !prevShowComments);
  // };
  const toggleComments = () => {
    // Fetch comments when the button is clicked, regardless of user login status
    getAllComments();

    // Toggle the visibility of comments
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const editComment = (commentId, comment) => {
    setState((prevState) => ({
      ...prevState,
      editingCommentId: commentId,
      commentInput: comment,
    }));
  };

  const cancelEdit = () => {
    setState((prevState) => ({
      ...prevState,
      editingCommentId: null,
      commentInput: "",
    }));
  };

  const updateComment = (commentId) => {
    // Set loading state to indicate that an update is in progress
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    axios.patch(
      `${commentUrl}/${commentId}`,
      {
        comment: state.commentInput,
      },
      {
        headers: requestHeaders,
      }
    )
      .then((response) => {
        // Update the state with the new comments list and reset the editing state
        setState((prevState) => ({
          ...prevState,
          commentsList: response?.data?.data?.roomComments || [],
          editingCommentId: null,
          commentInput: "", // Reset comment input after successful update
          loading: false, // Set loading to false after a successful response
        }));
        toast.success("Comment updated successfully");
        getAllComments();
      })
      .catch((error) => {
        console.error("Update Error:", error);
        toast.error(error.response?.data?.message || "Error updating comment");
        // Reset the loading state in case of an error
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      });
  };
  const deleteComment = (commentId) => {
    setState((prevState) => ({
      ...prevState,
      loading: true, // Set loading to true before making the request
    }));

    axios
      .delete(`${commentUrl}/${commentId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          commentsList: response?.data?.data?.roomComments || [],
          loading: false, // Set loading to false after a successful response
        }));
        toast.success("Comment deleted successfully");
        getAllComments();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error(error.response?.data?.message || "Error deleting comment");
        setState((prevState) => ({
          ...prevState,
          loading: false, // Set loading to false after an error
        }));
      });
  };


  return (
    <Box sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}>
      <Typography variant="h5" sx={{ pt: "1.5rem", pb: "1.5rem", mb: '1.6rem' }}>Add Your Comment</Typography>
      <form onSubmit={handleSubmit(createComment)}>
        <textarea
          {...register('comment', { required: true })}
          className={style.messageField}
          id="outlined-multiline-static"
          placeholder='Write Your Comment Here...'
          contentEditable='true'
          rows={6}
          value={state.commentInput}
          onChange={(e) => setState((prevState) => ({ ...prevState, commentInput: e.target.value }))}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
        >
          Send
        </Button>
        {/* Button to toggle comments visibility */}
        <div style={{ marginTop: '1rem' }}>
          <Button variant="contained" onClick={toggleComments}>
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </Button>
        </div>
      </form>

      {/* Display Comments */}
      <Container>
        <Box sx={{ pt: "1.5rem", pb: "4rem" }}>


          {showComments && (
            <div>
              {state.commentsList

                .map((comment) => (
                  <div key={comment._id} className={style.commentContainer}>
                    {state.editingCommentId === comment._id ? (
                      <>
                        <textarea
                          value={state.commentInput}
                          onChange={(e) => setState((prevState) => ({ ...prevState, commentInput: e.target.value }))}
                        />
                        <Button onClick={() => updateComment(comment._id)}>Update</Button>
                        <Button onClick={cancelEdit}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <div className={style.commentContent}>
                          <p>{comment?.user?.userName}:{comment.comment}</p>
                        </div>
                        {/* <div className={style.commentActions}>

                          <Button onClick={() => editComment(comment._id, comment.comment)}>
                            <EditIcon />
                          </Button>
                          <Button onClick={() => deleteComment(comment._id)}>
                            <DeleteIcon />
                          </Button>

                        </div> */}
                        <div className={style.commentActions}>
                          {comment.user?._id === userId && (
                            <>
                              <Button onClick={() => editComment(comment._id, comment.comment)}>
                                <EditIcon />
                              </Button>
                              <Button onClick={() => deleteComment(comment._id)}>
                                <DeleteIcon />
                              </Button>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}

        </Box>
      </Container>
      <CustomModal
        open={modalState === "login-modal"}
        onClose={handleClose}
        title="Hey you need to login first !"
      >

        <div className="customModal">
          <img src={loginImge1} style={{ width: '300px', height: '300px' }} alt="" />

          <Grid
            item xs={6}>
            <Button
              sx={{ mb: '9px' }}
              variant="contained"
              type="submit"
              onClick={handleClose}
              className="btnClose"
              color="error"
            >
              close
            </Button>
          </Grid>
        </div>

        <Grid item xs={6}>
          <Button
            sx={{ mt: '45px', ml: '-70px' }}
            variant="contained"
            type="submit"
            onClick={goLogin}
            className="btnClose"
          >

            Login
          </Button>
        </Grid>
      </CustomModal>

    </Box>


  );
}

export default Comments;
