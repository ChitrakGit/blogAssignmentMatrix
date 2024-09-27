import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/loading";
import {
  addBlogCall,
  addCommentCall,
  deleteBlogCall,
  editBlogCall,
  fetchBlogCall,
} from "../config/todoSlice";
import { selectBlogStatus } from "../selectors/selectors";

const Dashboard: React.FC = () => {
  const dispatch: any = useDispatch();
  const loadingStatus = useSelector(selectBlogStatus);
  const [items, setItems] = React.useState<any[]>([]);
  const [blog, setBlog] = React.useState("");
  const [length, setLength] = React.useState(0);
  const [editMode, setEditMode] = React.useState<number | null>(null); // Track which blog is being edited
  const [editedBlog, setEditedBlog] = React.useState(""); // Store the new blog title

  React.useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchBlogCall(100)).then((data: any) => {
        if (data.payload?.success) {
          const blogsWithComments = data.payload.blogs.map((item: any) => ({
            ...item,
            showComments: false,
            comment: "", 
            comments: [...item.comments]
          }));
          setItems(blogsWithComments);
          setLength(data.payload.blogsCount);
        }
      });
    }
  }, [dispatch, items]);

  const handleLogout = () => {
    localStorage.clear();
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) {
      return alert("Please write a blog post.");
    }
    dispatch(addBlogCall({ blog, isDone: false })).then(() => {
      setBlog("");
      window.location.reload(); // reload to refresh the posts list
    });
  };

  const deleteItem = (item: { [key: string]: string | number }) => {
    dispatch(deleteBlogCall(item._id as string)).then(() => {
      window.location.reload(); // reload to refresh the posts list
    });
  };

  const handleToggleComments = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, showComments: !item.showComments } : item
      )
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, comment: value } : item
      )
    );
  };

  const handleAddComment = (index: number) => {
    const blogId = items[index]._id; // Assuming each blog post has an _id
    const commentText = items[index].comment;
    if (commentText.trim()) {
      dispatch(addCommentCall({ blogId, comment: commentText } as any)).then((response: any) => {
        if (response.payload?.success) {
          setItems((prevItems) =>
            prevItems.map((item, idx) =>
              idx === index
                ? {
                    ...item,
                    comments: [...item.comments, commentText],
                    comment: "", // Clear input after adding
                  }
                : item
            )
          );
        } else {
          alert("Failed to add comment");
        }
      });
    }
  };

  const handleEditBlog = (index: number) => {
    setEditMode(index);
    setEditedBlog(items[index].blog); // Pre-fill the edit input with the current blog title
  };

  const handleUpdateBlog = (index: number) => {
    if (editedBlog.trim()) {
      const blogId = items[index]._id;
      const _payload = {...items,blog:editedBlog}
      dispatch(editBlogCall({ _id: blogId, payload: _payload as any })).then((response: any) => {
        if (response.payload?.success) {
          setItems((prevItems) =>
            prevItems.map((item, idx) =>
              idx === index ? { ...item, blog: editedBlog } : item
            )
          );
          setEditMode(null); // Exit edit mode
          setEditedBlog(""); // Clear the input
        } else {
          alert("Failed to update blog");
        }
      });
    }
  };

  if (loadingStatus === "loading") {
    return <LoadingScreen open message="Processing..." severity="info" />;
  }

  const userName = localStorage.getItem("username") || "Name";
  
  return (
    <div>
      <Navbar userName={userName} onLogout={handleLogout} />
      <div style={{ margin: "20px", padding: "0px 10px" }}>
        <Box
          component="form"
          onSubmit={addTask}
          noValidate
          autoComplete="off"
          display="flex"
          alignItems="center"
        >
          <TextField
            id="add-blog-input"
            label="Add Blog"
            variant="outlined"
            fullWidth
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            sx={{ flexBasis: "90%", marginRight: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginLeft: "auto" }}
            style={{ height: "55px", width: "90px" }}
          >
            ADD
          </Button>
        </Box>
      </div>
      <hr />

      {items.map((item, index) => (
        <div key={item._id}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "left",
              textAlign: "left",
            }}
          >
            {editMode === index ? (
              <TextField
                value={editedBlog}
                onChange={(e) => setEditedBlog(e.target.value)}
                variant="outlined"
                size="small"
                style={{ marginRight: "10px" }}
              />
            ) : (
              <span>{item.blog}</span>
            )}
            <div>
              {editMode === index ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateBlog(index)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditBlog(index)}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteItem(item)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </Button>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={() => handleToggleComments(index)}
            >
              {item.showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>

          {item.showComments && (
            <div style={{ marginTop: "10px" }}>
              <h3>Comments</h3>
              {item.comments.length > 0 ? (
                <ul>
                  {item.comments.map((element: any, idx: number) => (
                    <li key={idx}>{element.comment}</li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet.</p>
              )}

              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={item.comment}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Add a comment"
                  style={{ padding: "5px", width: "70%", marginRight: "10px" }}
                />
                <button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddComment(index)}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
