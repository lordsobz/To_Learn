import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useContext, useState} from 'react'
import {PostContext} from '../../contexts/PostContext'

const AddPostModal = () =>{

    const {showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext)

    const [newPost, setNewPost] = useState({
        title:'',
        description: '',
        url:'',
        status: 'Wishlist'
    })

    const {title, description, url} = newPost

    const onChangeNewPostForm = event => 
        setNewPost({...newPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        resetAddPostData()
    }

    const onSubmit = async event =>{
        event.preventDefault()
        const {success, message} = await addPost(newPost)
        resetAddPostData()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})

    }

    const resetAddPostData = () =>{
        setNewPost({title:'', description:'', url:'', status:'Wishlist'})
        setShowAddPostModal(false)
    }

    return (
        <Modal show = {showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>You got some thing to collect?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control 
                            type = 'text' 
                            placeholder='Title' 
                            name='title' 
                            required 
                            aria-describedby='title-help'
                            value={title}
                            onChange = {onChangeNewPostForm}
                        />
                        <Form.Text id = 'tittle-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as = 'textarea' 
                            rows={3}
                            placeholder='Description' 
                            name='description' 
                            value={description}
                            onChange = {onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Collected url' 
                            name='url'
                            value={url}
                            onChange = {onChangeNewPostForm} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Collect</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal