import React, { useState, useEffect } from 'react';
import styles from '/styles/CompareCookies.module.scss';
import { Domain } from '../api/interfaces/Domain';
import Link from 'next/link';

export const CompareCookie = () => {
/* My own url */
const [inputValueUrl, setInputValueUrl] = useState('');
const [inputValueUrlCheck, setInputValueUrlCheck] = useState('');

/* domain */
const [inputValueDomain, setInputValueDomain] = useState("");
const [matchingDomain, setMatchingDomain] = useState('');

/*path*/
const [inputValuePath, setInputValuePath] = useState('');


/* checkboxes and dropdown */
const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
const [selectSameSite, setSelectSameSite] = useState<string>('');
const [checkHttpOnly, setCheckHttpOnly] = useState('');
const [checkSecure, setCheckSecure] = useState('');

/* unclear */
const [inputValue, setInputValue] = useState('');
  
  




  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedSelectedCheckboxes = selectedCheckboxes.includes(value)
      ? selectedCheckboxes.filter((checkbox) => checkbox !== value)
      : [...selectedCheckboxes, value];
    setSelectedCheckboxes(updatedSelectedCheckboxes);
    if (value === 'HttpOnly') {
      if (checked) {
        setCheckHttpOnly("true");
      } else {
        setCheckHttpOnly("false");
      }
    }
  
    if (value === 'Secure') {
      if (checked) {
        setCheckSecure("true");
      } else {
        setCheckSecure("false");
      }
    }
  };

  const sameSiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSameSite(event.target.value);
  };

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValuePath(event.target.value);
  };

    const handleMyUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    checkInputForHttp(value);
  };

  const checkInputForHttp = (value: string | string[]) => {

    if (selectSameSite === "none"){
      if (checkHttpOnly === "true"){
        console.log("HTTPONLY")
      }
      else if (checkHttpOnly === "false"){
        console.log("HTTPONLY FALSE")
      }
    }
    else if (selectSameSite.includes('lax')){

    }
    else if (selectSameSite.includes('strict')){

    }
    if (value.includes('https')) {
      console.log('The input includes "https".');
      if (selectSameSite.includes('lax')){
        console.log("hi");
      }
    } else if (value.includes('http')) {
      console.log('The input includes "http".');
      // Perform additional actions if the input includes "http"
    } else {
      console.log('The input does not include "http" or "https".');
      // Perform alternative actions if the input does not include "http" or "https"
    }
  };




  /* Domain fetch */
  useEffect(() => {
    const getSitesFromDatabase = async () => {
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
        const { data } = await response.json();
        sessionStorage.setItem('domains', JSON.stringify(data));
      } catch (err) {
        console.log("error in mongofetch eventid", err);
      }
    };
    getSitesFromDatabase();
  }, []);
  /* Domain check */
  const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim().toLowerCase();
    const storedDomains: Domain[] = JSON.parse(sessionStorage.getItem('domains') || '[]');
    if (Array.isArray(storedDomains)) {
      const matchingSite = storedDomains.find(site => {
        const siteDomain = site.domains;
        if (siteDomain === input || siteDomain === input) {
          return true;
        }
        return false;
      });
      if (matchingSite) {
        console.log('Input value matches website:', matchingSite.domains);
        setMatchingDomain(matchingSite.domains);
      } else {
        console.log('Input value does not match any website');
        setMatchingDomain('');
      }
    } else {
      console.log('Error in stored domains');
    }  
    setInputValueDomain(input);
  };

  return (
    <div className={styles.wholeContainer}>
        <div className={styles.useAndCookie}>
          <div className={styles.compareText}>
            <div className={styles.usageIndex}>
              <h2>How it works</h2>
              <p>This website gives you an easy way to check interactions between your URL and domains, using cookie attributes.</p>

            </div>
            <div className={styles.howToUse}>
              <h2>How to Use</h2>
              <p>
                Enter the domain and subdomains (if there is any) you want to check, e.g. "top.example.com".
                <br></br>
                Add any relevant subdirectories (paths), e.g. "/blog".
                <br></br>
                Choose attributes that match your website, e.g. "httpOnly".
                <br></br>
                Then input your full URL to compare. e.g. "https://comparewebsite.com".
              </p>

            </div>

          </div>
          <div className={styles.cookiePic}>
            <img src="https://www.transparentpng.com/thumb/cookie/crystal-project-cookie-png-24.png" alt="crystal project cookie png @transparentpng.com"></img>
          </div>
        </div>

        <h5 className={styles.attributesTitle}> Attributes:</h5>
        <div className={styles.inputSiteAndPath}>
          <div className={styles.domainAndPath}>
          <div >
              <input type="text" id="domain" name="domain" value={inputValueDomain} onChange={handleDomainChange} placeholder='Domain'></input>
              </div>
              <div>
                <input type="text" id="path"  onChange={handlePathChange} placeholder="Path" />
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
              <div className={styles.checkBox1} >    
              <input className={styles.checkBoxPress} type="checkbox" value="HttpOnly" onChange={handleCheckboxChange} />
                <p className={styles.checkBoxText1}>HttpOnly</p>
              </div>
              
              <div className={styles.checkBox2}>
              <input className={styles.checkBoxPress} type="checkbox" value="Secure" onChange={handleCheckboxChange} />
                <p className={styles.checkBoxText2}>Secure</p>
              </div>
            </div>
          </div>

        </div>
        <div className={styles.myUrl}>
            <input type="text" id="myUrl" name="myUrl" placeholder='My Url' value={inputValueUrl} onChange={handleMyUrlChange}></input>
          </div>


          <div className={styles.wholeCookie}>

            <div className={styles.result}>
              <h5 className={styles.resultTitle}> Result:</h5>
              <div className={styles.textResult}>
              <div className={styles.publicListResult}>
                  {matchingDomain !== '' && <p><strong>Domain:</strong> The <strong>{matchingDomain}</strong> domain exists on <a  href="https://publicsuffix.org/list/public_suffix_list.dat "  ><strong>Public suffix list</strong></a> meaning that it won't be able to interact with other domains. Read more about this <a href="https://publicsuffix.org/learn/ "><strong>here.</strong></a></p>}
                  {matchingDomain === '' && <p></p>}
                </div>
                <div className={styles.myUrlResult}>
                  {inputValueUrl !== '' && <p><strong>Url:</strong> {inputValueUrlCheck}  {inputValueUrl} inputvalueUrl</p>}
                  {inputValueUrlCheck !== '' && <p><strong>Url:</strong> {inputValueUrlCheck}  {inputValueUrl} inputvalueUrlCheck</p>}
                  {inputValueUrl === '' && <p>Empty</p>}
                  {inputValueUrlCheck === '' && <p>Empty Check </p>}
                </div>
                <div className={styles.pathResult}>
                  {inputValue === '' && <p> <strong>Path:</strong> If a cookie does not have a "Path" attribute set, it is generally available to the entire domain that set the cookie.</p>}
                  {inputValue !== '' && <p> <strong>Path:</strong> "Path" attribute is set to {inputValue}, which means that the cookie will only be sent to the server with requests that are made to the  {inputValue} directory.</p>}
                </div>
                <div className={styles.sameSiteResult}>
                  {selectSameSite === 'choose' && <p>
                  </p>}
                  {selectSameSite === 'lax' && <p>
                    <strong>Samesite:</strong> This value is similar to Strict, but with a few exceptions. Lax allows some cross-site requests to include the cookie, but only if they are "safe" requests, such as clicking a link or loading an image.
                    <strong> You won't be able to do POST requests </strong>
                  </p>}
                  {selectSameSite === 'none' && <p>
                    <strong>Samesite:</strong> This is the default behavior for cookies, and it means that the cookie can be sent with both same-site and cross-site requests.
                    <strong>You will be able to do requests.</strong>
                  </p>}
                  {selectSameSite === 'strict' && <p>
                    <strong>Samesite:</strong> This value instructs the browser to only send the cookie with same-site requests. Cross-site requests will not include the cookie.
                    <mark><strong> You won't be able to do any request IF you're not doing same-site requests.</strong></mark>
                  </p>}
                </div>
              </div>
              <div className={styles.checkBoxResult}>
                {selectedCheckboxes.map((value) => (
                  <p key={value}>
                    {value === 'Secure' && <p><strong>Secure:</strong> If the cookie is secure it will only be allowed to be sent over secured connections (HTTPS).</p>}
                    {value === 'HttpOnly' && <p><strong>HttpOnly:</strong> Cookie can only be accessed through HTTP/S requests and not through client-side scripts. It is only needed for one website to have HTTPOnly. </p>}
                  </p>
                ))}
              </div>

            </div>
          </div>
        </div>
        


    );
  };


