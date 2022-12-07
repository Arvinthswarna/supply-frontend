import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
export default function Home()
{
    return (
        <div className='Container'>
            <Navbar id='navbar'>
                <Container>
                    <Navbar.Brand id='navtitle' href="/">SUPPLY CHAIN MANAGEMENT</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/supplierlogin" id='navlink'>SUPPLIER</Nav.Link>
                        <Nav.Link href="/retailerlogin" id='navlink'>RETAILER</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div className='home-container'>
                
                <h1>Welcome to Supply Chain Management project</h1><br/>
                <h2>Team Memebers</h2>
                <br/>
                <h4>Kaustubh</h4>
                <h4>Jay</h4>
                <h4>Devendar</h4>
                <h4>Arvinth</h4>
                
                
            </div>
        </div>
    )
}