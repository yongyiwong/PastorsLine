import Spinner from 'react-bootstrap/Spinner';
// eslint-disable-next-line
export default function () {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}