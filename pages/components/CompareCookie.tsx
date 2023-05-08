import React, { useState, useEffect } from 'react';
import styles from '/styles/CompareCookies.module.scss';

export const CompareCookie = () => {
const [websitesMongo, setWebsitesMongo] = useState<string[]>([]);
const [inputValueDomain, setInputValueDomain] = useState("");
const [inputUrl, setInputUrl] = useState('');

const [inputValue, setInputValue] = useState('');
const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
const [selectSameSite, setSelectSameSite] = useState<string>('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedSelectedCheckboxes = selectedCheckboxes.includes(value)
      ? selectedCheckboxes.filter((checkbox) => checkbox !== value)
      : [...selectedCheckboxes, value];
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const sameSiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSameSite(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const getWebsites = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/getData",
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setWebsitesMongo(data);
      } catch (err) {
        console.log("error i mongofetch eventid", err);
      }
    };
    getWebsites() 
  }, []);
  console.log(websitesMongo)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueDomain(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const matchingSite = websitesMongo.find(site => site.website === inputValueDomain);
    if (matchingSite) {
      console.log('Input value matches website:', matchingSite.website);
    } else {
      console.log('Input value does not match any website');
    }
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.usageIndex}>
        <h2>How it works</h2>
        <p>This website gives you an easy way to check interactions between your URL and different domains, using cookie attributes.</p>

      </div>
      <div className={styles.howToUse}>
        <h2>How to Use</h2>
        <p>
           Enter the domain and TLD (if there is any) you want to check, e.g. "top.example.com". 
          <br></br>
          Add any relevant subdirectories (paths), e.g. "/blog".
          <br></br>
          Choose attributes that match your website, e.g. "httpOnly".
          <br></br>
          Then input your full URL to compare. e.g. "https://comparewebsite.com".
        </p>
      </div>

      <div className={styles.wholeCookie}>

        <form >
          <h3 className={styles.settingsTitle}>  </h3>
          <div className={styles.inputSiteAndPath}>
            <div className={styles.domainAndPath}>
              <div >
                <input type="text" id="domain" name="domain" onChange={handleChange} placeholder='Domain'></input>
              </div>
              <div>
                <input type="text" id="path" value={inputValue} onChange={handleInputChange} placeholder="Path" />
              </div>
            </div>
            <div className={styles.selectAndCheck}>
              <h5 className={styles.attributesTitle}> Attributes:</h5>
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


