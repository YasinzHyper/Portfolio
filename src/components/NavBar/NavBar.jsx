export default function Navbar () {
    return (
        <header id="nav-bar">
            <ul>
                <i id="logo" className="fa-solid fa-m fa-lg"
                    style={{"color" : "#ffffff"}}></i>
            </ul>
            <li><a href="#intro-section">Home</a></li>
            <li><a href="#skills">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </header>
    );
}

// export default Navbar;