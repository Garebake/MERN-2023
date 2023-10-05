import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="flex flex-row p-2 bg-red-600">
                <Link className='mr-1 py-1 px-2 bg-yellow-400 rounded text-red-600 hover:bg-yellow-600' to="/">
                    <h1>Workout App</h1>
                </Link>
                <Link className='mr-1 py-1 px-2 bg-yellow-400 rounded text-red-600 hover:bg-yellow-600' to='/teams'>
                    <h1>Teams</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;