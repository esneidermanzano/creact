import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import {Link} from 'react-router-dom'

    function RenderComments({comments}){
        return(
            <div className="col-md">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {comments.map((comment) => 
                    
                    <React.Fragment key={comment.id}>
                        <li className="mb-3">{comment.comment}</li>
                        <li className="mb-3">-- {comment.author}  
                            <span>
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </span>
                        </li>
                    </React.Fragment>
                )} 
                </ul>
            </div>
        )
        

        
    }

    function RenderDish({dish}){
        return(
            <div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    

    const DishDetail = (props) => {
        const {dish, comments} = props
        if(dish!=null){

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
                    <RenderComments comments={comments}/>
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