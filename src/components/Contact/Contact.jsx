function Contact() {
  return (
    <section id="contact">
      <div className="center contact-container">
        <div className="contact-card">
          <div className="center">
            <b>Get in touch</b>
            <p>
              <br />
              Feel free to get in touch.
              <br />
              Have a look at some of my projects on my GitHub profile.
              <br />
              Or simply drop a message on my LinkedIn.
            </p>
          </div>
          <div className="center">
            <div>
              <a>
                <i className="fa-solid fa-envelope"></i>
                &nbsp;zulfiyasser@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/mohammed-yasin-zuhayr-249158157/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
                &nbsp;LinkedIn
              </a>
            </div>
            <div>
              <a href="https://github.com/YasinzHyper" target="_blank">
                <i className="fa-brands fa-github"></i>
                &nbsp;GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
