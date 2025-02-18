import Layout from './Layout';
<<<<<<< HEAD
import './Grid.css';

function Grid({ apiRoute }) {
    const [cookieList, setCookieList] = useState([]);

    useEffect(() => {
        fetch(apiRoute).then(res => res.json()).then(data => {
            setCookieList(data);
        });
    });
    console.log(cookieList);

    return cookieList != [] ? (
        <Layout>
            <h1>Loading...</h1>
        </Layout>
    ) : (
        <Layout>
            <div className="grid-container">
                <form>
                    <input name="id" type="hidden" value={cookieList[0].id} />
                    <button className="grid-item" type="submit">
                        <img src={cookieList[0].img} alt={"Image of " + cookieList[0].name} className="item-img" />
                        <div className="item-name">{cookieList[0].name}</div>
                        <div className="item-value">{cookieList[0].price}</div>
                    </button>
                </form>
                {/* {% for cookie in cookies %}
                    <form action="/product" method="post">
                        <input name="id" type="hidden" value="{{ cookie.id }}">
                        <button class="grid-item" type="submit">
                            <img src="{{ cookie.img }}" alt="Image of {{ cookie.name }}" class="item-img">
                            <div class="item-name">{{ cookie.name }}</div>
                            <div class="item-value">{{ cookie.price | usd }}</div>
                        </button>
                    </form>
                {% endfor %} */}
=======
import './Grid.css'

function Grid({ children }) {
    return (
        <Layout>
            <div className="grid-container">
                {children}
>>>>>>> parent of 89363f2 (remove product.js)
            </div>
        </Layout>
    )
}

export default Grid;