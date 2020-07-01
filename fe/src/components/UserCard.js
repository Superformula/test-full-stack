import React from 'react'
import { Image, Card, Container, Row, Col } from "react-bootstrap";
import EditIcon from "../ui/svg/edit-icon.svg"

// --------------
// --------------
// --------------
const UserCard = ({ user }) => {
    // --------------
    return (
        <Card className="p-3 py-5 mb-5">
            <Image
                className="edit-icon"
                src={EditIcon}
                style={{ display: "none" }}
            />
            <div className="align-self-center mb-2">
                <Image
                    style={{
                        background: `transparent url('https://source.unsplash.com/collection/3053437/${user.id}') no-repeat 50% 50%`,
                        maxWidth: "168px",
                        width: "168px",
                        height: "168px",
                        borderRadius: "90%/100%",
                        backgroundSize: "cover",
                    }} roundedCircle />
            </div>

            <Card.Body>
                <Card.Title>
                    <Container className="px-0">
                        <Row noGutters={true}>
                            <Col className="text-ellipsis">{user.name}</Col>
                            <Col className="card-title-byline" style={{ display: "none" }}>created <span>01 Feb 2020</span></Col>
                        </Row>
                    </Container>
                </Card.Title>
                <Card.Text className="text-ellipsis">
                    Lorem ipsum dolor sit amet, consectetur…
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default UserCard
