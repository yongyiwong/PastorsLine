import {
    Fragment,
    useEffect,
    useState
} from "react";
import {
    Button, Modal, Form,
    Container, Row, Col
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {

    const [showModal, setShowModal] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [evenOnly, setEvenOnly] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const modalContents = {
        modalAHeader: "Modal A",
        modalBHeader: "Modal B"
    }

    const contacts = {
        all: "/contacts/world",
        usonly: "/contacts/usonly"
    }

    const handleShow = (type) => {
        setShowModal(true);
        setModalHeader(modalContents[type]);
    };

    const handleClose = () => {
        setShowModal(false);
    }

    const gotoContactsPage = (country) => {
        navigate(contacts[country] + (evenOnly ? "/even" : "/all"));
    };

    return (
        <Fragment>
            <Container fluid className="App">
                <Row className="align-items-center center">
                    <Col className="text-center">
                        <Button variant="primary" style={{ backgroundColor: '#46139f' }} onClick={() => handleShow("modalAHeader")}>Button A</Button>
                        <Button variant="primary" style={{ backgroundColor: '#ff7f50', marginLeft: 10 }} onClick={() => handleShow("modalBHeader")}>Button B</Button>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col md={4} className="text-center">
                                <Button variant="primary" style={{ backgroundColor: '#46139f' }} onClick={() => gotoContactsPage("all")}>All Contacts</Button>
                            </Col>
                            <Col md={4} className="text-center">
                                <Button variant="primary" style={{ backgroundColor: '#ff7f50' }} onClick={() => gotoContactsPage("usonly")}>US Contacts</Button>
                            </Col>
                            <Col md={4} className="text-center">
                                <Button variant="danger" style={{ backgroundColor: '#46139f' }} onClick={handleClose}>Close</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Check type="checkbox"
                        label="Even only"
                        checked={evenOnly}
                        onChange={() => setEvenOnly(!evenOnly)} />
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}