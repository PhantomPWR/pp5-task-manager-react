import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/TaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function TaskCreateForm() {

  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    notes: "",
    image: "",
    task_status: "",
    priority: "",
    watched_id: "",
    watcher_count: "",
    attachments: "",
    created_date: "",
    due_date: "",
    updated_date: "",
    completed_date: "",
    owner_comments: "",
  });
  const { title, category, notes, image, task_status } = taskData;

  const imageInput = useRef(null);

  const history = useHistory();

  const [statusChoices, setStatusChoices] = useState([])

useEffect(() => {
// Make an API call to fetch the status choices
// Update the statusChoices state variable
async function fetchStatusChoices() {
  try {
    const response = await axiosReq.get("/status-choices/");
    console.log(response.data);
    setStatusChoices(response.data);
  } catch (error) {
    console.log(error);
  }
}

    fetchStatusChoices();
    console.log(statusChoices);
  }, []);

  useEffect(() => {
  console.log(statusChoices); // Log statusChoices whenever it changes
}, [statusChoices]);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setTaskData({
        ...taskData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title)
    formData.append('category', taskData.category)
    formData.append('notes', notes)
    formData.append('image', imageInput.current.files[0])
    formData.append('task_status', taskData.task_status)
  

    try {
        const {data} = await axiosReq.post('/tasks/', formData);
        history.push(`/tasks/${data.id}`)
    } catch(err){
        console.log(err);
        if (err.response?.status !== 401){
            setErrors(err.response?.data)
        }
    }

  }


  const textFields = (
    <div className="text-center">
      {/* Title */}
      <Form.Group>
        <Form.Label>Task Title</Form.Label>
        <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
    />
      </Form.Group>
      
      {/* Category */}
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
            as="input"
            name="category"
            value={taskData.category}
            onChange={handleChange}
        /> 
      </Form.Group>
      
      {/* Notes */}
      <Form.Group>
        <Form.Label>Task Notes</Form.Label>
        <Form.Control
            as="textarea"
            rows={6}
            name="notes"
            value={notes}
            onChange={handleChange}
        /> 
      </Form.Group>

      {/* Status */}
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="task_status"
          value={task_status}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          {Array.isArray(statusChoices) && statusChoices.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (

    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={7} lg={7} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col className="py-2 p-0 p-md-2" md={5} lg={5}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                // accept="image/*"
                accept="
                .jpg, .jpeg, .png, .gif, .svg,
                .pdf, .doc, .docx,
                .ppt, .pptx,
                .xls, .xlsx,
                .txt
                "
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TaskCreateForm;