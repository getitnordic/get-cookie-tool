import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

type DomainRule = {
  regex: RegExp,
  numCookies: number,
  cookiePolicy: string,
  privacyPolicy?: string,
};

const getDomainRules = (): DomainRule[] => {
  const filePath = path.join(process.cwd(), 'public/assets', 'data.txt');
  const data = fs.readFileSync(filePath, 'utf-8');
  const rules = data.split('\n').filter((line) => line && !line.startsWith('//'));

  return rules.map((rule) => {
    const [domain, ...subdomains] = rule.trim().split('.').reverse();
    const regex = new RegExp(`^(.*\\.|)${subdomains.join('\\.')}.${domain}$`);
    return { regex, numCookies: 0, cookiePolicy: '' };
  });
};

const updateDomainRules = (
  domainRules: DomainRule[],
  domain: string,
  cookies: puppeteer.Cookie[],
  cookiePolicy: string,
  privacyPolicy?: string
): void => {
  const domainRule = domainRules.find((rule) => rule.regex.test(domain));
  if (domainRule) {
    domainRule.numCookies += cookies.length;
    domainRule.cookiePolicy = cookiePolicy;
    domainRule.privacyPolicy = privacyPolicy;
  }
};

(async () => {
  const domainRules = getDomainRules();
  const urls = fs.readFileSync('websites.txt', 'utf-8').split('\n');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i].trim();
    if (!url) continue;

    await page.goto(url, { waitUntil: 'networkidle2' });
    const cookies = await page.cookies();
    const cookiePolicy = await page.evaluate(() => document.cookiePolicy);
    const privacyPolicy = await page.evaluate(() => document.privacyPolicy);
    console.log(
      `${url} has ${cookies.length} cookies and uses ${cookiePolicy} cookie policy ${privacyPolicy} `
    );
    updateDomainRules(domainRules, new URL(url).hostname, cookies, cookiePolicy, privacyPolicy);
  }

  await browser.close();
  console.log('Domain rules with cookie information:');
  console.log(domainRules);
})();
