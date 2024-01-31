import { defer } from '@vercel/remix';
import type { LoaderArgs } from '@vercel/remix';
import { Await, useLoaderData } from '@remix-run/react';
import styles from "./index.module.css"
import { parseVercelId } from '~/parse-vercel-id';

export const config = { runtime: 'edge' };

let isCold = true;
let initialDate = Date.now();

export async function loader({ request }: LoaderArgs) {
  const wasCold = isCold;
  isCold = false;

  const parsedId = parseVercelId(request.headers.get("x-vercel-id"));

  return defer({
    isCold: wasCold,
    proxyRegion: sleep(parsedId.proxyRegion, 1000),
    computeRegion: sleep(parsedId.computeRegion, 1500),
    date: new Date().toISOString(),
  });
}

function sleep(val: any, ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export function headers() {
  return {
    'x-edge-age': Date.now() - initialDate,
  };
}

export default function App() {
  const { proxyRegion, computeRegion, isCold, date } = useLoaderData<typeof loader>();
  return (
    <>
      <main>
      <div className="bg-[#F5EEE6] ">
    <div className={styles.main}>
      <h1 className={styles.heading}>MASTER ANY SUBJECT. <br/> <em>CONQUER ANY TEST.</em> <em> YOUR </em> ACADEMIC SUPERPOWER LIES HERE.
      </h1>
     
    

      
    </div>
    </div>



        </main>
    </>
  );
}
