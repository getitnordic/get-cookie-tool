import saveSitesToDatabase from "../pages/api/getData"
import { NextApiRequest, NextApiResponse } from "next";

export async function getStaticProps() {
  // Run the saveSitesToDatabase function immediately when the page loads,
  // and then every day at 00:01 local time in Sweden
  await saveSitesToDatabase({} as NextApiRequest, {} as NextApiResponse<any>);

  // Return an empty object to indicate that there are no props to pass to the page
  return { props: {} };
}

export default function CronPage() {
  return (
    <div>
      {/* <p>Fetch job running...</p> */}
    </div>
  );
}
