import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import bannerImg  from "../../assets/bannerImg.png"
import { LuLayoutDashboard } from 'react-icons/lu'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import cate1 from "../../assets/paris.png";



const Home = () => {
  return (
      <Container>
          <div className='home-banner'>
              <Row>
                <Col lg={6}>
                    <h1>Share authentic local experiences with travelers</h1>
                    <p>Give your tours global visibility, earn flexible income, and connect with explorers seeking real experiences in your city.</p>
                    <NavLink to="/sign-up" className="getstartedBttn">Get Started</NavLink>
                </Col>
                  <Col lg={6}>
                      <Row>
                    <Col lg={6}>
                        <div className='home-banner-right-image'>
                            <img src={bannerImg} alt="bannerImg" className='w-100' />
                        </div>
                       <div className='home-banner-right-image mt-4 '>
                            <img src={bannerImg} alt="bannerImg" className='w-100' />
                        </div>
                    </Col>
                  <Col lg={6}>
                     <div className='home-banner-right-image right-image'>
                            <img src={bannerImg} alt="bannerImg" className='w-100'  />
                        </div>
                </Col>
              </Row>
                </Col>
              </Row>
          </div>
          <div className='Tour-and-support'>
                  <h2 className='TitleHeading'>Tours & Support built for guides</h2>
                  <Row>
                    <Col lg={3}>
                        <div className='tours-card'>
                          <span><LuLayoutDashboard /></span>
                            <h3>Tour management dashboard</h3>
                            <p>Add tours, manage schedules, and track bookings easily — all in one place.</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='tours-card'>
                          <span><RiSecurePaymentFill /></span>
                            <h3>Secure payments</h3>
                            <p>Fast, reliable payouts with automated payment processing.</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='tours-card'>
                          <span><MdOutlineTipsAndUpdates /></span>
                            <h3>Insights & growth tips</h3>
                            <p>Analytics & expert tips to help you grow, optimize pricing, and reach more travelers.</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='tours-card'>
                          <span><BiSupport /></span>
                            <h3>Dedicated support</h3>
                            <p>Real people to help you succeed — from onboarding to daily support.</p>
                        </div>
                    </Col>
                  </Row>
          </div>

      <div className='inspire-travels'>
        <h2>Inspire Travelers With Real Local Experiences</h2>
        <p>Share hidden gems, culture, and activities that make your city special — become a trusted guide.</p>
        <NavLink to="/sign-up">Get Started</NavLink>
      </div>
      <div className='locatio-we-are'>
            <h2 className='TitleHeading'>Locations we are In</h2>
              <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={4}      
      navigation
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <SwiperSlide key={item}>
            <div className='world-card'>
                <img src={cate1} className='w-100'/>
            </div>
         
        </SwiperSlide>
      ))}
    </Swiper>
      </div>
      </Container>
      
    
  )
}

export default Home