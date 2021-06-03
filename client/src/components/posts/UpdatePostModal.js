import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useContext, useEffect, useState} from 'react'
import {PostContext} from '../../contexts/PostContext'

const UpdatePostModal = () =>{

    const {postState: 
        {post}, 
        showUpdatePostModal, 
        setShowUpdatePostModal, 
        updatePost, 
        setShowToast 
    } = useContext(PostContext)

    useEffect(() => setUpdatedPost(post), [post])


    const [updatedPost, setUpdatedPost] = useState(post)

    const {title, description, url, status} = updatedPost

    const onChangeUpdatedPostForm = event => 
        setUpdatedPost({...updatedPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setShowUpdatePostModal(false)
        setUpdatedPost(post)
    }

    const onSubmit = async event =>{
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        setShowUpdatePostModal(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})

    }

    // const resetAddPostData = () =>{
    //     setNewPost({title:'', description:'', url:'', status:'Wishlist'})
    //     setShowAddPostModal(false)
    // }

    return (
        <Modal show = {showUpdatePostModal} onhide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>You wanna change something?</Modal.Title>
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
                            onChange = {onChangeUpdatedPostForm}
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
                            onChange = {onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Collected url' 
                            name='url'
                            value={url}
                            onChange = {onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            as='select' 
                            value={status} 
                            name='status' 
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value='Wishlist'>Wishlist</option>
                            <option value='Learning'>Learning</option>
                            <option value='Finished'>Finished</option>
                        </Form.Control>
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

export default UpdatePostModal