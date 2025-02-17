import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

function Layout({ children }) {
    return (
        <>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;