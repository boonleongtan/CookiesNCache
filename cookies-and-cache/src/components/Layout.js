import Header from './Header';
import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
        </div>
    )
}

export default Layout;