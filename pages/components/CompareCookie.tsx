import React, { useState, useEffect } from 'react';
import styles from "/styles/CompareCookies.module.css"

export const CompareCookie = () => {
  
  
  
  const [selectSameSite, setSelectSameSite] = useState('');
  

  const sameSiteChange = (event) => {
    setSelectSameSite(event.target.value);
  }

  

  return (
    <div className={styles.wholeContainer}>
    <div className={styles.howToUse}> 
    <h2>How to Use</h2>
    <p> Input a website with or without "http/https" as prefix. You can also include prefix example: ".com". Then input a path for example /documents. </p>
    <p> Then input a path for example /documents. </p>
    <p> Input your website that which you want to compare.</p>
    </div>

    <div className={styles.inputForm}> 
        
        <form> 
        <div className={styles.inputSiteAndPath}>
        <label htmlFor="domain">Domain</label>
        <input type="text" id="domain" name="domain"></input> 
        <br></br>
        <label htmlFor="path">Path</label>
        <input type="text" id="path" name="path"></input>
        <br></br>
        
        <label htmlFor="samesite">SameSite:</label>
        <select id="samesite" value={selectSameSite} onChange={sameSiteChange}>
        <option value="none">None</option>
        <option value="lax">Lax</option>
        <option value="strict">Strict</option>
        </select>
        </div>

        <div className={styles.myUrl}>
        <label htmlFor="myUrl">My Url:</label>
        <input type="text" id="myUrl" name="myUrl"></input>
        </div>
        <button type="submit">Show</button>
        <div className={styles.result}> 
        <label htmlFor="result">Result:</label>
        <div className={styles.textResult}>
              <div className={styles.sameSiteResult}>
                {selectSameSite === 'none' && <p>This is the default behavior for cookies, and it means that the cookie can be sent with both same-site and cross-site requests.</p>}
                {selectSameSite === 'lax' && <p>This value is similar to Strict, but with a few exceptions. Lax allows some cross-site requests to include the cookie, but only if they are "safe" requests, such as clicking a link or loading an image. POST requests, for example, would not include the cookie. </p>}
                {selectSameSite === 'strict' && <p>This value instructs the browser to only send the cookie with same-site requests. Cross-site requests will not include the cookie.</p>}

              </div>

        </div>
        </div>
        </form>
    </div>
</div>
   
    
  );
};


