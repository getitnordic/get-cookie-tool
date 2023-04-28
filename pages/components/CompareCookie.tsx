import React, { useState, useEffect } from 'react';
import styles from "/styles/CompareCookies.module.css"

export const CompareCookie = () => {
  

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

        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label htmlFor="vehicle1"> HttpOnly</label>
        <br></br>
        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></input>
        <label htmlFor="vehicle2"> Secure</label>
        <br></br>
        <label htmlFor="samesite">SameSite:</label>
        <select id="samesite" name="samesite">
        <option value="none">None</option>
        <option value="lax">Lax</option>
        <option value="pax">Pax</option>
        <option value="stict">Strict</option>
        </select>
        </div>

        <div className={styles.myUrl}>
        <label htmlFor="myUrl">My Url:</label>
        <input type="text" id="myUrl" name="myUrl"></input>
        </div>

        <div className={styles.result}> 
        <label htmlFor="result">Result:</label>
        <textarea className={styles.resultInput} id="result" name="result"></textarea>
        </div>
        </form>
    </div>
</div>
   
    
  );
};


