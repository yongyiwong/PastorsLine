import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Container, Row, Col } from "react-bootstrap";
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

export default function Contacts() {

    const [counter, setCounter] = useState(0);
    const [show, setShow] = useState(true);
    const [header, setHeader] = useState("");
    const [contacts, setContacts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [detail, setDetail] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.country === "world") {
            setHeader("All Contacts");
        }
        else {
            setHeader("US Contacts");
        }
        fetchContacts();
    }, []);

    const handleClose = () => {
        setShow(false);
        navigate("/dashboard");
    };

    const fetchContacts = () => {
        const queryParams = {
            noGroupDuplicates: 1,
            companyId: 560,
            page: page
        }
        if (params.country !== "world") params.countryId = 226

        axios.get(`/api/contacts.json`,
            {
                params: queryParams
            })
            .then((response) => {
                const contacts_ids = [];
                setTotal(response.data.total);
                setPage(prev => prev + 1);
                if ((response.data.contacts_ids.length + contacts.length) == response.data.total) setHasMore(false);
                response.data.contacts_ids.map((item) => {
                    if (params.even === "even") {
                        if (item % 2 === 0) return contacts_ids.push(item);
                    } else return contacts_ids.push(item);
                });
                const filteredContacts = [];
                contacts_ids.map(item => {
                    filteredContacts.push(response.data.contacts[item]);
                });
                setContacts((prevContacts) => [...prevContacts, ...filteredContacts]);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
            });
    };

    const showDetails = (index) => {
        setDetail("id=" + contacts[index].id + ", phone=" + contacts[index].phone_number);
        setShowDetail(true);
    }

    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InfiniteScroll
                        dataLength={total}
                        next={fetchContacts}
                        hasMore={hasMore}
                        loader={<h3> Loading...</h3>}
                        useWindow={false}
                        height={300}
                        endMessage={<h4>Nothing more to show</h4>}>
                        {contacts.map((item, index) => (
                            <div key={index} onClick={() => showDetails(index)}>
                                id: {item.id}, phone_number: {item.phone_number}
                            </div>
                        ))}
                    </InfiniteScroll>
                </Modal.Body>
            </Modal>

            <Modal show={showDetail} onHide={() => setShowDetail(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detail}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}