import styles from '@/styles/FAQ.module.scss';

const FAQ = () => {
  return (
    <div className={styles.wholeFaq}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqSection}>

      <div className={styles.faq1}>
        <h3 className={styles.faqMiniTitle1}>What is this website?</h3>
        <p className={styles.faqMiniText}>
          A tool to easily understand what the cookie attributes mean and how they work if you interact with other websites.
        </p>
      </div>

      <div className={styles.faq2}>
        <h3 className={styles.faqMiniTitle2}>Who are we?</h3>
        <p className={styles.faqMiniText}>
          We're three students that did our internship together at GetIt Nordic and made this
          website as a part of our master thesis. You can find our socials at the bottom of the
          page.
        </p>
      </div>

      <div className={styles.faq3}>
        <h3 className={styles.faqMiniTitle3}>Who maintains the website?</h3>
        <p className={styles.faqMiniText}>
          There isn't really much to maintain but we have a github where we keep track of things.
        </p>
      </div>

      <div className={styles.faq4}>
        <h3 className={styles.faqMiniTitle4}>Can I use this website for my own work?</h3>
        <p className={styles.faqMiniText}>Sure, feel free to credit us though.</p>
      </div>

      <div className={styles.faq5}>
        <h3 className={styles.faqMiniTitle5}>How do I report an issue or bug?</h3>
        <p className={styles.faqMiniText}>Easiest way is to do it through our github at the bottom of the page.</p>
      </div>


      <div className={styles.faq6}>
        <h3 className={styles.faqMiniTitle6}>Any other questions?</h3>
        <p className={styles.faqMiniText}>Feel free to write to us through our socials.</p>
      </div>
    </div>
    </div>
  );
};

export default FAQ;
