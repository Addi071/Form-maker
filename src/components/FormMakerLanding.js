import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import './FormMakerLanding.css';

const FormMakerLanding = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    testimonials: false,
    cta: false
  });
   const navigate = useNavigate();

   const handleClick = () => {
    // Navigate to '/next-page' when clicked
    navigate('/login');
    
    // Optional: Pass state data
    // navigate('/next-page', { state: { id: 123 } });
  };

  // Simple scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      // Hero section (always visible)
      setIsVisible(prev => ({ ...prev, hero: true }));
      
      // Features section
      if (document.getElementById('features')?.offsetTop < scrollPosition - 100) {
        setIsVisible(prev => ({ ...prev, features: true }));
      }
      
      // Testimonials section
      if (document.getElementById('testimonials')?.offsetTop < scrollPosition - 100) {
        setIsVisible(prev => ({ ...prev, testimonials: true }));
      }
      
      // CTA section
      if (document.getElementById('cta')?.offsetTop < scrollPosition - 100) {
        setIsVisible(prev => ({ ...prev, cta: true }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Feature data
  const features = [
    {
      icon: '📝',
      title: 'Drag & Drop Builder',
      description: 'Easily create forms with our intuitive drag and drop interface'
    },
    {
      icon: '🎨',
      title: 'Custom Themes',
      description: 'Match your brand with customizable colors and styles'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Get insights from your form responses instantly'
    },
    {
      icon: '🤖',
      title: 'AI Form Assistant',
      description: 'Let AI suggest the best fields for your form'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Enterprise-grade security for all your data'
    },
    {
      icon: '🔄',
      title: '100+ Integrations',
      description: 'Connect with your favorite tools and services'
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      quote: "This form builder saved us hundreds of hours in development time. The interface is so intuitive!",
      name: "Sarah Johnson",
      position: "Marketing Director, TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "We've doubled our lead conversion rate since switching to this platform. Highly recommended!",
      name: "Michael Chen",
      position: "CEO, StartupXYZ",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The customer support is exceptional. They helped us customize exactly what we needed for our complex forms.",
      name: "Emma Rodriguez",
      position: "Product Manager, InnovateCo",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible.hero ? 'visible' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">Create Beautiful Forms in Minutes</h1>
          <p className="hero-subtitle">The easiest way to build, design, and share forms online</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleClick}>Get Started Free</button>
            {/* <button className="secondary-btn">See Demo</button> */}
          </div>
        </div>
        {/* <div className="hero-image">
          <img src="https://via.placeholder.com/600x400/87CEEB/FFFFFF?text=Form+Preview" alt="Form Maker Preview" />
        </div> */}
      </section>

      {/* Features Section */}
      <section id="features" className={`features-section ${isVisible.features ? 'visible' : ''}`}>
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to create stunning forms</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`testimonials-section ${isVisible.testimonials ? 'visible' : ''}`}>
        <div className="testimonials-container">
          <h2>Trusted by Thousands</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p>"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className={`cta-section ${isVisible.cta ? 'visible' : ''}`}>
        <div className="cta-content">
          <h2>Ready to Create Your First Form?</h2>
          <p>Join thousands of happy users today</p>
          <button className="primary-btn large-btn">Start Free Trial</button>
        </div>
      </section>
    </div>
  );
};

export default FormMakerLanding;