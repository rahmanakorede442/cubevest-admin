import React from 'react'
import {Button, Icon} from "@material-ui/core"

export default function Paginate({pagination, fetch_prev_page, fetch_next_page, fetch_page}) {
console.log(pagination)
    const pages = page(pagination);
    return (
      <div >
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={pagination.total > 0 ?"page-item" :"page-item disabled"} onClick={fetch_prev_page}>
              <a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
            </li>
            {pages.map((page, index)=>(
              <li className={pagination.current_page === page ?"active page-item" : "page-item"}  aria-current="page" onClick={()=>fetch_page(page)} key={index}>
                <a className="page-link" href="#" >{page}</a>
              </li>
            ))}
            <li className={pagination.total > 20 ?"page-item" :"page-item disabled"} onClick={fetch_next_page}>
              <a className="page-link" aria-label="Next" href="#"><span aria-hidden="true">&raquo;</span></a>'
            </li>
          </ul>
        </nav>
      </div>
    )
}




function page(pagination){
    var pages =[]
    var pageIndex = 0;
    var i = 0;
    while(i < pagination.total){
      if(i % pagination.per_page === 0){
        pageIndex+=1
        pages.push(pageIndex)
      }else if(i === pagination.total){
        pageIndex+=1
        pages.push(pageIndex)
      }
      i++;
    }
    return pages;
}

