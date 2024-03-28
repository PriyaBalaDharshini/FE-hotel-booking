import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperty from '../../components/featuredProperty/FeaturedProperty'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

function Home() {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">
                    Browse Property By Type
                </h1>
                <PropertyList />
                <h1 className="homeTitle">
                    Homes Guestes Love
                </h1>
                <FeaturedProperty />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home