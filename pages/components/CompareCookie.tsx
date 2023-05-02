import React, { useState, useEffect } from 'react';
import styles from "/styles/CompareCookies.module.css"

export const CompareCookie = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedSelectedCheckboxes = selectedCheckboxes.includes(value)
      ? selectedCheckboxes.filter((checkbox) => checkbox !== value)
      : [...selectedCheckboxes, value];
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const [selectSameSite, setSelectSameSite] = useState<string>('');
  const sameSiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSameSite(event.target.value);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.howToUse}>
        <h2>How to Use</h2>
        <p> Input a website with or without "http/https" as prefix. You can also include prefix example: ".com". Then input a path for example /documents. </p>
        <p> Then input a path for example /documents. </p>
        <p> Input your website that which you want to compare.</p>
      </div>

      <div className={styles.wholeCookie}>

        <form >
          <h3 className={styles.settingsTitle}> Cookie Settings</h3>
          <div className={styles.inputSiteAndPath}>
            <div>
              <div>
                <input type="text" id="domain" name="domain" placeholder='Domain'></input>
              </div>
              <div>
                <input type="text" id="path" value={inputValue} onChange={handleInputChange} placeholder="Path" />
              </div>
            </div>
            <div className={styles.selectAndCheck}>
              <select id="samesite" value={selectSameSite} onChange={sameSiteChange}>
                <option value="choose">--SameSite--</option>
                <option value="none">None</option>
                <option value="lax">Lax</option>
                <option value="strict">Strict</option>
              </select>
              <div className={styles.checkBox}>
                <label>
                  <input type="checkbox" value="HttpOnly" onChange={handleCheckboxChange} />
                  HttpOnly
                </label>
                <label>
                  <input type="checkbox" value="Secure" onChange={handleCheckboxChange} />
                  Secure
                </label>
              </div>
            </div>

          </div>
          <div className={styles.myUrl}>
            <input type="text" id="myUrl" name="myUrl" placeholder='My Url'></input>
          </div>
            
          <div className={styles.result}>
            <label htmlFor="result" ><strong>Result</strong>:</label>
            <div className={styles.textResult}>
              <div className={styles.pathResult}>
                {inputValue === '' && <p> <strong>PATH:</strong> If a cookie does not have a "Path" attribute set, it is generally available to the entire domain that set the cookie.</p>}
                {inputValue !== '' && <p> <strong>PATH:</strong> "Path" attribute is set to {inputValue}, which means that the cookie will only be sent to the server with requests that are made to the  {inputValue} directory.</p>}
              </div>
              <div className={styles.sameSiteResult}>
                {selectSameSite === 'choose' && <p>
                </p>}
                {selectSameSite === 'lax' && <p>
                <strong>Samesite:</strong> This value is similar to Strict, but with a few exceptions. Lax allows some cross-site requests to include the cookie, but only if they are "safe" requests, such as clicking a link or loading an image.
                <mark><strong>You won't be able to do POST requests </strong></mark>
                </p>}
                {selectSameSite === 'none' && <p>
                <strong>Samesite:</strong> This is the default behavior for cookies, and it means that the cookie can be sent with both same-site and cross-site requests.
                  <mark><strong>You will be able to do requests.</strong></mark>
                </p>}
                {selectSameSite === 'strict' && <p>
                <strong>Samesite:</strong> This value instructs the browser to only send the cookie with same-site requests. Cross-site requests will not include the cookie.
                  <mark><strong>You won't be able to do any request IF you're not doing same-site requests.</strong></mark>
                </p>}
              </div>
            </div>
            <div className={styles.checkBoxResult}>
              {selectedCheckboxes.map((value) => (
                <p key={value}>
                  {value === 'Secure' && <p><strong>Secure:</strong> If the cookie is secure it will only be allowed to be sent over secured connections (HTTPS).</p>}
                  {value === 'HttpOnly' &&  <p><strong>HttpOnly:</strong> Cookie can only be accessed through HTTP/S requests and not through client-side scripts. It is only needed for one website to have HTTPOnly. </p>}
                </p>
              ))}
            </div>

          </div>
        </form>
      </div>
    </div>


    );
  };


