import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from '@/styles/Footer.module.scss';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.sectionLinks}>
          <div className={styles.personLinks}>
            <h3 className={styles.footerName}>Repos</h3>
            <Link href="https://github.com/getitnordic/get-cookie-tool">
              <FontAwesomeIcon icon={faGithub} style={{ fontSize: 30, color: 'grey' }} />
            </Link>
          </div>
          <div className={styles.personLinks}>
            <h3 className={styles.footerName}>Joar Warholm</h3>
            <Link href="https://github.com/joarwar">
              <FontAwesomeIcon icon={faGithub} style={{ fontSize: 20, color: 'black' }} />
            </Link>
            <Link href="https://www.linkedin.com/in/joargunnarwarholm/">
              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 20, color: 'lightblue' }} />
            </Link>
          </div>
          <div className={styles.personLinks}>
            <h3 className={styles.footerName}>Sam Faravahar</h3>
            <Link href="https://github.com/Samrad84">
              <FontAwesomeIcon icon={faGithub} style={{ fontSize: 20, color: 'black' }} />
            </Link>
            <Link href="https://www.linkedin.com/in/sam-faravahar/">
              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 20, color: 'lightblue' }} />
            </Link>
          </div>
          <div className={styles.personLinks}>
            <h3 className={styles.footerName}>Philip Rydqvist</h3>
            <Link href="https://github.com/PhilipRydqvist">
              <FontAwesomeIcon icon={faGithub} style={{ fontSize: 20, color: 'black' }} />
            </Link>
            <Link href="https://www.linkedin.com/in/philip-rydqvist/">
              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 20, color: 'lightblue' }} />
            </Link>
          </div>
        </div>
      </section>
      <section></section>
      <div className={styles.copyRight}>
        <p>&copy; 2023 Created by Joar, Sam & Philip</p>
      </div>
    </footer>
  );
};

export default Footer;
