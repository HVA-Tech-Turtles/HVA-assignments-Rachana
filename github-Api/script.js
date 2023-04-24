
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";


const form = document.querySelector("form");



form.addEventListener("submit", async function(event) {
    event.preventDefault();
    // var search=document.getElementById("search").value;
    // var origName=search.split(' ').join('');


    // fetch("https://api.github.com/users/"+origName)
    // .then((result)=>result.json())
    // .then((data)=>{
    //     console.log(data);

    //     document.getElementById("result").innerHTML=`
    //     <a target="_blank" href="https://www.github.com/${origName}"><img src="${data.avatar_url}"></a>
    //     `
    // })

// Octokit.js
// https://github.com/octokit/core.js#readme


const octokit = new Octokit({
    auth: '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'
  })
  
  await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}
)