function Navbar(){
    return(
       <ul className="nav-items">
        <li>For you</li>
        <li>Trending</li>
        <li>News</li>
        <li>Sports</li>
        <li>Entertainment</li>
        <span>
        <button className="searchbtn"><i className="fas fa-search"></i></button>
        <input placeholder="search twitter" className="searchbar"/>
        </span>
        </ul>
    );
}

export default Navbar;
