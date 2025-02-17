import Navbar from './Navbar';
import BrandHeader from './BrandHeader';

function Layout({ children }) {
    return (
        <div>
            <BrandHeader />
            <Navbar />
            {children}
        </div>
    )
}

export default Layout;