import React from 'react'
import Layout from '../layout/Layout'

import AboutSection from "../components/common/HomeSection/AboutSection";
import CounterSection from "../components/common/HomeSection/CounterSection";
import MapSection from "../components/common/HomeSection/MapSection";
import OurPartners from "../components/common/HomeSection/OurPartner";
import ProductCatalogue from "../components/common/HomeSection/ProductCatalogue ";
import ShopByCategory from "../components/common/HomeSection/ShopByCategory";
import HomeSlider from "../components/common/HomeSlider/HomePageSlider";


const Home = () => {
    return (
        <>
            <HomeSlider />
            {/* <HomeContact /> */}
            <AboutSection />
            <CounterSection />
            <ShopByCategory />
            <ProductCatalogue />
            <OurPartners />
            <MapSection />
        </>
    )
}

export default Home