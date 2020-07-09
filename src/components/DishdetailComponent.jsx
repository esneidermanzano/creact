import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, FormGroup, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'

import {Control, LocalForm, Errors} from 'react-redux-form'

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends React.Component{
        constructor(props){
            super(props)
            this.state={
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        }
        
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

        handleSubmit(values) {
            console.log("===================    ")
            console.log(values)
            this.toggleModal()
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
            
        }
    
          

        render(){
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleModal} color="secondary">
                        <span className="fa fa-pencil"> Submit Comment</span>
                    </Button>{' '}
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row>
                                    <Col>
                                    <Label htmlFor="rating" >Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    </Col>
                                </Row>
                                    
                                <Row>
                                <Col>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                            />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                        </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label htmlFor="comment">Comment</Label>                                    
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                    </Col>

                                </Row>
                                <Button type="submit" color="primary">Submit</Button>
                                 
                            </LocalForm>
                                    

                        </ModalBody>
                    </Modal>
                </React.Fragment>
           
            )
        }
    }

    
    
    function RenderComments({comments, postComment, dishId}){
        return(
            <div className="col-md">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                <Stagger in>
                {comments.map((comment) => 
                    <Fade in>
                    <React.Fragment key={comment.id}>
                        
                        <li className="mb-3">{comment.comment}</li>
                        <li className="mb-3">-- {comment.author}  
                            <span>
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </span>
                        </li>
                        
                    </React.Fragment>
                    </Fade>
                )} 
                 </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
                    
            </div>
        )
        

        
    }

    function RenderDish({dish}){
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            </FadeTransform>
        )
    }
    

    const DishDetail = (props) => {

        const {dish, comments} = props

        if (props.isLoading) {  
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        } else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }else if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active> {dish.name} </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr/>
                    </div>
                </div> 

                <div className="row">
                    <RenderDish dish={dish}/>
                    <RenderComments comments={comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}/>
                </div>
                </div>
            )
        }
            
        else
            return(
                <div></div>
            );
    }


export default DishDetail;