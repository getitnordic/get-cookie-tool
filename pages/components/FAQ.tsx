import styles from '@/styles/FAQ.module.scss';

const FAQ = () => {
  return (
    <div className={styles.faqSection}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

      <div className={styles.faq}>
        <h3>What is this website?</h3>
        <p>
          Helper to just easily check the interactions between website and their cookie settings{' '}
        </p>
      </div>

      <div className={styles.faq}>
        <h3>Who are we?</h3>
        <p>
          We're three students that did our internship together at GetIt Nordic and used this
          website as a part of our master thesis. You can find our socials at the bottom of the
          page.
        </p>
      </div>

      <div className={styles.faq}>
        <h3>Who maintains the website?</h3>
        <p>
          There isn't really much to maintain but we have a github where we keep track of things.
        </p>
      </div>

      <div className={styles.faq}>
        <h3>Can I use this website for my own work?</h3>
        <p>Sure, feel free to credit us though.</p>
      </div>

      <div className={styles.faq}>
        <h3>How do I report an issue or bug?</h3>
        <p>Easiest way is to do it through our github at the bottom of the page.</p>
      </div>

      <div className={styles.faq}>
        <h3>Any other questions?</h3>
        <p>Feel free to write to us through our socials.</p>
      </div>
    </div>
  );
};

export default FAQ;
