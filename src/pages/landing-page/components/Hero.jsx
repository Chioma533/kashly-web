import React from "react";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-text-box">
        <h1>
          Take Control of Your Finances <br/> with <span>Kashly</span>
        </h1>
        <p className="text">
          The all-in-one FinTech platform designed for students and young <br />
          Africans. Your financial coach, social saving platform, and crypto{" "}
          <br />
          vault - all in one place.
        </p>

        <div className="btn-holders">
          <button className="get-started">Get Started Free </button>
          <button className="sign-in">Sign In</button>
        </div>

        <div className="hero-last-text">
          <div className="secure">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l7 4v5c0 5-3.5 9.4-7 11-3.5-1.6-7-6-7-11V6l7-4z" />
              <circle cx="12" cy="13" r="1.5" />
              <path d="M12 14v2" />
            </svg>
            <p>Bank-level security</p>
          </div>
          <div className="support">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 0 20" />
              <path d="M12 2a15.3 15.3 0 0 0 0 20" />
            </svg>
            <p>Local language support</p>
          </div>
        </div>
      </div>
      <div className="hero-img">
        <div className="kashly-phone">
          <div className="phone-border">
            <div className="phone-header">
              <div className="dynamic"></div>
              <div className="header-logo">
                <svg
                  className="logo-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                </svg>
                <div className="logo-text">Kashly</div>
              </div>
            </div>

            <div className="kashly-balance">
              <h5>Your Balance</h5>
              <p>$25,430</p>
            </div>

            <div className="card-box">
              <div className="savings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-graph-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
                  />
                </svg>

                <p>Savings</p>
              </div>
              <div className="profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-vcard-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                </svg>

                <p>Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
