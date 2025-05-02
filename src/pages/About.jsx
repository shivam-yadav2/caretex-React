import React from 'react'
import Layout from '../layout/Layout'
import Navbar from '../components/common/Navbar/Navbar';
import PageHeader from '../components/common/PageHeader/PageHeader';
import AboutSection from '../components/common/HomeSection/AboutSection';
import CounterSection from '../components/common/HomeSection/CounterSection';
import OurPartners from '../components/common/HomeSection/OurPartner';
import MapSection from '../components/common/HomeSection/MapSection';
import Footer from '../components/common/Footer/Footer';
import AboutPage from '../components/common/AboutTab/AboutTab';

const About = () => {
    return (
        <Layout>
            <PageHeader
                title={"About us"}
                backgroundImage={"/assets/slider4.jpg"}
                breadcrumbs={[]}
            />

            {/* <AboutSection /> */}
            <AboutPage />

            {/* <VerticalTabsSection/> */}
            {/* <CounterSection/> */}
            {/* <OurPartners/> */}
            <MapSection />


        </Layout>
    )
}

export default About