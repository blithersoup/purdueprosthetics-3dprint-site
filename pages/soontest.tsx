import { get_all_managers, create_manager } from '../dbconfig/db_managers';
import { Member } from '../dbconfig/models'
import type { NextPage } from "next";
import { EffectCallback, useEffect, useState } from "react";

const Home: NextPage = () => {
  //in general, try to view external media with nextjs components
  //This is the dual login page, the header is reusable
  //As the pages folder stores all files in browser accessible routes,
  //put all reusable, non-page components in the components folder.
  //Header is a good starter for that if you have an idea for another, just copy that
  let resultList: Member[] = [];

  const [results, setResults] = useState(resultList);

  useEffect((): ReturnType<EffectCallback> => {
    get_all_managers().then((result) => { console.log(result) });
  });

  
  return (
    <div>
      <div>hello world</div>
      
    </div>
  );
};

export default Home;
