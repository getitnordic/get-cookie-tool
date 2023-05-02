import styles from '@/styles/CookiesInfo.module.scss';

const CookiesInfo = () => {
  return (
    <div className={styles.cookieInfo}>
      <div className={styles.cookieSection}>
        <h3>What is a cookie?</h3>
        <p>
          A cookie is a small text file that is stored on a user's device (such as a computer or
          smartphone) when they visit a website. Cookies contain information about the user's
          browsing behavior on the website, such as what pages they visited, what actions they took,
          and how long they spent on each page. This information can be used by the website to
          personalize the user's experience on subsequent visits, to remember their login
          credentials, or to provide targeted advertising. Cookies can also be used by third-party
          advertisers and analytics services to track user behavior across multiple websites.
        </p>
      </div>

      <div className={styles.cookieSection}>
        <h3>Cookie history</h3>
        <p>
          Cookies were introduced in the early days of the web in the 1990s as a way to store small
          amounts of data on a user's device. They were originally used to keep track of user
          preferences and session information. As the internet grew and e-commerce became more
          prevalent, cookies became more sophisticated and are now used for a wide variety of
          purposes, including tracking user behavior across multiple websites, personalizing content
          and advertising, and improving website performance.
        </p>
      </div>

      <div className={styles.cookieSection}>
        <h3>GDPR</h3>
        <p>
          The General Data Protection Regulation (GDPR) regulates the use of personal data,
          including data collected through cookies. Under the GDPR, websites must obtain users'
          explicit consent before setting non-essential cookies, and must provide clear information
          about the purpose and duration of cookies. Consent must be freely given, specific,
          informed, and unambiguous. Additionally, cookies must be used in a way that respects
          users' privacy and data protection rights, and should not be used to track users across
          multiple websites without their consent.
        </p>
      </div>
    </div>
  );
};

export default CookiesInfo;
