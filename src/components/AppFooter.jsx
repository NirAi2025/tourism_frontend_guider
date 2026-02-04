import React from 'react'
import { Col, Container,  Row } from 'react-bootstrap'
import { AnimatePresence, motion } from "motion/react";
import email_icon from "../assets/email_icon.png";
import logo from "../assets/YourGuide.png";
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const AppFooter = () => {
  return (
    <div className='app-footer'>
      <Container>
          <div className='footer-subscribe'>
              <h3>Subscribe to <br></br>Our Newsletter</h3>
              <Row>
                <Col lg={3}>
                  <p>Get weekly update about new tours on your email, no spam guaranteed we promise</p>
                </Col>
                 <Col lg={9}>
                  <div className='subscribe-form'>
                    <span><img src={email_icon}/></span>
                    <input type='email' className='form-control' placeholder='Enter your email' />
                     <motion.button whileHover={{ scale: 1.1 }}>
                    SUBSCRIBE
                  </motion.button>
                  
                  </div>
                </Col>
              </Row>
          </div>
          <div className='fotter-menu'>
            <Row>

          
            <Col lg={6}>
                <NavLink>
                  <img src={logo}/>
                </NavLink>
                <ul className='footer-social'>
                  <li>
                    <a href='#'><FaFacebook /></a>
                  </li>
                  <li>
                    <a href='#'><FaTwitter /></a>
                  </li>
                   <li>
                    <a href='#'><FaInstagram /></a>
                  </li>
                </ul>
            </Col>
             <Col lg={6}>
             <Row>
                <Col lg={4}>
                      <div className='footer-widget'>
                <h4>Resources</h4>
                <ul>
                  <li>
                    <NavLink>Download </NavLink>
                  </li>
                  <li>
                    <NavLink>Help Center </NavLink>
                  </li>
                  <li>
                    <NavLink>Guide Book </NavLink>
                  </li>
                  <li>
                    <NavLink>App Directory </NavLink>
                  </li>
                </ul>
              </div>
                </Col>
                <Col lg={4}>
                      <div className='footer-widget'>
                <h4>Resources</h4>
                <ul>
                  <li>
                    <NavLink>Download </NavLink>
                  </li>
                  <li>
                    <NavLink>Help Center </NavLink>
                  </li>
                  <li>
                    <NavLink>Guide Book </NavLink>
                  </li>
                  <li>
                    <NavLink>App Directory </NavLink>
                  </li>
                </ul>
              </div>
                </Col>
                <Col lg={4}>
                      <div className='footer-widget'>
                <h4>Resources</h4>
                <ul>
                  <li>
                    <NavLink>Download </NavLink>
                  </li>
                  <li>
                    <NavLink>Help Center </NavLink>
                  </li>
                  <li>
                    <NavLink>Guide Book </NavLink>
                  </li>
                  <li>
                    <NavLink>App Directory </NavLink>
                  </li>
                </ul>
              </div>
                </Col>
             </Row>
              
            </Col>
              </Row>
          </div>
          <div className='copyright'>
            &copy;  {new Date().getFullYear()} all rights reserved.
          </div>
      </Container>
    </div>
  )
}

export default AppFooter