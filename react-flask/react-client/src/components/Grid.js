import Layout from './Layout';
import './Grid.css'

function Grid({ children }) {
    return (
        <Layout>
            <div className="grid-container">
                {children}
            </div>
        </Layout>
    )
}

export default Grid;