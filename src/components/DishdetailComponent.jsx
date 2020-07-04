import React from 'react'
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap'


    function renderComments(dish){
        return(
            <ul className="list-unstyled">
            {dish.comments.map((comment) => 
                
                <React.Fragment key={comment.id}>
                    <li className="mb-3">{comment.comment}</li>
                    <li className="mb-3">-- {comment.author}  <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</span>
                    </li>
                </React.Fragment>
            )} 
        </ul>
        )
        

        
    }

    function renderDish(dish){
        return(
            <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md">
                        <h4>Comments</h4>
                        {renderComments(dish)}
                    </div>


                </div>
            </div>
        )
    }
    

    const DishDetail = (props) => {
        const {dish} = props
        if(dish!=null)
            return(
                renderDish(dish)              
            )
        else
            return(
                <div></div>
            );
    }


export default DishDetail;