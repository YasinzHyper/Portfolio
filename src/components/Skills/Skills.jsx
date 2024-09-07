function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="topic-header">
          <h1 class="text-4xl font-bold p-4">Skills</h1>
          <br />
        </div>
        <div className="skill-grid">
          <div className="skill-card">
            <img src="/android-logo.png" alt="img" />
            <p> Android Development</p>
          </div>
          <div className="skill-card">
            <img src="/flutter-logo.png" alt="img" />
            <p>Flutter/Dart</p>
          </div>
          <div className="skill-card">
            <img src="/JavaScript-logo.png" alt="img" />
            <p>JavaScript</p>
          </div>
          <div className="skill-card">
            <img src="/react-logo.png" alt="img" />
            <p> React.js</p>
          </div>
          <div className="skill-card">
            <img src="/firebase-logo.png    " alt="img" />
            <p> FireBase </p>
          </div>
          <div className="skill-card">
            <img src="/css-logo.png" alt="img" />
            <p> HTML/CSS</p>
          </div>
          <div className="skill-card">
            <img src="/nodejs-logo.png" alt="img" />
            <p> Node.js </p>
          </div>
          <div className="skill-card">
            <img src="/postgresql-logo.png" alt="img" />
            <p>PostgreSQL</p>
          </div>
          <div className="skill-card">
            <img src="/express-logo.png" alt="img" />
            <p>Express.js</p>
          </div>
        </div>
        <br /> <br />
        <div className="center">
          <div className="center skill-card">
            <img src="/question-mark-logo.png" alt="img" />
            <p> Always ready to learn...</p>
          </div>
        </div>
        <br />
        <div className="center" style={{ textAlign: "center" }}>
          I'm always open to opportunities for learning and personal growth and
          development.
        </div>
      </div>
    </section>
  );
}

export default Skills;
