import { Link } from 'react-router-dom'
import '../styles/About.css'

function PageNotFound() {
    return (
        <div className='about'>
            <h2>Looks like you found your way to an empty page</h2>
            <h3>Here is the link back to the <Link to="/ciphers"><span>Ciphers</span></Link></h3>
        </div>
    )
}

export default PageNotFound
