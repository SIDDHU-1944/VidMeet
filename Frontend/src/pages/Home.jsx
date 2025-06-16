import NavBarHome from "../components/navbar/NavBarHome.jsx";
import "../App.css"
import withAuth from "../utils/withAuth.jsx";
import HomeMain from "../components/Home/HomeMain.jsx";

function Home(){
    return(

        <div className="HomePageContainer">
            <NavBarHome/>
            <HomeMain/>
        </div>
    )
}

export default withAuth(Home);
